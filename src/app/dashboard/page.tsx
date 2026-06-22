"use client";


import {
 useEffect,
 useState
} from "react";


import api from "@/services/api";

import {
 logout
} from "@/services/auth";


import {
 useRouter
} from "next/navigation";




export default function Dashboard(){


const router = useRouter();


const [profile,setProfile]=useState(null);

const [loading,setLoading]=useState(true);



useEffect(()=>{


load();


},[]);



async function load(){


try{


const res =
await api.get(
 "/academy/institute/profile/"
);



setProfile(res.data);



}catch(e){


router.replace("/login");


}



setLoading(false);


}




async function exit(){


try{

 await logout();

}catch(e){}



router.replace("/login");


}




if(loading)
return <div>Loading...</div>;




return (

<div className="p-10">


<h1 className="text-3xl">
Dashboard
</h1>


{
profile &&
<div>

<p>
{profile.institute_name}
</p>

<p>
{profile.mobile_number}
</p>


</div>
}


<button
onClick={exit}
className="bg-red-500 text-white p-3"
>

خروج

</button>


</div>

)

}