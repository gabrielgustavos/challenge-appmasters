import * as yup from "yup";

/* Validação com YUP, somando com a validação do back-end*/

const requiredFields = yup.object({
  name: yup.string().required("O nome é obrigatório"),
  email: yup.string().email("Digite um e-mail válido"),
  phone: yup
    .string()
    .min(10, "O telefone é obrigatório e deve ter 10 dígitos")
    .required("O telefone é obrigatório"),
  zip: yup.string().required("O CEP é obrigatório"),
  city: yup.string().required("A cidade é obrigatória"),
  state: yup.string().required("O estado é obrigatório"),
  streetAddress: yup.string().required("O logradouro é obrigatório"),
  number: yup.string().required("O número é obrigatório"),
  complement: yup.string(),
  neighborhood: yup.string().required("O bairro é obrigatório"),
  deviceCount: yup
    .number()
    .required("Preencha o número de dispositivos")
    .typeError("Preencha o número de dispositivos")
    .min(1, "Preencha o número de dispositivos"),
});

export default requiredFields;
