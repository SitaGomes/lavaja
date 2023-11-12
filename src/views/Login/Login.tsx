import { Button, Center, Image, VStack } from "@chakra-ui/react";
import FormInput from "../../components/Form/FormInput/FormInput";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import useJWT from "../../hooks/custom/useJWT";
import InternalRoutes from "../../utils/InternalRoutes";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  password: yup.string().required("Senha é obrigatória"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { setToken, isTokenValid } = useJWT();
  const navigateTo = useNavigate();

  const onSubmit = (data: any) => {
    if (data.password === "123") {
      setToken();
      navigateTo(InternalRoutes.DASHBOARD);
    }
  };

  useEffect(() => {
    if (isTokenValid()) {
      navigateTo(InternalRoutes.DASHBOARD);
    }
  }, [isTokenValid, navigateTo]);

  return (
    <Center h={"100vh"}>
      <VStack gap={4} maxW={"300px"} flexWrap={"wrap"}>
        <Image src="/logo-big.png" />

        <FormInput
          register={register}
          error={errors.password}
          name="password"
          label="Senha de entrada"
        />

        <Button width={"100%"} onClick={handleSubmit(onSubmit)}>
          Entrar no sistema
        </Button>
      </VStack>
    </Center>
  );
}

export default Login;
