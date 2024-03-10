"use client";
import { cookies } from "next/headers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "universal-cookie";
import { useEffect, useState, useTransition } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
export const formSchema = z
  .object({
    name: z.string().min(8).max(50),
    email: z.string().min(8).max(50),
    password: z.string().min(8).max(50),
    password_confirmation: z.string().min(8).max(50),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password and confirmation must match",
    path: ["password_confirmation"],
  });

export const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string | undefined>();
  const [message, setMessage] = useState<String>();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError("");
    setMessage("");
    const validatedFields = formSchema.safeParse(values);
    if (!validatedFields.success) {
      return setError("Invalid fields");
    }

    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/api/register`,
        validatedFields.data
      )
      .then((response) => {
        if (response.data.success) {
          setMessage("Register success");
        }
        // if (response.data.email) {
        //   setMessage("user already registered");
        // }
      })
      .catch((error) => {
        if(error.response.data.email){
          setError(error.response.data.email);
        }
        setError("Something Went Wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    //check token
    const cookie = new Cookies();

    if (cookie.get("token")) {
      //redirect page dashboard
      router.push("/dashboard");
    }
  }, [router]);
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" method="POST">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-green-500">
            {message && message ? message : null}
          </p>

          <p className="text-red-600">{error && error ? error : null}</p>
          <Button disabled={loading} type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <Link className="text-muted-foreground text-sm" href="/auth/login">/login</Link>

    </>
  );
};
