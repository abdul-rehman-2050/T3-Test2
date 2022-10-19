import React from "react";
import { UserUpdateForm } from "../Components/UserUpdateForm";
import { trpc } from "../utils/trpc";
import { useState,useEffect } from "react";
import { UserType } from "../types/userType";
 
function Test2() {


  const [data, setData] = useState<UserType>();

  trpc.useQuery([
    "user.getone",
    { postId: "cl98mthlx0002ycvg5u6r54af" },],{
      onSuccess(data){
        setData({
          id: data.id as string,
          firstname: data.firstname as string,
          lastname: data.lastname as string,
          email: data.email as string,
          phone: data.phone as string,

        })
        console.log(data)
      },
      onError(error){
        console.log(error)
      }

    });
   


  

  return (
    <>
      
        {data ? (
          <div className="flex  h-screen w-full items-center justify-center ">
            <UserUpdateForm
              user={{
                id : data.id as string,
                firstname:data.firstname as string,
                lastname: data.lastname as string,
                email: data.email as string,
                phone: data.phone as string,
              }}
            />
          </div>
        ) : (
          <div> No data found</div>
        )}
     
    </>
  );
}

export default Test2;
