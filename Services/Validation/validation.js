import * as yup from "yup";

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
    .min(1, "O número deve ser maior que 0"),
  devices: yup.array().of(
    yup.object({
      type: yup.string().required("Selecione um tipo de dispositivo"),
      condition: yup
        .string()
        .required("Selecione a condição do dispositivo")
        .nullable(),
    })
  ),
});

export default requiredFields;