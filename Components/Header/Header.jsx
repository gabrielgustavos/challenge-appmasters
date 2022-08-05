import React from "react";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import S from "/Assets/Styles/Header.module.css"

const Header = () => {
  return (
    <>
      <header className={S.header_container}>
        <h1>Doação de computadores usados</h1>
        <nav>
          <Link href="./instituicoes">
            <a>
              {" "}
              Instituicoes Parceiras{" "}
              <AiOutlineArrowRight size={20} color="#ffffff" />
            </a>
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
