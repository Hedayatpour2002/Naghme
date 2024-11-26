import Image from "next/image";

export default function SearchBox() {
  return (
    <div className="border border-light-silver rounded-xl flex items-center px-2">
      <button className="flex gap-2 py-2 items-center font-bold text-dark-purple border-l border-light-silver pl-2 flex-shrink-0">
        <Image src={"/icon/menu.svg"} alt="menu icon" width={16} height={16} />
        منو
        <Image
          src={"/icon/bottom.svg"}
          alt="bottom icon"
          width={12}
          height={12}
        />
      </button>

      <div className="flex gap-1 items-center">
        <input type="text" className="py-2 w-full px-2" />
        <button className="flex-shrink-0">
          <Image
            src={"/icon/search.svg"}
            alt="search icon"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
}
