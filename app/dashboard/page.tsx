"use client";

import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
const Page = () => {
  const cookies = new Cookies();
  const router = useRouter()
  const [token, setToken] = useState<string | null>("");


  const handleSubmit = () => {
    cookies.remove("token");
    setToken(null);
    console.log(token);
    router.push("/auth/login");
  };
  useEffect(()=>{
    if(!cookies.get('token')) router.push('/auth/login');
  })
  return (
    <div>
      <Button onClick={handleSubmit}>logout</Button>
      {token}
    </div>
  );
};

export default Page;
