"use client";

import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import NewChat from "./NewChat";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";

function Sidebar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />

          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>

      {session && (
        <div
          className="flex flex-col items-center md:flex-row mx-4 mb-4 hover:bg-[#202021] rounded-lg p-2 cursor-pointer"
          onClick={() => signOut()}
        >
          {/* eslint-disable */}
          <img
            src={session?.user?.image || "/assets/logo.png"}
            alt="user profile picture"
            className="h-8 w-8 rounded-full"
          />
          {/* eslint-enable */}
          <p className="text-white font-lg ml-2 mt-2 md:mt-0 text-center">
            {session?.user?.name}
          </p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
