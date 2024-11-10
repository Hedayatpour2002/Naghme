import Image from "next/image";

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <div className="text-dark-red pr-6 bg-dark-red/10 rounded-xl py-3 flex gap-2 items-center font-bold ">
      <Image
        src={"/icon/alert-error.svg"}
        width={20}
        height={20}
        alt="error icon"
      />
      <p>{message}</p>
    </div>
  );
}
