import { isAuthenticated } from "@/lib/admin.action";
import Image from "next/image"
import Link from "next/link";
import { redirect } from "next/navigation";

const RootLayout = async({children}:{children:React.ReactNode}) => {
    const authenticatedUser=await isAuthenticated();
    if(!authenticatedUser){
      redirect("/sign-in");
    }
  return (
  <>
  <div className="flex-col-cen">
  <div className="flex-between h-[100px] text-white p-8 bg-a w-screen">
    <Link href="/">
    <div className="flex-row-cen "><Image src="/logo.png" alt="logo" className="rounded-full " width={50} height={50}></Image>
    <h1>Bitprep</h1>
 
    </div>
       </Link>
    <div></div>
  </div>
  {children}
  </div>
  </>
  )
}

export default RootLayout
