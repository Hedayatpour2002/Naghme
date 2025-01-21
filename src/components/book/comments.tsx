import { getBookComments, postBookComment } from "@/services/coreService";
import getCookie from "@/utils/getCookie";
import getUser from "@/utils/getUser";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CommentsProps {
  book_id: number;
}

interface Comment {
  comment_list_id: number;
  book_id: number;
  user_id: number;
  comment_date: string;
  comment_text: string;
  user_name: string;
}

export default function Comments({ book_id }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputComment, setInputComment] = useState<string>("");

  useEffect(() => {
    async function getData() {
      const id = Number(book_id);
      try {
        const res = await getBookComments(id);
        setComments(res.message);
      } catch (error) {
        if (error instanceof Error) {
        } else {
          console.log("خطا در دریافت کامنت ها");
        }
      }
    }

    getData();
  }, [book_id]);

  async function handleSendCamment() {
    const token = getCookie("token") || "";
    const user = getUser();
    const user_id = user?.user_id;
    const comment_text = inputComment;
    try {
      postBookComment(token, book_id, user_id, comment_text);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section className="w-full py-4 px-2 flex flex-col gap-4">
      <h2 className="font-bold text-3xl">نظرات</h2>
      <div className="w-full max-w-[435px] flex flex-col  gap-4 self-center">
        <textarea
          value={inputComment}
          placeholder="نظر خودرا وارد کنید"
          rows={5}
          onChange={(e) => setInputComment(e.target.value)}
          className={`rounded-xl w-full  py-3 px-6 border border-silver resize-none`}
        />
        <button
          className="font-bold text-white bg-dark-purple border-dark-purple w-full rounded-lg px-4 py-4"
          onClick={handleSendCamment}
        >
          ارسال نظر
        </button>
      </div>
      <div className="flex flex-wrap gap-6">
        {comments.map((item) => (
          <Comment data={item} key={item.book_id} />
        ))}
      </div>
    </section>
  );
}

interface CommentProps {
  data: Comment;
}

function Comment({ data }: CommentProps) {
  return (
    <div className="shadow-md border-light-ligth-purple rounded-lg px-8 py-6 flex flex-col gap-4 md:flex-row items-center w-full max-w-[435px] ">
      <div className="flex gap-6 items-center">
        <div className="h-[57px] w-[57px] rounded-full overflow-hidden">
          <Image src={"/sample/images.jpg"} alt="" width={57} height={57} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-bold text-lg">{data.user_name}</p>
          <p className="text-dark-purple text-sm">{data.comment_date}</p>
        </div>
      </div>
      <p className="">{data.comment_text}</p>
    </div>
  );
}
