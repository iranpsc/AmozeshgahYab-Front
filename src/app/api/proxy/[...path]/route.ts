import { NextRequest, NextResponse } from "next/server";


const API_URL = "https://amozeshgahyab.ir";


// جلوگیری از refresh های همزمان
let refreshing = false;

let refreshPromise: Promise<any> | null = null;



async function handler(
 req: NextRequest,
 context: {
  params: Promise<{ path:string[] }>
 }
){


const {path} =
await context.params;



const endpoint =
path.join("/");



const url =
`${API_URL}/${endpoint}/`;



const access =
req.cookies.get("access")?.value;



const refresh =
req.cookies.get("refresh")?.value;





const headers: Record<string, string> = {};

const contentType = req.headers.get("content-type");

if (contentType) {
  headers["Content-Type"] = contentType;
}



if(access){

 headers.Authorization =
 `Bearer ${access}`;

}





let body: BodyInit | undefined;

if (
  req.method !== "GET" &&
  req.method !== "DELETE"
) {
  const contentType =
    req.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    body = await req.arrayBuffer();
  } else {
    body = await req.text();
  }
}







async function request(){
// console.log("ENDPOINT:", endpoint);
// console.log("URL:", url);
// console.log("Access Cookie:", access);
// console.log("Refresh Cookie:", refresh);
// console.log("Headers:", headers);
 return fetch(
  url,
  {
   method:req.method,
   headers,
   body
  }
 );


}







let response =
await request();

console.log("Backend Status:", response.status);

const responseText = await response.clone().text();

console.log("Backend Body:", responseText);





// =====================
// ACCESS EXPIRED
// =====================

if(
 response.status === 401 &&
 refresh &&
 !endpoint.includes("auth/")
){


console.log(
"ACCESS EXPIRED"
);





if(!refreshing){


 refreshing = true;



 refreshPromise =
 fetch(
 `${API_URL}/auth/refresh/`,
 {
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
   refresh
  })
 }
 )
 .then(async(res)=>{


  if(!res.ok){

   throw new Error(
    "refresh failed"
   );

  }



  return res.json();


 })
 .finally(()=>{


  refreshing=false;

  refreshPromise=null;


 });


}






try{



const tokens =
await refreshPromise;




console.log(
"REFRESH SUCCESS"
);





headers.Authorization =
`Bearer ${tokens.access}`;





response =
await request();






const text =
await response.text();



let data:any = {};



try{

 data =
 text ?
 JSON.parse(text)
 :
 {};

}catch{

 data={};

}





const res =
NextResponse.json(
 data,
 {
  status:response.status
 }
);





res.cookies.set(
"access",
tokens.access,
{

 httpOnly:true,

 secure:true,

 sameSite:"lax",

 path:"/",

 maxAge:60*15

}
);





return res;




}catch(error){



console.log(
"REFRESH FAILED"
);




const res =
NextResponse.json(
{
 message:"Unauthorized"
},
{
 status:401
}
);



res.cookies.delete(
"access"
);


res.cookies.delete(
"refresh"
);



return res;



}


}







// =====================
// LOGIN
// =====================


const text =
await response.text();



let data:any = {};



try{

data =
text ?
JSON.parse(text)
:
{};


}catch{

data={};

}







const res =
NextResponse.json(
data,
{
 status:response.status
}
);







if(
 endpoint === "auth/login" &&
 response.ok
){



res.cookies.set(
"access",
data.access,
{

 httpOnly:true,

 secure:true,

 sameSite:"lax",

 path:"/",

 maxAge:60*15

}
);





res.cookies.set(
"refresh",
data.refresh,
{

 httpOnly:true,

 secure:true,

 sameSite:"lax",

 path:"/",

 maxAge:60*60*24*30

}
);



}








// =====================
// LOGOUT
// =====================


if(
 endpoint === "auth/logout"
){


res.cookies.delete(
"access"
);


res.cookies.delete(
"refresh"
);


}




return res;


}







export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};