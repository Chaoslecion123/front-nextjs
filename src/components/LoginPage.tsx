import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import { signIn, getSession, getProviders, useSession } from "next-auth/react";
import { authOptions } from "/src/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { Alerts } from "./Alerts";
import { redirect } from "next/dist/server/api-utils";
import { GetServerSideProps } from "next";
import Nextauth from "@/pages/api/auth/[...nextauth]";

const LoginPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const [errorText, setErrorText] = useState("");
  const auth: any = useAuth();
  const router = useRouter();

  const { data: dataSession }: any = useSession();

  // console.log("dataSession --->", dataSession);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    const code = codeRef?.current?.value;
    const username = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;

    await signIn("credentials", {
      code,
      username,
      password,
      redirect: false,
    });

    // console.log("dataSession", dataSession);

    // if (dataSession?.user?.error) {
    //   setErrorText(dataSession?.user?.error);
    //   // return;
    // }
    // router.push("/dashboard");

    // if (dataSession?.user?.accessToken) {
    //   router.push("/dashboard");
    // } else {
    //   setErrorText("Datos incorrectos");
    // }
  };

  useEffect(() => {
    console.log("dataSession", dataSession);
    if (dataSession?.user?.error) {
      setErrorText(dataSession?.user?.error);
    } else {
      router.push("/dashboard");
    }
  }, [dataSession]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {errorText.length > 0 && (
          <Alerts setErrorText={setErrorText} errorText={errorText} />
        )}

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu codigo
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="00012DWWEW"
                  ref={codeRef}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu usuario
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  ref={usernameRef}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-purple-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
