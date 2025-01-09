import Image from "next/image";

export default function Buy_Like_Buttons() {
  return (
    <div className="flex gap-4 justify-between">
      <button className="w-16 h-14 border border-silver rounded-md flex items-center justify-center">
        <svg
          width="29"
          height="24"
          viewBox="0 0 29 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.7822 1.73456C22.7854 -0.695378 18.3285 -0.258301 15.5777 2.44221L14.5004 3.49848L13.4231 2.44221C10.6778 -0.258301 6.2154 -0.695378 3.21859 1.73456C-0.215722 4.52353 -0.396187 9.5291 2.67719 12.5522L13.259 22.9484C13.9426 23.6196 15.0527 23.6196 15.7363 22.9484L26.3181 12.5522C29.397 9.5291 29.2165 4.52353 25.7822 1.73456V1.73456Z"
            fill="#ACACAC"
          />
        </svg>
      </button>

      <button className="flex bg-dark-purple rounded-lg gap-1 items-center justify-center flex-grow">
        <Image src={"/icon/addToCart.svg"} alt="خرید" width={24} height={24} />
        <span className="font-semibold text-white">خرید</span>
      </button>
    </div>
  );
}
