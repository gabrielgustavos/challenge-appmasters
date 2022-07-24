import { useState, useEffect } from "react";
import request from "../utils/api";
const Index = () => {
  let reqResult;
  const [status, setStatus] = useState();

  useEffect(() => {
    request
      .get()
      .then((response) => {
        setStatus(response.data.alive);
      })
      .catch((error) => {
        setStatus(error);
      });
  }, []);
  if (status) {
    reqResult = "API online";
  } else {
    reqResult = "Api offline";
  }

  return (
    <div>
      <header className="header-container">
        <h1>Doação de computadores usados</h1>
      </header>
      <p>{reqResult}</p>
    </div>
  );
};
export default Index;
