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
import { useState, useTransition } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
export const formSchema = z.object({
  email: z.string().min(8).max(50),
  password: z.string().min(8).max(50),
});

export const LoginForm = () => {
  const cookie = new Cookies();
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [error, setError] = useState<String>();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const validatedFields = formSchema.safeParse(values);
    if (!validatedFields.success) {
      return setError("Invalid fields");
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        validatedFields.data
      );
      console.log(response.data.token);
    //   cookie.set("token", response.data?.token);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message);
      console.log(error);
    } finally {
      setLoading(false); // Setting loading to false regardless of success or failure
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <FormLabel>passowrd</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};
