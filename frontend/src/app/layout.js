import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "coff-z assignment",
  description: "This is an assignment done for a prescreening to a project.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <div className="absolute bottom-0 right-0 p-4 flex flex-col items-start bg-gray-900 text-white space-y-4">
          <Link href="/user/page1">
              <button className="w-32 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
                  Workflow
              </button>
          </Link>
          <Link href="/data">
              <button className="w-32 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600">
                  Data
              </button>
          </Link>
          <Link href="/admin">
              <button className="w-32 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600">
                  Admin
              </button>
          </Link>
      </div>
        {children}
      </body>
    </html>
  );
}
