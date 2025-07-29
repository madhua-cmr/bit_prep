import type { Metadata } from "next";
import{Poppins} from "next/font/google"
import "./globals.css";
import { Toaster } from "sonner";

const poppins=Poppins({subsets:['latin'],  weight: ['400', '700']})
export const metadata: Metadata = {
  title: "BitPrep",
  description: "Ai powered platform to take mock interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${poppins.className} bg-one text-two antialiased`} 
      ><div className=" flex-col-cen ">
        {children}
        <Toaster/>
        </div>
      </body>
    </html>
  );
}
