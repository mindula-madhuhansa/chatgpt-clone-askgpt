import Image from "next/image";

function NewChatScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-2 text-white">
      <div className="flex-1 flex-col flex items-center justify-center mb-20">
        <Image
          src="/assets/logo.png"
          alt="logo"
          height={40}
          width={40}
          className="rounded-full object-contain"
        />
        <h1 className="text-3xl font-semibold mt-2">
          How can I help you today?
        </h1>
        <h2 className="text-lg mt-4 font-semibold mx-auto text-white">
          Create a New Chat to Talk with me...
        </h2>
      </div>
    </div>
  );
}

export default NewChatScreen;
