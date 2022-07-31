import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("O nome é obrigatório"),
  email: yup.string().email("Digite um e-mail válido"),
  phone: yup
    .string()
    .min(12, "O telefone é obrigatório e deve ter 12 dígitos")
    .required("O telefone é obrigatório"),
  zip: yup.string().required("O CEP é obrigatório"),
  city: yup.string().required("A cidade é obrigatória"),
  state: yup.string().required("O estado é obrigatório"),
  streetAddress: yup.string().required("O endereço é obrigatório"),
  number: yup.string().required("O número é obrigatório"),
  complement: yup.string(),
  neighborhood: yup.string().required("O bairro é obrigatório"),
  deviceCount: yup
    .number()
    .required("Preencha o número de dispositivos")
    .typeError("Preencha o número de dispositivos")
    .min(1, "O número deve ser maior que 0"),
});

export default schema;
