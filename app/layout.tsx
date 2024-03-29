import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ClientProviders from "@/components/ClientProviders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Login from "@/components/Login";
import ToastProvider from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "AskGPT",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <ClientProviders>
      <html lang="en">
        <body>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#171616] max-w-xs h-screen overflow-y-auto md:min-w-[16rem]">
                <Sidebar />
              </div>
              <ToastProvider />

              <div className="bg-[#202021] flex-1">{children}</div>
            </div>
          )}
        </body>
      </html>
    </ClientProviders>
  );
}
