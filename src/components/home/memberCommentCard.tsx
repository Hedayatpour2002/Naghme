import Image from "next/image";

interface MemberCommentCardProps {
  imageURL: string;
  name: string;
  desc: string;
}

export default function MemberCommentCard({
  imageURL,
  name,
  desc,
}: MemberCommentCardProps) {
  return (
    <div className="flex flex-col rounded-[30px] bg-white p-8 gap-4 shadow-lg">
      <div className="flex gap-2.5 items-center">
        <Image
          className="rounded-full"
          src={imageURL}
          alt={`${name} profile`}
          width={70}
          height={70}
        />
        <span className="font-bold">{name}</span>
      </div>
      <p>{desc}</p>
    </div>
  );
}
