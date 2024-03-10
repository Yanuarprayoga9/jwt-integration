"use client";

import Cookies from "universal-cookie";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { Logout } from "@/components/logout";
import { userContext } from "@/hooks/useUser";
const Page = () => {
  const user = useContext(userContext);
  console.log(user);
  return (
    <div>
      {user&&user ? JSON.stringify(user) : ""}
      <Logout/>
    </div>
  );
};

export default Page;
