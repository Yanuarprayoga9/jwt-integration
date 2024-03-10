import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleX, Terminal } from "lucide-react";

interface FormErrorProps {
  message: string | undefined;
}
const FormError: React.FC<FormErrorProps> = ({ message }) => {
    if(!message) return null
  return (
    <Alert>
      <CircleX className="text-destructive h-4 w-4" />
      <AlertTitle>Error!</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default FormError;
