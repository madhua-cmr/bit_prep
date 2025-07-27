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
  <div className=" w-full p-4 sm:w-[90%] flex flex-c  ">
  <div className="flex-between">
    <Link href="/">
    <div className="flex-row-cen"><Image src="/logo.svg" alt="logo" width={50} height={50}></Image>
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
