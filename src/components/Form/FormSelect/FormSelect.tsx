import { Select, SelectProps, Text } from "@chakra-ui/react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

type FormSelectProps = SelectProps & {
  register: UseFormRegister<any>;
  error?: FieldError;
  name: string;
  label: string;
  rules?: RegisterOptions;
  children: React.ReactNode;
};

function FormSelect({
  error,
  label,
  name,
  register,
  rules,
  children,
  ...rest
}: FormSelectProps) {
  return (
    <>
      <Text>{label}</Text>
      <Select {...register(name, rules)} {...rest} >
        {children}
      </Select>
      {!!error && <Text color={"red.600"}>{error.message}</Text>}
    </>
  );
}

export default FormSelect;
