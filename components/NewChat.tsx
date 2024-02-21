import { db } from "@/firebase";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.replace(`/chat/${doc.id}`);
  };

  return (
    <div className="newChatBtn" onClick={createNewChat}>
      <div className="flex items-center">
        <Image
          src="/assets/logo.png"
          alt="logo"
          height={28}
          width={28}
          className="rounded-full object-contain hidden md:inline"
        />
        <p className="text-sm font-semibold ml-2">New chat</p>
      </div>
      <PencilSquareIcon className="h-5 w-5" />
    </div>
  );
}

export default NewChat;
