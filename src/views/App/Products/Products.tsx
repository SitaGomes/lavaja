import { Button, Flex, Icon, Text } from "@chakra-ui/react";

import { AiFillPlusCircle } from "react-icons/ai";
import Card from "../../../components/Card/Card";
import { Row } from "@tanstack/react-table";

import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useEffect, useState } from "react";
import AddProduct from "./add";
import useJWT from "../../../hooks/custom/useJWT";
import { useNavigate } from "react-router-dom";
import InternalRoutes from "../../../utils/InternalRoutes";
import ProductTable, { ProductTableRow } from "../../../components/Dashboard/Table/ProductTable";
import useProduct from "../../../hooks/useProduct";

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  price: yup.number().typeError("Valor deve ser numerico").positive("Preço deve ser positivo").required("Preço é obrigatório"),
  quantity: yup.number().typeError("Quantidade deve ser numerico").positive("Quantidade deve ser positiva").required("Quantidade é obrigatória"),
});

export type ProductSchema = {
  name: string
  price: number
  quantity: number
};

const Steps = {
  First: 0 as number,
  Second: 1 as number,
} as const;

function Products() {
  const { isTokenValid } = useJWT();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isTokenValid()) {
      navigateTo(InternalRoutes.LOGIN);
    }
  }, [isTokenValid, navigateTo]);
  const [steps, setSteps] = useState<number>(Steps.First);

  const { products, addProduct} = useProduct();

  const methods = useForm<ProductSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
    },
  });

  const onEdit = ({ original }: Row<ProductTableRow>) => {
    navigateTo(`${InternalRoutes.PRODUCT_EDIT}/${original.name}`);
  };

  const nextStep = () => {
    if (steps === Steps.First) {
      setSteps(Steps.Second);
    }
  };

  const prevStep = () => {
    if (steps === Steps.Second) {
      methods.reset({ name: "", price: 0, quantity: 0 });
      setSteps(Steps.First);
    }
  };

  const onSubmit = (props: any) => {
    console.log("props", props)
    addProduct(props);
    prevStep();
  };

  const renderSteps = {
    [Steps.First]: (
      <Card>
        <ProductTable
          onEdit={onEdit}
          data={products?.map((p) => {
            return { ...p, edit: true };
          }) || []}
        />
      </Card>
    ),

    [Steps.Second]: <AddProduct onCancel={prevStep} onSubmit={onSubmit} />,
  };

  return (
    <Flex flexDir={"column"} w={"100%"} gap={"10"}>
      <Button
        bgColor={"white"}
        _hover={{ bgColor: "gray.200" }}
        onClick={nextStep}
      >
        <Flex gap={"4"}>
          <Icon as={AiFillPlusCircle} w="20px" h="20px" />
          <Text paddingTop={"0.5"}>Adicionar producto</Text>
        </Flex>
      </Button>

      <Flex w="100%">
        <FormProvider {...methods}>{renderSteps[steps]}</FormProvider>
      </Flex>
    </Flex>
  );
}

export default Products;
