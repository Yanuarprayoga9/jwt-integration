import { formSchema } from "@/app/auth/login/components/login-form";
import { z } from "zod";

export const login = (values: z.infer<typeof formSchema>) => {
    const validatedFields = formSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }
    return values;
}