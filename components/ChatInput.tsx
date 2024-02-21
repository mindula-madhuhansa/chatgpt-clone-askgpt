"use client";

import { db } from "@/firebase";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    // Toast Notification - Loading
    const notification = toast.loading("AskGPT is thinking...");

    await fetch("https://askgpt-three.vercel.app/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        session,
        chatId,
      }),
    }).then(() => {
      // Toast Notification - Successful
      toast.success("AskGPT has responded!", {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-[#202021] text-[#7C7D7D] rounded-2xl border border-[#7C7D7D] mx-12 my-4">
      <form onSubmit={sendMessage} className="p-4 flex">
        <input
          className="bg-transparent focus:outline-none flex-1 placeholder:text-[7C7D7D] text-white"
          type="text"
          placeholder="Message AskGPT..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={!prompt}
          className="bg-white p-1 rounded-lg disabled:bg-[#383838] disabled:cursor-default cursor-pointer"
        >
          <ArrowUpIcon color="black" className="h-5 w-5" />
        </button>
      </form>

      <div>{/* ModelSelection */}</div>
    </div>
  );
}

export default ChatInput;
