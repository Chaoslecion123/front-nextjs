import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export const Header = (props: any) => {
  const router = useRouter();
  const { username } = props;

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Hola <span>{username}</span>
          </span>

          <div className="flex items-center lg:order-2">
            <button
              onClick={() =>
                signOut({ callbackUrl: "http://localhost:9000/auth/login" })
              }
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
