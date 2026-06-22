export function saveTokens(data:any){


if(typeof window==="undefined")
return;



localStorage.setItem(
"access",
data.access
);



localStorage.setItem(
"refresh",
data.refresh
);


}





export function getAccessToken(){


if(typeof window==="undefined")
return null;



return localStorage.getItem("access");


}





export function getRefreshToken(){


if(typeof window==="undefined")
return null;



return localStorage.getItem("refresh");


}




export function isAuthenticated(){


return !!getAccessToken();


}





export function logout(){


if(typeof window==="undefined")
return;



localStorage.removeItem("access");

localStorage.removeItem("refresh");


}