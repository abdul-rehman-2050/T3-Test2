import React from "react";

import { signOut, useSession } from "next-auth/react";
import Router from "next/router";
import TopNavDUI from "../Components/DaisyUITopNav";

function Dashboard() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <main>Loading...</main>;
  }
  if (!session) {
    Router.push("/login");
  }

  return (
    <div>
      <TopNavDUI/>

      <div className="flex  h-screen w-full items-center justify-center ">
        <button
          className="btn btn-secondary"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
        <button
          className="mx-1 btn btn-secondary"
          onClick={() => {Router.push("/test2")}}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
