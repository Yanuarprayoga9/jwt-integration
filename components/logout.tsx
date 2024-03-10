"use client";

import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LogOut } from "lucide-react";
export const  Logout = () => {
  const cookies = new Cookies();
  const router = useRouter()


  const logoutHanlder = async () => {
    const token = cookies.get('token');
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    //fetch Rest API
    await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/logout`)
    .then(() => {

        //remove token from cookies
        cookies.remove("token");

        //redirect halaman login
        router.push('/auth/login');
    });
};
  
  return (
    <div>
      <Button onClick={logoutHanlder}><LogOut/> logout</Button>
    </div>
  );
};


