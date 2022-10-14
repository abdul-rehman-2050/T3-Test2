import React from 'react'
import { signOut } from 'next-auth/react';


function dashboard() {
  return (
    <div>
        <h2 className="text-blue-800 tex-center">dashboar</h2>

        <div className="text-center">
            <button
              className="btn btn-secondary"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
        </div>


    </div>
  )
}

export default dashboard;