import { isAuthenticated } from "@/lib/admin.action";
import { redirect } from "next/navigation";


const AuthLayout = async({ children }: { children: React.ReactNode }) => {
  const authenticatedUser=await isAuthenticated();
  if(authenticatedUser){
    redirect("/");
  }
  return (
    <div className=" flex flex-col items-center min-h-screen justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
