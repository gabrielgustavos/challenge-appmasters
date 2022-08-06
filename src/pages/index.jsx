import React from "react";
import Head from "next/head";
import Header from "../Components/Header/Header";
import UserForm from "../Components/Form/Index";

const index = () => {
  return (
    <>
      <Head>
        <title>Formulário de Doação</title>
        <meta name="description" content="Formulário de Doação" />
        <meta name="keywords" content="Formulário, Doação, Equipamentos" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <Header />
      <UserForm />
    </>
  );
};

export default index;
