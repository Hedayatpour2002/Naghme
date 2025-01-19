"use client";

import useModalStore from "@/stores/useModalStore";
import React from "react";

export default function ModalDialog() {
  const { type, isOpen, title, content, confirmText, onConfirm, closeModal } =
    useModalStore();

  if (!isOpen) return null;

  const renderIcon = () => {
    switch (type) {
      case "delete":
        return <DeleteSvg />;
      case "edit":
        return <EditSvg />;
      case "add":
        return <AddSvg />;
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case "delete":
        return "bg-dark-red";
      case "edit":
        return "bg-[#FFAB00]";
      case "add":
        return "bg-[#1A62F8]";
    }
  };

  return (
    <>
      <div className="fixed bg-light-ligth-purple rounded-lg shadow-lg inset-0 w-full max-w-md h-fit self-center justify-self-center p-6 flex flex-col gap-6 z-[101]">
        <div className="text-2xl font-semibold flex gap-4 items-center">
          {renderIcon()}
          {title}
        </div>
        {content}
        <div className="flex justify-end gap-4">
          <button onClick={closeModal} className="px-4 py-2 rounded-md border">
            <span className="relative top-0.5">لغو</span>
          </button>
          <button
            onClick={() => {
              onConfirm();
              closeModal();
            }}
            className={`px-4 py-2 text-white rounded-md ${getButtonColor()}`}
          >
            <span className="relative top-0.5">{confirmText}</span>
          </button>
        </div>
      </div>
      <div
        className="bg-black bg-opacity-50 fixed inset-0 z-[100]"
        onClick={closeModal}
      ></div>
    </>
  );
}

function DeleteSvg() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12C0 5.37258 5.37258 0 12 0H24C30.6274 0 36 5.37258 36 12V24C36 30.6274 30.6274 36 24 36H12C5.37258 36 0 30.6274 0 24V12Z"
        fill="#DE283B"
      />
      <path
        d="M16.0217 5C13.684 5 11.7826 6.71498 11.7826 8.82353V9.58824H7.26087C6.0123 9.58824 5 10.5013 5 11.6275C5 12.7536 6.0123 13.6667 7.26087 13.6667H7.39224L8.20584 26.8788C8.34828 29.1897 10.4706 31 13.0367 31H22.9633C25.5294 31 27.6517 29.1897 27.7942 26.8788L28.6078 13.6667H28.7391C29.9877 13.6667 31 12.7536 31 11.6275C31 10.5013 29.9877 9.58824 28.7391 9.58824H24.2174V8.82353C24.2174 6.71498 22.316 5 19.9783 5H16.0217ZM16.0217 8.56863H19.9783C20.1337 8.56863 20.2609 8.68282 20.2609 8.82353V9.58824H15.7391V8.82353C15.7391 8.68282 15.8663 8.56863 16.0217 8.56863ZM18 14.6863C18.624 14.6863 19.1304 15.1431 19.1304 15.7059V24.8435C19.1304 25.4069 18.624 25.8631 18 25.8631C17.376 25.8631 16.8696 25.4063 16.8696 24.8435V15.7059C16.8696 15.1431 17.376 14.6863 18 14.6863ZM13.1349 14.6873C13.738 14.6761 14.282 15.1082 14.304 15.671L14.6573 24.8475C14.6787 25.4103 14.1895 25.8811 13.5655 25.901C13.5525 25.9015 13.5398 25.902 13.5268 25.902C12.9204 25.902 12.419 25.4678 12.3975 24.9172L12.0442 15.7407C12.0228 15.1779 12.5109 14.7072 13.1349 14.6873ZM22.8651 14.6873C23.4891 14.7066 23.9772 15.1779 23.9558 15.7407L23.6025 24.9172C23.581 25.4678 23.0791 25.902 22.4732 25.902C22.4602 25.902 22.4475 25.9015 22.4345 25.901C21.8105 25.8816 21.3213 25.4103 21.3427 24.8475L21.696 15.671C21.7175 15.1082 22.2495 14.6761 22.8651 14.6873Z"
        fill="white"
      />
    </svg>
  );
}

function EditSvg() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12C0 5.37258 5.37258 0 12 0H24C30.6274 0 36 5.37258 36 12V24C36 30.6274 30.6274 36 24 36H12C5.37258 36 0 30.6274 0 24V12Z"
        fill="#FFAB00"
      />
      <path
        d="M18.8689 13.0289L22.9711 17.1311L15.3942 24.708L10.7446 26.2633C10.1217 26.4716 9.52872 25.8787 9.73672 25.2558L11.292 20.6061L18.8689 13.0289ZM19.8901 12.0077L21.7801 10.1176C22.3442 9.55357 23.2589 9.55357 23.8229 10.1176L25.8824 12.177C26.4464 12.7411 26.4464 13.6558 25.8824 14.2198L23.9923 16.1099L19.8901 12.0077Z"
        fill="white"
      />
    </svg>
  );
}

function AddSvg() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12C0 5.37258 5.37258 0 12 0H24C30.6274 0 36 5.37258 36 12V24C36 30.6274 30.6274 36 24 36H12C5.37258 36 0 30.6274 0 24V12Z"
        fill="#1A62F8"
      />
      <path
        d="M29.4508 15.4441H20.5476V6.54943C20.5476 5.14151 19.4115 4 18.0034 4C16.5953 4 15.4598 5.14151 15.4598 6.55005V15.4503H6.55224C5.14413 15.4503 3.99938 16.5918 4 18.0003C3.99938 18.704 4.28372 19.349 4.74446 19.8097C5.20581 20.2716 5.84233 20.5633 6.54546 20.5633H15.4598V29.4512C15.4598 30.1555 15.7392 30.7931 16.2005 31.2532C16.6619 31.7145 17.2966 32 18.0009 32C19.4084 32 20.5476 30.8585 20.5476 29.4512V20.5627H29.4508C30.859 20.5627 32.0006 19.4113 32 18.0034C31.9994 16.5961 30.8577 15.4441 29.4508 15.4441Z"
        fill="white"
      />
    </svg>
  );
}
