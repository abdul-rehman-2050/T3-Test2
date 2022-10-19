import React, { useMemo } from "react";
import { UserType } from "../types/userType";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  UserValidationSchema,
  UserValidationSchemaType,
  CreateUserInterface,
} from "../validate/User";

import { trpc } from "../utils/trpc";
import { useEffect } from "react";


function ProfileCard({ id, firstname, lastname, email, phone }: UserType) {
  const mutation = trpc.useMutation(['user.update'],{
    onSuccess(data) {
      alert("Record Updated"+JSON.stringify(data))                
    },
  });

 
  
  const {
    register,
    handleSubmit,
    
    formState: { errors },
    reset,
    
    
  } = useForm<UserValidationSchemaType>({
    resolver: zodResolver(UserValidationSchema),
    defaultValues: useMemo(() =>{
      return{
        id: id as string,
        firstName:firstname as string,
        lastName:lastname as string,
        phone:phone as string,
        email:email as string,
      }
    }, [email, firstname, id, lastname, phone]),
  });
  /*
  useEffect(() => {
    
    reset({id:id,firstName:firstname,lastName:lastname,phone:phone,email:email});
  }, [email, firstname, id, lastname, phone, reset]);
  */


  
  
  const onSubmit: SubmitHandler<{ id?: string; firstName: string; lastName: string; email: string; password: string; phone: string; }> = async (data) =>{
  
    console.log("i am trying to submit");
    console.log(data);

    mutation.mutate({
      id: data.id as string,
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      
    });
  }

  if(!mutation){
    return <>Loading...</>
  }

  return (
    <div className="bg-primary-100 card card-compact mx-10 my-10 w-96 px-10  py-10 shadow-xl">
    
      <form className="" >
        <input name="id" type="hidden" value={id}></input>
        

        <figure>
          <div className="avatar placeholder online">
            <div className="w-16 rounded-full bg-neutral-focus text-neutral-content">
              <span className="text-xl">
                {firstname?.slice(0, 1) + "" + lastname?.slice(0, 1)}
              </span>
            </div>
          </div>
        </figure>
        <div className="card-body">
          <div className="mb-2 md:flex md:justify-between">
            <div className=" md:mr-2 md:mb-0">
              <label
                className="mb-2 block text-sm font-bold"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className={`focus:shadow-outline input input-secondary w-full appearance-none border px-3 py-2 text-sm leading-tight  focus:outline-none`}
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstname}
                
                
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="mt-2 text-xs italic text-error">
                  {errors.firstName?.message}
                </p>
              )}
            </div>
            <div className="md:ml-2">
              <label
                className="mb-2 block text-sm font-bold "
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className={`focus:shadow-outline input input-secondary w-full appearance-none border px-3 py-2 text-sm leading-tight  focus:outline-none`}
                id="lastName"
                type="text"
                placeholder="Last Name"
                
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="mt-2 text-xs italic text-error">
                  {errors.lastName?.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              className="mb-2 block text-sm font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="eamil"
              id="email"
              placeholder="Type here"
              className="input input-bordered input-secondary w-full max-w-xs"
              
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-2 text-xs italic text-error">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="mb-2 block text-sm font-bold"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              placeholder="92xxxxxxx"
              className="input input-bordered input-secondary w-full max-w-xs"
              
              {...register("phone")}
            />
            {errors.phone && (
              <p className="mt-2 text-xs italic text-error">
                {errors.phone?.message}
              </p>
            )}
          </div>

          <div className="my-1 md:flex md:justify-between">
          <div className=" md:mr-2 md:mb-0">
            <label
              className="mb-2 block text-sm font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="New Password"
              className="input input-bordered input-secondary w-full max-w-xs"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-2 text-xs italic text-error">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className=" md:mr-2 md:mb-0">
            <label
              className="mb-2 block text-sm font-bold "
              htmlFor="c_password"
            >
              Confirm Password
            </label>
            <input
              className={` input input-bordered input-secondary w-full max-w-xs ${
                errors.confirmPassword && "border-error"
              } focus:shadow-outline appearance-none input  focus:outline-none`}
              id="c_password"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-xs italic text-error">
                {errors.confirmPassword?.message}
              </p>
            )}
            </div>
          </div>

          <div className="card-actions justify-end">
            <button onClick={handleSubmit(onSubmit)} className="btn btn-primary btn-block">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileCard;
