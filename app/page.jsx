import React, { Suspense } from "react";
import "../styles/app.scss"
import Form from "../app/todoForm"
import Todos from "./todos"



const Page = async () => {
  
  return (
    <div className="container">
      <Form />
      <Suspense fallback={<div>loading...</div>}>
      <Todos />
      </Suspense>
    </div>
  );
};

export default Page;
