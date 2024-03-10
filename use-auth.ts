"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Router } from "next/router";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [token,setToken] = useState(Cookies.get("token"));
  const Router = useRouter()
  //state user
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
        console.log(response.data);
      });
  };
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      Router.push("/auth/login");
    }

    //call function "fetchData"
    fetchData();
  }, []);
  return (
    <div className="h-full flex items-center justify-center">
     
  );
};

export default Layout;
