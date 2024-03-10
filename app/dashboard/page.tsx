"use client";

import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
const Page = () => {
  return (
    <div>
      <LogOut />
    </div>
  );
};

export default Page;
