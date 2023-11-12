import { Input, InputProps, Text } from "@chakra-ui/react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

type FormInputProps = InputProps & {
  register: UseFormRegister<any>;
  error?: FieldError;
  name: string;
  label: string;
  rules?: RegisterOptions;
};

function FormInput({
  error,
  label,
  name,
  register,
  rules,
  ...rest
}: FormInputProps) {
  return (
    <>
      <Text>{label}</Text>
      <Input {...register(name, rules)} {...rest} />
      {!!error && <Text color={"red.600"}>{error.message}</Text>}
    </>
  );
}

export default FormInput;
