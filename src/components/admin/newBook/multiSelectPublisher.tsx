"use client";

import FormError from "@/components/auth/formError";
import FormSuccess from "@/components/auth/formSuccess";
import { addPublisher, getPublishers } from "@/services/coreService";
import getCookie from "@/utils/getCookie";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Publisher {
  publisher_id: number;
  publisher_name: string;
}

interface MultiSelectPublisherProps {
  selectedItems: Publisher[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Publisher[]>>;
  error: string | undefined;
}

export default function MultiSelectPublisher({
  selectedItems,
  setSelectedItems,
  error,
}: MultiSelectPublisherProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  const [actionError, setActionError] = useState<string | undefined>("");
  const [actionSuccess, setActionSuccess] = useState<string | undefined>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPublishers();
        setPublishers(res.message);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("خطا در دریافت ناشرها لطفاً دوباره تلاش کنید.");
        }
      }
    };

    fetchData();
  }, []);

  const filteredData = publishers.filter((item) =>
    item.publisher_name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (item: Publisher) => {
    if (!selectedItems.some((i) => i.publisher_id === item.publisher_id)) {
      setSelectedItems([...selectedItems, item]);
    }
    setInputValue("");
  };

  const handleRemove = (item: Publisher) => {
    setSelectedItems(
      selectedItems.filter((i) => i.publisher_id !== item.publisher_id)
    );
  };

  const handleAddNewItem = async () => {
    setActionError("");
    setActionSuccess("");

    const token = getCookie("token") || "";
    const publisherName = inputValue;

    try {
      const res = await addPublisher(token, publisherName);
      console.log("add publisher was successful, RESPONSE:", res);

      // Assuming the server returns the publisher_id in the response
      const newPublisher: Publisher = {
        publisher_id: res.publisher_id, // Replace with actual property from response
        publisher_name: publisherName,
      };

      setActionSuccess("ناشر جدید با موفقیت ثبت شد!");
      setSelectedItems([...selectedItems, newPublisher]);
    } catch (error) {
      if (error instanceof Error) {
        setActionError(error.message);
      } else {
        setActionError("خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.");
      }
    }
  };

  function closeModal() {
    setShowModal(false);
    setInputValue("");
    setActionError("");
    setActionSuccess("");
  }

  return (
    <div className="w-full max-w-[320px] sm:max-w-none flex flex-col gap-2">
      <label
        htmlFor="publishDate"
        className={`pr-6 ${error && "text-dark-red"}`}
      >
        ناشران
      </label>
      <div className="relative">
        <input
          type="text"
          className="w-full px-3 py-4 border rounded-lg border-silver"
          placeholder="اضافه کردن ناشر ..."
          value={inputValue}
          onChange={handleInputChange}
        />

        {inputValue && (
          <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg">
            {filteredData.length > 0 && (
              <ul>
                {filteredData.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      handleSelect({
                        publisher_id: item.publisher_id,
                        publisher_name: item.publisher_name,
                      })
                    }
                  >
                    {item.publisher_name}
                  </li>
                ))}
              </ul>
            )}
            {filteredData.length === 0 && inputValue && (
              <div
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => setShowModal(true)}
              >
                اضافه کردن &quot;{inputValue}&quot; به عنوان ناشر جدید
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="text-dark-red pr-6  rounded-xl py-2 flex gap-2 items-center ">
          <Image
            src={"/icon/alert-error.svg"}
            width={20}
            height={20}
            alt="error icon"
          />
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-2 py-3">
        {selectedItems.map((item) => (
          <div
            key={item.publisher_id}
            className="inline-flex items-center px-3 py-1 text-sm font-medium bg-light-purple rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-2 cursor-pointer"
              viewBox="0 0 20 20"
              fill="#5C067C"
              onClick={() => handleRemove(item)}
            >
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
            {item.publisher_name}
          </div>
        ))}
      </div>

      <Transition
        show={showModal}
        as="div"
        className="fixed bg-light-ligth-purple rounded-lg shadow-lg inset-0 w-full max-w-xl h-fit self-center justify-self-center p-6 flex flex-col gap-6 z-[101]"
      >
        <h3 className="text-lg font-medium mb-4">اضافه کردن ناشر جدید</h3>
        <input
          type="text"
          placeholder="Enter author name"
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="min-h-10">
          {actionError && <FormError message={actionError} />}
          {actionSuccess && <FormSuccess message={actionSuccess} />}
        </div>
        <div
          className="w-full px-4 py-2 bg-dark-purple font-bold text-center text-white rounded-lg"
          onClick={handleAddNewItem}
        >
          اضافه کردن ناشر
        </div>
        <div
          className="w-full ml-2 px-4 py-2 bg-light-silver rounded-lg text-center"
          onClick={() => {
            closeModal();
          }}
        >
          لغو
        </div>
      </Transition>
      {showModal && (
        <div
          className="bg-black bg-opacity-50 fixed inset-0 z-[100]"
          onClick={() => {
            closeModal();
          }}
        ></div>
      )}
    </div>
  );
}
