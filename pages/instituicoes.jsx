import datas from "/Services/utils/Institution/institutionData"
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { BsWhatsapp, BsFacebook } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

import S from "/Assets/Styles/Instituicoes.module.css"
export default function instituicoes() {
  return (
    <div>
      <header className={S.header_container}>
        <nav>
          <Link href="/">
            <a>
              {" "}
              <AiOutlineArrowLeft size={20} color="#002fff" />
              Voltar
            </a>
          </Link>
        </nav>
        <h1>Instituições parceiras</h1>
      </header>
      <article className={S.infos}>
        {datas.map((data, index) => (
          <main className={S.container} key={index}>
            <h1 className={S.instituicao_nome}>{data.nome}</h1>
            <h2>Cidade</h2>
            <span>Cidade: {data.cidade}</span>
            <h2>Bairro</h2>
            <span>{data.bairro}</span>
            <h2>Sobre a instituição</h2>
            <span className={S.sobre}>{data.about}</span>
            <h2 className={S.contact_us}>Entre em contato conosco</h2>
            <nav className={S.icons}>
              <span>Site</span>
              <BiWorld size={25} />

              <span>Instagram</span>
              <FaInstagram size={25} color="#d322bb" />

              <span>Whatsapp</span>
              <BsWhatsapp size={25} color="#48ff00" />

              <span>Facebook</span>
              <BsFacebook size={25} color="#003cff" />
            </nav>
          </main>
        ))}
      </article>
    </div>
  );
}
