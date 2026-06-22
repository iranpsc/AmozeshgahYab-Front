"use client";


import {
 useEffect,
 useState
} from "react";


import api from "@/services/api";



export default function SettingsPage(){


const [user,setUser] =
useState<any>(null);


const [loading,setLoading] =
useState(true);




useEffect(()=>{


async function load(){


try{


const res =
await api.get(
"/academy/institute/profile/"
);


setUser(res.data);


}catch(e){


console.log(e);


}


finally{

setLoading(false);

}


}



load();


},[]);





if(loading){

return (
<div>
در حال بررسی...
</div>
)

}




return (

<div className="p-10">


<h1 className="text-3xl">

تنظیمات

</h1>


<div className="mt-5">


{
user && (

<>

<p>
نام موسسه:
{" "}
{user.institute_name}
</p>


<p>
موبایل:
{" "}
{user.mobile_number}
</p>

</>

)
}


</div>


</div>

)

}