import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";

const fakeData = ["مجید", "ایران"];

interface MultiSelectPublisherProps {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  error: string | undefined;
}
export default function MultiSelectPublisher({
  selectedItems,
  setSelectedItems,
  error,
}: MultiSelectPublisherProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const filteredData = fakeData.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (item: string) => {
    if (!selectedItems.find((i) => i === item)) {
      setSelectedItems([...selectedItems, item]);
    }
    setInputValue("");
  };

  const handleRemove = (item: string) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  const handleAddNewItem = () => {
    const newItem: string = inputValue;
    if (!selectedItems.find((i) => i === newItem)) {
      setSelectedItems([...selectedItems, newItem]);
    }
    setShowModal(false);
    setInputValue("");
  };

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
                    onClick={() => handleSelect(item)}
                  >
                    {item}
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
            key={item}
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
            {item}
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

        <div
          className="px-4 py-2 bg-dark-purple font-bold text-center text-white rounded-lg"
          onClick={handleAddNewItem}
        >
          اضافه کردن ناشر
        </div>
        <div
          className="ml-2 px-4 py-2 bg-light-silver rounded-lg text-center"
          onClick={() => setShowModal(false)}
        >
          لغو
        </div>
      </Transition>
      {showModal && (
        <div
          className="bg-black bg-opacity-50 fixed inset-0 z-[100]"
          onClick={() => {
            setShowModal((prev) => !prev);
          }}
        ></div>
      )}
    </div>
  );
}
