import LoginPage from "@/components/LoginPage";
import Nextauth from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const Login = () => <LoginPage />;

// export async function getServerSideProps(context: any) {
//   const session: any = await getServerSession(
//     context.req,
//     context.res,
//     Nextauth
//   );

//   console.log("session login", session?.user?.name);

//   if (session?.user?.name !== undefined) {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       session: JSON.parse(JSON.stringify(session)),
//     },
//   };
// }

export default Login;
