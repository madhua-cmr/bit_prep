"use server"
import { auth, db } from "@/firebase/admin";

import { cookies } from "next/headers";

export async function signUp(params:SignUpParams){
  const{uid,name,email}=params;
  try {
    const userRecord=await db.collection('users').doc(uid).get();
    if(userRecord.exists){
      return {
        success:false,
        message:"User already exists ,Please sign in."
      }
    }
    await db.collection("users").doc(uid).set({
      name,
      email
    })
    return{
      success:true,
      message:"Account created successfully , Please sign in."
    }
    
  } catch (error:any) {
    if(error.code==="auth/email-alr4eady-exists"){
      return{
        success:false,
        message:"Email already in use. Try to sign in."
      }
    }
    return{
      success:false,
      message:"Unable to create account."
    }
  }
}
const ONE_WEEK=60*60*24*7

export async function signIn(params:SignInParams){
  const{email,idToken}=params;
const userRecord=await auth.getUserByEmail(email);
if(!userRecord){
  return{
    success:false,
    message:"User doesnot exist ,Create Account Please"
  }
}
await setSessionCookie(idToken);
}
export async function setSessionCookie(idToken:string){
const cookieStore=await cookies();
const sessionCookie=await auth.createSessionCookie(idToken,{
  expiresIn:ONE_WEEK*1000
});
 cookieStore.set('session',sessionCookie,{
  maxAge:ONE_WEEK
})


}

export async function getUser():Promise<User|null>{
  const cookieStore=await cookies();
  const sessionCookie= cookieStore.get("session")?.value;
  if(!sessionCookie){
    return null;
  }
  try {
    const decodedSession=await auth.verifySessionCookie(sessionCookie,true);
  const userRecord=await db.collection("users").doc(decodedSession?.uid).get();
   if(!userRecord.exists){
    return null;
   }
   return {
     ...userRecord.data(),
     id:userRecord.id
   } as User
  } catch (error) {
    console.log(error);
    return null;
  }
  
}
export async function isAuthenticated(){
const user=await getUser();
return !!user;
}