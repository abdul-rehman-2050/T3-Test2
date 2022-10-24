import type { NextPage } from "next";
import Head from "next/head";
import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, ILogin } from "../server/common/validation/auth";
import Link from "next/link";

const Home: NextPage = () => {
  const { handleSubmit, control, reset } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (data: ILogin) => {
      try {
        await signIn("credentials", { ...data, callbackUrl: "/dashboard" });
        reset();
      } catch (err) {
        console.error(err);
      }
    },
    [reset]
  );

    return (
      <div className="container">
      <h1 className="justify-center btn btn-primary"><Link href="/login">Login</Link></h1>
      </div>
    );

  return (
    
    <div>
      <Head>
        <title>Next App - Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form
          className="flex h-screen w-full items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border-1 bg-base-100 relative flex w-96 min-w-0 flex-col break-words rounded border border-gray-300 bg-white shadow-xl">
            <div className="flex-auto p-6">
              <h5 className="mb-3 text-center text-blue-900">Welcome back!</h5>
              <div className="">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    type="email"
                    placeholder="Type your email..."
                    className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                    {...field}
                  />
                )}
              />
              </div>
              <div className="mt-1">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    type="password"
                    placeholder="Type your password..."
                    className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                    {...field}
                  />
                )}
              />
              </div>
              <div className="text-center lg:text-left mt-2">
                <button
                  className="inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                  type="submit"
                >
                  Login
                </button>
                <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                  are you a new user?
                  <Link
                    href="/signup"
                    className="text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
