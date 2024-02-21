import { adminDb } from "@/firebaseAdmin";
import openai from "@/lib/chatgpt";
import { firestore } from "firebase-admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt, session, chatId } = await request.json();

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const response = res.choices[0].message.content;

    const message: Message = {
      text: response || "AskGPT was unable to find an answer for that!",
      createdAt: firestore.Timestamp.now(),
      user: {
        _id: "AskGPT",
        name: "AskGPT",
        avatar: "https://links.papareact.com/89k",
      },
    };

    await adminDb
      .collection("users")
      .doc(session?.user?.email)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add(message);

    return NextResponse.json(response);
  } catch (error) {
    `AskGPT was unable to find an answer for that! (Error: ${error})`;
  }
}
