"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import { userContext } from "@/hooks/useUser";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const token = Cookies.get("token");
  const Router = useRouter();

  const [user, setUser] = useState({});

  //function "fetchData"
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/user`)
      .then((response) => {
        //set response user to state
        setUser(response.data);
      });
  };

  //hook useEffect
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      Router.push("/auth/login");
    }

    //call function "fetchData"
    fetchData();
  }, []);

  //function logout
  
  return (
    <userContext.Provider value={user}>
      <div className="h-full flex items-center justify-center">
        <div className="w-[600px] mt-48 shadow-md bg-slate-100 ">
          <div className="p-[50px]">{children}</div>
        </div>
      </div>
    </userContext.Provider>
  );
};

export default Layout;
