import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsFillPersonFill, BsMailbox } from "react-icons/bs";
import { MdEmail, MdPhone } from "react-icons/md";

import {
  normalizePhoneNumber,
  normalizeZipCode,
} from "../../Services/Mask/mask";
import requiredFields from "../../Services/Validation/validation";
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

  const phoneValue = watch("phone");
  const cepValue = watch("zip");

  const [dataCep, setDataCep] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue("phone", normalizePhoneNumber(phoneValue));
  }, [phoneValue]);

  useEffect(() => {
    setValue("zip", normalizeZipCode(cepValue));
  }, [cepValue]);

  const onSubmit = (value) => {
    console.log(value);
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
          "Ocorreu um erro ao enviar sua doação, tente novamente mais tarde."
        );
      });
  };

  const checkCep = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(({ data }) => {
        setDataCep(data);
        setLoading(true);
        setValue("city", data.localidade);
        setValue("neighborhood", data.bairro);
        setValue("state", data.uf);
        setValue("streetAddress", data.logradouro);
        setFocus("number");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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
          onChange={checkCep}
        />
        {/* loading effect */}
        {loading ? (
          <div className={S.loading}>
            <div className={S.loading_spinner}>Aguarde...</div>
          </div>
        ) : (
          ""
        )}
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
                  <div key={condition.id}>
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
          <button onClick={() => reset()} className={S.btn_clean}>
            Limpar campos
          </button>
        </div>
      </form>
    </div>
  );
};
export default UserForm;
