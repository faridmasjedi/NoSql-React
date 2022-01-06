import React, { useState } from "react";
import Search from "./Search";
import Add from "./Add";

const Crud = (props) => {
  const searchHandler = (data) => {
    props.onClick(data);
  };

  return (
    <div class="crud">
      <Add onClick={searchHandler} />
      <Search class="search" onClick={searchHandler} />
    </div>
  );
};

export default Crud;
