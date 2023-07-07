
// import { useSession } from "next-auth/react";
import NavbarComponent from "../navbar/navbar";
import { PropsWithChildren } from "react";
import { Footer } from "../footer/Footer";


export const Layout = ({ children } : PropsWithChildren) => {
  // const { data: session } = useSession()
  
  return (
    <>
        <NavbarComponent />
          {children}
        <Footer />
    </>
  );
};