import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isAskGPT = message.user.name === "AskGPT";

  return (
    <div className={`py-5 text-white ${isAskGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-3 px-10 max-w-6xl mx-auto">
        {/* eslint-disable */}
        <img
          src={message.user.avatar}
          alt="avatar"
          className="h-6 w-6 rounded-full mt-[0.10rem]"
        />
        {/* eslint-enable */}
        <div className="flex flex-col">
          <h2 className="font-semibold">{isAskGPT ? "AskGPT" : "You"}</h2>
          <p className="pt-1 text-sm">{message.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
