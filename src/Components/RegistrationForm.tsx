import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import Router from "next/router";
import { UserValidationSchema,UserValidationSchemaType,CreateUserInterface } from "../validate/User";

const RegistrationForm = () => {

    const mutation = trpc.useMutation(['user.store'],{
        onSuccess() {
          alert("You are registered. Please Login Now")
          Router.push("/login")
         
         
        },
      });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserValidationSchemaType>({
    resolver: zodResolver(UserValidationSchema),
  });

  const onSubmit: SubmitHandler<UserValidationSchemaType> = async (data) =>{
    console.log(data);
    const user: CreateUserInterface = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password

      };
    const val =await mutation.mutate(user);
    console.log(val)
    reset()
    
  } 

  return (
    <form className=" px-8 pt-6 pb-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2 md:flex md:justify-between">
        <div className="mb-2 md:mr-2 md:mb-0">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
              errors.firstName && "border-red-500"
            } focus:shadow-outline appearance-none rounded focus:outline-none`}
            id="firstName"
            type="text"
            placeholder="First Name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.firstName?.message}
            </p>
          )}
        </div>
        <div className="md:ml-2">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
              errors.lastName && "border-red-500"
            } focus:shadow-outline appearance-none rounded focus:outline-none`}
            id="lastName"
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.lastName?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
            errors.email && "border-red-500"
          } focus:shadow-outline appearance-none rounded focus:outline-none`}
          id="email"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-2 text-xs italic text-red-500">
            {errors.email?.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="email"
        >
          Phone Number
        </label>
        <input
          className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
            errors.email && "border-red-500"
          } focus:shadow-outline appearance-none rounded focus:outline-none`}
          id="phone"
          type="phone"
          placeholder="92xxxxxxx"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="mt-2 text-xs italic text-red-500">
            {errors.phone?.message}
          </p>
        )}
      </div>
      
      
      <div className="mb-4 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
              errors.password && "border-red-500"
            } focus:shadow-outline appearance-none rounded focus:outline-none`}
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="md:ml-2">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="c_password"
          >
            Confirm Password
          </label>
          <input
            className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
              errors.confirmPassword && "border-red-500"
            } focus:shadow-outline appearance-none rounded focus:outline-none`}
            id="c_password"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <input type="checkbox" id="terms" {...register("terms")} />
        <label
          htmlFor="terms"
          className={`ml-2 mb-2 text-sm font-bold ${
            errors.terms ? "text-red-500" : "text-gray-700"
          }`}
        >
          Accept Terms & Conditions
        </label>
        {errors.terms && (
          <p className="mt-2 text-xs italic text-red-500">
            {errors.terms?.message}
          </p>
        )}
      </div>
      <div className="mb-6 text-center">
        <button
          className="focus:shadow-outline w-full rounded-full bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-700 focus:outline-none"
          type="submit"
          disabled={mutation.isLoading}
        >
          Register Account
        </button>
        {mutation.error && <p>Something went wrong! {mutation.error.message}</p>}
      </div>
      <hr className="mb-2 border-t" />
     
      <div className="text-center">
        <Link
          className="inline-block align-baseline text-sm text-purple-500 hover:text-purple-800"
          href="/login"
        >
          Already have an account? Login!
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
