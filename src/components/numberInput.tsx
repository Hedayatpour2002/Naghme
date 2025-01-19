import Image from "next/image";

interface NumberInputProps {
  id: string;
  label: string;
  error: string | undefined;
  value: string;
  isPending: boolean;
  handleEventChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function NumberInput({
  id,
  label,
  error,
  value,
  isPending,
  handleEventChange,
  placeholder,
}: NumberInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={`pr-6 ${error && "text-dark-red"}`}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        className={`border rounded-full w-full max-w-[435px] py-3 px-6 ${
          error ? "border-dark-red" : "border-silver"
        }`}
        value={value}
        disabled={isPending}
        onChange={handleEventChange}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          target.value = target.value.replace(/[^0-9]/g, "");
        }}
      />
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
    </div>
  );
}
