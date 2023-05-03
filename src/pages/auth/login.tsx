import LoginPage from "@/components/LoginPage";
import Nextauth from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const Login = () => <LoginPage />;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, Nextauth);

  console.log("session login", session);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Login;
