import React from "react";

import Card from "../components/Card";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid p-3">
        <div className="jumbotron shadow-lg d-flex justify-content-around flex-wrap">
          <Card title="Site Bemol" path="bemol" />
          <Card title="Bemol Farma" path="farma" />
          <Card title="ChatBot Bob" path="bob" />
          <Card title="Bemol Digital" path="bemoldigital" />
        </div>
      </div>
    </>
  );
};

export default Home;
