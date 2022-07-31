import axios from "axios";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { normalizePhoneNumber, normalizeZipCode } from "../utils/mask";
import schema from "../utils/validation";
import api from "../service/api";

import S from "./Styles.module.css";

const Index = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setFocus,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const phoneValue = watch("phone");
  const cepValue = watch("zip");

  const [dataCep, setDataCep] = useState();

  useEffect(() => {
    setValue("phone", normalizePhoneNumber(phoneValue));
  }, [phoneValue]);

  useEffect(() => {
    setValue("zip", normalizeZipCode(cepValue));
  }, [cepValue]);

  const onSubmit = (value) => {
    console.log(value);
    api
      .post("/donation", value)
      .then((response) => {
        alert("Obrigado por doar!");
      })
      .catch((error) => {
        alert(
          `Ocorreu um problema de conexão com o servidor, verifique os dados digitados. Status: ${error}`
        );
      });
    reset();
  };
  const checkCep = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(({ data }) => {
        setDataCep(data);
        setValue("city", data.localidade);
        setValue("neighborhood", data.bairro);
        setValue("state", data.uf);
        setValue("streetAddress", data.logradouro);
        setFocus("number");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const types = [
    { deviceName: "Notebook", id: "notebook" },
    { deviceName: "Desktop", id: "desktop" },
    { deviceName: "Netbook", id: "netbook" },
    { deviceName: "Monitor", id: "screen" },
    { deviceName: "Impressora", id: "printer" },
    { deviceName: "Scanner", id: "scanner" },
  ];

  const conditions = [
    {
      deviceName: "Tem todas as partes, liga e funciona normalmente",
      id: "working",
    },
    { deviceName: "Tem todas as partes, mas não liga mais", id: "notWorking" },
    {
      deviceName: "Faltam peças, funciona só as vezes ou está quebrado",
      id: "broken",
    },
  ];

  const [deviceCount, setDeviceCount] = useState("");

  const handleDeviceCountChange = (event) => {
    let textarea = event.target.value;

    setDeviceCount(textarea);
    console.log(deviceCount);
  };

  return (
    <>
      <form className={S.form_container} onSubmit={handleSubmit(onSubmit)}>
        <label>Nome *</label>

        <input type="text" placeholder="Ex: Gabriel" {...register("name")} />
        <span>{errors.name?.message}</span>

        <label>Email</label>

        <input
          placeholder="Ex: email@exemplo.com"
          type="email"
          {...register("email")}
        />
        <span>{errors.email?.message}</span>

        <label>Telefone *</label>

        <input
          placeholder="Ex: (DD)99999-9999"
          type="phone"
          {...register("phone")}
        />
        <span>{errors.phone?.message}</span>

        <label>Cep *</label>

        <input
          placeholder="Ex: 99999-999"
          type="text"
          {...register("zip")}
          onBlur={checkCep}
        />
        <span>{errors.zip?.message}</span>

        {!dataCep && (
          <div>
            <span>
              O endereço será preenchido automaticamente pelo CEP, aguarde!
            </span>
          </div>
        )}
        <label>Logradouro *</label>
        <input type="text" {...register("streetAddress")} />
        <span>{errors.streetAddress?.message}</span>

        <label>Bairro *</label>
        <input type="text" {...register("neighborhood")} />
        <span>{errors.neighborhood?.message}</span>

        <label>Número *</label>
        <input type="text" {...register("number")} />
        <span>{errors.number?.message}</span>

        <label>Complemento</label>
        <input type="text" {...register("complement")} />

        <label>Cidade *</label>
        <input type="text" {...register("city")} />
        <span>{errors.city?.message}</span>

        <label>Estado</label>
        <input type="text" {...register("state")} />
        <span>{errors.state?.message}</span>

        <label>Número de doações</label>
        <input
          type="number"
          {...register("deviceCount")}
          onChange={handleDeviceCountChange}
        />
        <span>{errors.deviceCount?.message}</span>
      </form>

      {deviceCount >= 1 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <footer>
            {Array.from({ length: deviceCount }, (_, index) => (
              <div className={S.selection_wrapper} key={index}>
                <label>Equipamento</label>
                <select {...register(`devices[${index}].type`)}>
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.deviceName}
                    </option>
                  ))}
                </select>
                <label>Condição</label>
                <select {...register(`devices[${index}].condition`)}>
                  {conditions.map((condition) => (
                    <option key={condition.id} value={condition.id}>
                      {condition.deviceName}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </footer>
          <div className={S.btn_submit}>
            <button onClick={handleSubmit(onSubmit)} type="submit">
              Confirmar
            </button>
          </div>
        </form>
      )}
    </>
  );
};
export default Index;
