import { Button, Flex, VStack } from "@chakra-ui/react";
import Card from "../../../components/Card/Card";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/Form/FormInput/FormInput";
import FormSelect from "../../../components/Form/FormSelect/FormSelect";
import useClient from "../../../hooks/useClient";
import { useNavigate, useParams } from "react-router-dom";
import InternalRoutes from "../../../utils/InternalRoutes";
import { useEffect, useState } from "react";
import notify from "../../../hooks/custom/useNotify";
import { ProductSchema } from "./Products";
import useProduct from "../../../hooks/useProduct";

function EditVehicle() {
  const { id } = useParams();

  const { getProduct, editProduct } = useProduct();
  const { clients } = useClient();
  const [product, setProduct] = useState<ProductSchema>({} as ProductSchema)
  const navigateTo = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
    }, values: {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
    }
  });

  useEffect(() => {
    if (!id) return navigateTo(InternalRoutes.VEHICLES);

    const product = getProduct(id);

    if (!product) return navigateTo(InternalRoutes.VEHICLES);

    setProduct(product)

  }, [navigateTo, id, getProduct]);

  const onCancel = () => navigateTo(InternalRoutes.VEHICLES);

  const onSubmit = ({
    name,
    price,
    quantity,
  }: {
    name: string;
    price: number;
    quantity: number;
  }) => {
    editProduct({name, price, quantity});
    notify({message: "Veiculo editado com sucesso"})
    navigateTo(InternalRoutes.VEHICLES)
  };

  return (
    <Card>
      <VStack w={"100%"}>
        <VStack w="100%" gap={"8"} mb={"12"}>
          <VStack align={"flex-start"} w="100%">
            <FormInput name="plate" label="Placa" register={register} />
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormInput name="model" label="Modelo" register={register} />
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormInput name="color" label="Cor" register={register} />
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormSelect name="owner" label="Dono" register={register}>
              {clients.map((client, index) => (
                <option key={index} value={client.id}>
                  {client.nome}
                </option>
              ))}
            </FormSelect>
          </VStack>
        </VStack>

        <Flex gap={"8"}>
          <Button colorScheme="blackAlpha" onClick={onCancel}>
            Voltar
          </Button>
          <Button colorScheme="yellow" onClick={handleSubmit(onSubmit)}>
            Atualizar veiculo
          </Button>
        </Flex>
      </VStack>
    </Card>
  );
}

export default EditVehicle;
