import React from "react";
import { FC } from "react";
import { trpc } from "../utils/trpc";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  id : string,
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};


interface InputProps {
    user: Inputs,
  }

export const UserUpdateForm:FC<InputProps>= (props)=> {

  const updateMutation = trpc.useMutation(['user.update'])


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    updateMutation.mutate(data)
  }

  return (
    <div className=" card" data-theme="night">
        
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" defaultValue={props.user.id as string}
           {...register("id")}
          />
          <div className="mb-2 md:flex md:justify-between">
            <div className=" mt-1">
              <label className="block text-lg font-bold" htmlFor="firstame">
                First Name
              </label>
              <input
                id="firstname"
                className={` input input-bordered input-secondary w-full max-w-xs ${
                  errors.firstname && "border-error"
                } focus:shadow-outline input appearance-none  focus:outline-none`}
                defaultValue={props.user.firstname} 
                {...register("firstname", { required: true })}
              />
              <div className="text-error">
                {errors.firstname && <span>This field is required</span>}
              </div>
            </div>

            <div className="m-1">
              <label className="block text-lg font-bold " htmlFor="lastname">
                Last Name
              </label>
              <input
                id="lastname"
                className={` input input-bordered input-secondary w-full max-w-xs ${
                  errors.lastname && "border-error"
                } focus:shadow-outline input appearance-none  focus:outline-none`}
                defaultValue={props.user.lastname} 
                {...register("lastname", { required: true })}
              />
              <div className="text-error">
                {errors.lastname && <span>This field is required</span>}
              </div>
            </div>
          </div>
          <div className="mt-1 w-full">
            <label className="block w-full text-lg font-bold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className={` input input-bordered input-secondary w-full ${
                errors.email && "border-error"
              } focus:shadow-outline input appearance-none  focus:outline-none`}
              defaultValue={props.user.email} 
              {...register("email", { required: true })}
            />
            <div className="text-error">
              {errors.email && <span>This field is required</span>}
            </div>
          </div>
          <div className="mt-1 w-full">
            <label className="block w-full text-lg font-bold" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              className={` input input-bordered input-secondary w-full ${
                errors.phone && "border-error"
              } focus:shadow-outline input appearance-none  focus:outline-none`}
              defaultValue={props.user.phone} 
              {...register("phone", { required: true })}
            />
            <div className="mb-3 text-error">
              {errors.phone && <span>This field is required</span>}
            </div>
          </div>
          <div className="mt-1">
            <button className="btn btn-secondary btn-block" type="submit">
              Save{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


