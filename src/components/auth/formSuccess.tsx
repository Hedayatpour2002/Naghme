import Image from "next/image";

interface FormSuccessProps {
  message?: string;
}

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;
  return (
    <div className="text-emerald-500 px-6 bg-emerald-500/15 rounded-xl py-3 flex items-center gap-2 font-bold ">
      <Image
        src={"/icon/success.svg"}
        width={20}
        height={20}
        alt="success icon"
      />
      <p>{message}</p>
    </div>
  );
}
