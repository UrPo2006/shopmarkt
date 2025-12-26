 import CredentialsProvider from "next-auth/providers/credentials";
import { FailLoginResponse, SuccessLoginResponse } from "@/interfaces";
import { AuthOptions } from "next-auth";
export const authOptions :AuthOptions= {
   

providers: [
  CredentialsProvider({
    name: "Credentials",
        credentials: {
      email: { label: "Email", type: "email", placeholder: "example@email.com" },
      password: { label: "Password", type: "password" }
    },
      authorize:async(Credentials)=> {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
            method:"POST",
            body:JSON.stringify({
               email:Credentials?.email,
               password:Credentials?.password,
            }),
            headers:{'content-type':'application/json'}
        })
        const payload:SuccessLoginResponse|FailLoginResponse=await res.json()
        console.log(payload)
        if('token'in payload){
           //بخزن الحاجه الي انا محتجاها زي user,token
        return {
            id:payload.user.email,//لازم احط id علشان الerorr يختفي واضيف فيه token, email
              user:payload.user,
              token:payload.token
        }
        }else{
          throw new Error(payload.message)
        }
       
     }
   })
    
  
],
callbacks:{
  jwt:({token,user})=>{
   if(user){
     token.user = user.user;
    token.token = user.token;
   
   } return token;//{user,token}
  },
  session:({session,token})=>{
   session.user = token.user 
 
    return session 

  }
},
pages:{
 signIn:'/login',
 error:'/login'
},
 secret:process.env.NEXTAUTH_SECRET


}