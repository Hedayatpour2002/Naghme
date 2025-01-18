import { useStore } from "@/stores/useStore";
import Link from "next/link";

export default function CartDetails() {
  const { getCartItems } = useStore();
  return (
    <section className="bg-light-purple absolute left-0 right-0 h-[572px] flex flex-col justify-center items-center py-20 ">
      <div className="flex flex-col w-[473px] gap-10">
        <div className="text-light-blue font-semibold text-3xl text-center">
          خلاصه خرید
        </div>

        <div className="flex justify-between">
          <span className="text-[#755A7D] text-lg">جمع کل</span>
          <span className="font-semibold text-xl">500,000</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#755A7D] text-lg">میزان تخفیف</span>
          <span className="font-semibold text-xl">100,000</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#755A7D] text-lg font-bold">
            مبلغ قابل پرداخت
          </span>
          <span className="font-semibold text-xl">100,000</span>
        </div>

        <button className="text-white bg-dark-purple rounded-xl py-5 font-bold text-xl">
          پرداخت و تکمیل سفارش
        </button>

        <Link href="/books" className="text-dark-purple text-center">
          خرید بیشتر
        </Link>
      </div>

      <div className="absolute bottom-0 top-0 left-0">
        <CartShopingSvg />
      </div>
    </section>
  );
}

function CartShopingSvg() {
  return (
    <svg
      width="600"
      height="570"
      viewBox="0 0 600 570"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M52.7197 -92C19.3765 -92 -7.74805 -63.4557 -7.74805 -28.3671C-7.74805 6.72147 19.3751 35.2658 52.7197 35.2658C86.063 35.2658 113.188 6.72147 113.188 -28.3671C113.186 -63.4557 86.0617 -92 52.7197 -92Z"
        fill="#D7CDDB"
        fill-opacity="0.29"
      />
      <path
        d="M254.869 210.998L53.311 83.7333C40.9325 75.9093 25.4044 75.6081 12.6847 83.2158C0.0872297 90.6933 -7.7467 104.841 -7.7467 120.107V289.795H-7.74805C-7.74805 301.126 -3.55562 311.772 4.06198 319.789L72.8743 392.204V544.325C72.8743 567.711 90.9636 586.747 113.186 586.747C135.409 586.747 153.498 567.711 153.498 544.325V374.637C153.498 363.307 149.306 352.66 141.688 344.644L72.8743 272.229V195.03L213.375 283.746C232.871 296.042 257.571 288.611 268.685 269.225C280.061 249.201 274.053 223.067 254.869 210.998Z"
        fill="#D7CDDB"
        fill-opacity="0.29"
      />
      <path
        d="M-7.74376 367.346V404.216L-81.5951 520.791C-94.0125 540.416 -88.8404 566.691 -70.4341 579.619C-51.9591 592.562 -26.9335 587.442 -14.5135 567.854L32.5694 493.538V409.768L-7.74376 367.346Z"
        fill="#D7CDDB"
        fill-opacity="0.29"
      />
      <path
        d="M294.591 417.059H539.147C548.398 417.059 556.449 410.43 558.693 400.985L599.004 231.299C600.52 224.961 599.162 218.249 595.343 213.113C591.524 207.956 585.658 204.952 579.459 204.952H303.524C317.694 230.767 318.857 263.582 303.29 290.997C292.927 309.057 276.418 321.871 257.701 327.994L270.107 380.199C248.954 390.118 234.123 412.367 234.123 438.27C234.123 467.603 253.174 492.113 278.873 499.448C276.066 506.778 274.435 514.737 274.435 523.114C274.435 558.202 301.559 586.747 334.903 586.747C368.246 586.747 395.37 558.202 395.37 523.114C395.37 515.642 393.917 508.429 391.658 501.761H442.082C439.824 508.429 438.37 515.642 438.37 523.114C438.37 558.202 465.494 586.747 498.837 586.747C532.181 586.747 559.305 558.202 559.305 523.114C559.305 488.025 532.181 459.481 498.837 459.481H294.591C283.47 459.481 274.435 449.973 274.435 438.27C274.435 426.567 283.47 417.059 294.591 417.059ZM498.835 501.901C509.956 501.901 518.991 511.41 518.991 523.112C518.991 534.815 509.956 544.323 498.835 544.323C487.714 544.323 478.679 534.815 478.679 523.112C478.679 511.41 487.714 501.901 498.835 501.901ZM334.903 501.901C346.023 501.901 355.059 511.408 355.059 523.112C355.059 534.815 346.023 544.323 334.903 544.323C323.782 544.323 314.747 534.815 314.747 523.112C314.747 511.41 323.782 501.901 334.903 501.901Z"
        fill="#D7CDDB"
        fill-opacity="0.29"
      />
    </svg>
  );
}
