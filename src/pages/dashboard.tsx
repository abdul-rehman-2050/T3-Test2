import React from "react";

import { signOut, useSession } from "next-auth/react";
import Router from "next/router";



function dashboard() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <main>Loading...</main>;
  }
  if(!session){
    Router.push("/login")
  }

  return (
    <div>
      <h2 className="tex-center text-blue-800">dashboar</h2>
      

      <div className="text-center">
        <button
          className="btn btn-secondary"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default dashboard;
