"use client"
import {loginUser} from "@/services/auth";
import {
 saveTokens,
 isAuthenticated
}
from "@/utils/auth";
import Image from "next/image";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";
import {useEffect} from "react";


export default function LoginPage() {
const router = useRouter();


useEffect(()=>{

if(isAuthenticated()){

router.replace("/dashboard");

}

},[router]);


const [showPassword,setShowPassword] = useState(false);

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);
const [error,setError] = useState("");


async function login(){


try{


 setLoading(true);


 await loginUser(
  username,
  password
 );


 router.replace(
  "/dashboard"
 );


}catch(e){


 setError(
  "اطلاعات ورود اشتباه است"
 );


}finally{

 setLoading(false);

}


}




return (

<main className="relative min-h-screen overflow-hidden bg-[#f7f9fc]">


{/* بقیه UI خودت همون قبلی */}



<input

value={username}

onChange={
e=>setUsername(e.target.value)
}

type="text"

className="h-14 w-full rounded-lg border border-gray-300 bg-[#eef3fb] px-4 text-right outline-none"

/>





<div className="relative">


<input

value={password}

onChange={
e=>setPassword(e.target.value)
}


type={
showPassword ? "text":"password"
}


className="h-14 w-full rounded-lg border border-gray-300 bg-[#eef3fb] px-4 text-right outline-none"

/>



<button

type="button"

onClick={()=>
setShowPassword(!showPassword)
}

className="absolute left-4 top-1/2 -translate-y-1/2"

>

{
showPassword
?
<FiEye/>
:
<FiEyeOff/>
}

</button>


</div>




{
error &&
<p className="text-red-600 text-center my-3">
{error}
</p>
}



<button

onClick={login}

disabled={loading}

className="h-14 w-full rounded-lg bg-[#0d65c9] text-xl font-bold text-white"

>

{
loading
?
"در حال ورود..."
:
"ورود"
}


</button>



</main>

)

}