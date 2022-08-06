import axios from "axios";

import { useEffect, useState } from "react";

/* Libs de validação e armazenamento de estados*/
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { BsFillPersonFill, BsMailbox } from "react-icons/bs";
import { MdEmail, MdPhone } from "react-icons/md";

/* Validação de campos e armazenamento de dados*/
import requiredFields from "/src/Services/Validation/validation";
import { types, conditions } from "../../Services/utils/Devices/DevicesData";
import {
  normalizePhoneNumber,
  normalizeZipCode,
} from "../../Services/Mask/mask";

import api from "../../api/api";

import S from "../../Assets/Styles/Form.module.css";

const UserForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setFocus,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(requiredFields),
  });

  /* Formatação dos campos de CEP e phone*/
  const phoneValue = watch("phone");
  const cepValue = watch("zip");

  useEffect(() => {
    setValue("phone", normalizePhoneNumber(phoneValue));
  }, [phoneValue, setValue]);

  useEffect(() => {
    setValue("zip", normalizeZipCode(cepValue));
  }, [cepValue, setValue]);

  const [dataCep, setDataCep] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = (value) => {
    if (value.email === "") {
      value.email = null;
    }

    api
      .post("/donation", value)
      .then((response) => {
        alert("Obrigado por doar!");
      })
      .catch((error) => {
        alert(
          `Faltam os seguintes campos:\n${error.response.data.requiredFields.join(
            "\n"
          )}`
        );
      });
    reset();
  };

  /* Busca de CEP e preenchimento automaticamento com setValue */
  const checkCep = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    try {
      setLoading(true);
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setDataCep(response.data);
      setValue("streetAddress", response.data.logradouro);
      setValue("neighborhood", response.data.bairro);
      setValue("city", response.data.localidade);
      setValue("state", response.data.uf);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("CEP inválido");
    }
  };

  const [deviceCount, setDeviceCount] = useState("");
  const [deviceCondition, setDeviceCondition] = useState("");

  const handleDeviceCountChange = (event) => {
    let textarea = event.target.value;

    setDeviceCount(textarea);
    console.log(deviceCount);
  };

  const conditionDevice = (event) => {
    let type = event.target.value;
    setDeviceCondition(type);
  };

  return (
    <div className={S.container}>
      <form className={S.form_container} onSubmit={handleSubmit(onSubmit)}>
        <label>
          {" "}
          <BsFillPersonFill color="black" />
          Nome *
        </label>

        <input type="text" placeholder="Ex: Gabriel" {...register("name")} />
        <span className={S.condition_message}>{errors.name?.message}</span>

        <label>
          {" "}
          <MdEmail size={25} color="black" /> Email
        </label>

        <input
          placeholder="Ex: email@exemplo.com"
          type="email"
          {...register("email")}
        />
        <span className={S.condition_message}>{errors.email?.message}</span>

        <label>
          {" "}
          <MdPhone color="black" />
          Telefone *
        </label>

        <input
          placeholder="Ex: (DD)99999-9999"
          type="phone"
          {...register("phone")}
        />
        <span className={S.condition_message}>{errors.phone?.message}</span>

        <label>
          {" "}
          <BsMailbox color="black" size={25} /> Cep *
        </label>

        <input
          placeholder="Ex: 99999-999"
          type="text"
          {...register("zip")}
          onBlur={checkCep}
        />

        {loading ? <div className={S.loading}>Loading...</div> : ""}

        <span className={S.condition_message}>{errors.zip?.message}</span>

        <label>Logradouro *</label>
        <input type="text" {...register("streetAddress")} />
        <span className={S.condition_message}>
          {errors.streetAddress?.message}
        </span>
        <label>Bairro *</label>

        <input type="text" {...register("neighborhood")} />
        <span className={S.condition_message}>
          {errors.neighborhood?.message}
        </span>

        <label>Número *</label>
        <input type="text" {...register("number")} />
        <span className={S.condition_message}>{errors.number?.message}</span>

        <label>Complemento</label>
        <input type="text" {...register("complement")} />

        <label>Cidade *</label>
        <input type="text" {...register("city")} />
        <span className={S.condition_message}>{errors.city?.message}</span>

        <label>Estado</label>
        <input type="text" {...register("state")} />
        <span className={S.condition_message}>{errors.state?.message}</span>

        <label>Número de doações</label>
        <input
          type="number"
          {...register("deviceCount")}
          onChange={handleDeviceCountChange}
          min="1"
        />
        <span className={S.condition_message}>
          {errors.deviceCount?.message}
        </span>

        {/* Iteração de um array criado baseado em deviceCount */}
        <footer>
          {Array.from({ length: deviceCount }, (_, index) => (
            <div className={S.selection_wrapper} key={index}>
              <label>Equipamento {index + 1}</label>
              <select {...register(`devices[${index}].type`)}>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.deviceName}
                  </option>
                ))}
              </select>
              <label>Condição do equipamento</label>

              <br />

              <div {...register(`devices[${index}].condition`)}>
                {conditions.map((condition) => (
                  <div className={S.options_condition} key={condition.id}>
                    <input
                      key={condition.id}
                      type="radio"
                      value={condition.id}
                      {...register(`devices[${index}].condition`)}
                      onChange={conditionDevice}
                    />
                    <span>{condition.deviceName}</span>
                  </div>
                ))}

                <span className={S.condition_message}>
                  {errors.devices?.[index]?.condition?.message}
                </span>

              </div>
            </div>
          ))}
          
        </footer>
        <div className={S.btn_submit}>
          <button
            className={S.btn_send}
            onClick={handleSubmit(onSubmit)}
            type="submit"
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};
export default UserForm;
