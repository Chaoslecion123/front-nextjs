import { createContext, useContext, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import endPoints from "@/services/api";

const AuthContext = createContext({});

export function ProviderAuth({ children }: any) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState();

  const signIn = async (code: any, username: any, password: any) => {
    const options = {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    };

    const { data }: any = await axios.post(
      endPoints.auth.login,
      { code, username, password },
      options
    );
    if (data?.access_token) {
      const token = data.access_token;
      Cookie.set("token", JSON.stringify(data), { expires: 5 });
      setUser({
        user: data?.user,
        code: data?.code,
      });
    }
  };

  return {
    user,
    signIn,
  };
}
