import { db } from "@/firebase";
import { TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!pathName) return;

    setActive(pathName.includes(id));
  }, [pathName, id]);

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow ${active && "bg-[#2E2E2F]"}`}
    >
      <p className="flex-1 truncate max-w-32 ml-2 text-sm">
        {messages?.docs[0]?.data().text || "New Chat"}
      </p>
      <TrashIcon
        className="h-5 w-5 text-gray-400/50 hover:text-red-700"
        onClick={removeChat}
      />
    </Link>
  );
}

export default ChatRow;
