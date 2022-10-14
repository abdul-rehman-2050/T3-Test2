import React from 'react'
import RegistrationForm from '../Components/RegistrationForm'


function signup() {
    

  return (
    <div className="max-w-xl mx-auto w-full">
      <div className="flex justify-center my-12">
        <div className="w-full lg:w-11/12 bg-white p-5 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 ">
            Create New Account
          </h1>
          <RegistrationForm />
        </div>
      </div>
    </div>
  )
}

export default signup