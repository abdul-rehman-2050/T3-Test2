import React from "react";
import { UserUpdateForm } from "../Components/UserUpdateForm";
import { trpc } from "../utils/trpc";
import { useState, useEffect } from "react";
import { UserType } from "../types/userType";
import { tokenType } from "../types/tokenType";

function Test2() {
  const [err, setErr] = useState("");
  const [data, setData] = useState<UserType>();
  const [token, setToken] = useState<tokenType>();
  trpc.useQuery(["auth.getSession"], {
    onSuccess(data: any) {
      
      setToken(data.token);
    },
    onError(err) {
      console.log(err);
      setErr(err.message as string);
    },
  });

  
    trpc.useQuery(["user.getone", { postId: token ? token.userId : "" }], {
      onSuccess(data) {
        setData({
          id: data.id as string,
          firstname: data.firstname as string,
          lastname: data.lastname as string,
          email: data.email as string,
          phone: data.phone as string,
        });

        console.log(data);
      },
      onError(error) {
        console.log(error);
      },
    });
  

  return (
    <>
      {data ? (
        <div className="flex  h-screen w-full items-center justify-center ">
          <UserUpdateForm
            user={{
              id: data.id as string,
              firstname: data.firstname as string,
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
