import api from "./api";



export async function loginUser(
 username:string,
 password:string
){

 const res =
 await api.post(
  "/auth/login/",
  {
   username,
   password
  }
 );


 return res.data;

}





export async function logout(){

    try{

        await api.post(
            "/auth/logout/",
            {}
        );

    }catch(e){

        console.log(
            "logout error",
            e
        );

    }

}
