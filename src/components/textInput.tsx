import Image from "next/image";

interface TextInputProps {
  id: string;
  label: string;
  error: string | undefined;
  value: string;
  isPending: boolean;
  handleEventChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function TextInput({
  id,
  label,
  error,
  value,
  isPending,
  handleEventChange,
  placeholder,
}: TextInputProps) {
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
