/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import TopNavDUI from "../Components/DaisyUITopNav";
import ProfileCard from "../Components/ProfileCard";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { UserType } from "../types/userType";
import { tokenType } from "../types/tokenType";
import { userAgent } from "next/server";
import Router from "next/router";

function Test() {
  const [err, setErr] = useState("something nothing");
  const [token, setToken] = useState<tokenType>();
  const [usr, setUsr] = useState<UserType>();
  trpc.useQuery(["auth.getSession"], {
    onSuccess(data: any) {
      
      setToken(data.token);
    },
    onError(err) {
      console.log(err);
      setErr(err.message as string);
    },
  });
  //----------------------------------------

  trpc.useQuery(["user.getone", { postId: token ? token.userId : "" }], {
    // trpc.useQuery(["user.getone", { postId: "89" }], {
    //trpc.useQuery(["user.getone", { postId: (session ? session?.user?.id as string: "0" )}], {
    onError(err) {
      setErr(err.message as string);
    },
    onSuccess: (data) => {
      console.log("Get data!");
      console.log(data);
      if (data) {
        
        const mUser: UserType = {
          id: data.id,
          firstname: data.firstname as string,
          lastname: data.lastname as string,
          email: data.email as string,
          phone: data.phone as string,
        };
        console.log("asdfa");
        console.log(mUser);
        console.log("new");

        setUsr(mUser);
      }
    },
  });

  return (
    <div>
      <TopNavDUI />
      <div className="flex h-screen">
        <div className="grid">
          <button
            className="btn btn-secondary mr-1"
            onClick={() => {
              Router.push("/dashboard");
            }}
          >
            Dashboard
          </button>
        </div>
        <div className="mx-auto my-auto">
          <ProfileCard
            id={usr ? usr.id : ""}
            firstname={usr ? usr.firstname : ""}
            lastname={usr ? usr.lastname : ""}
            email={usr ? usr.email : ""}
            phone={usr ? usr.phone : ""}
          />
        </div>
      </div>
      <div className="toast toast-start toast-middle">
        <div className="alert alert-info">
          <div>{usr?.email}</div>
        </div>
        <div className="alert alert-warning">
          <div>
            <span>{err}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
