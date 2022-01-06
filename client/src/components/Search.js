import axios from "axios";
import React, { useState, useEffect } from "react";

const Search = (props) => {
  const [name, setName] = useState(() => "");
  const [age, setAge] = useState(() => "");
  const [textFlag, setTextFlag] = useState(() => false);

  const nameHandler = (e) => setName(() => e.target.value);
  const ageHandler = (e) => setAge(() => e.target.value);
  const makeValAndVarArr = (v, vName) => {
    let valArr = [];
    let varArr = [];
    v.forEach((e, index) => {
      if (e) {
        valArr.push(e);
        varArr.push(vName[index]);
      }
    });
    return { valArr, varArr };
  };

  const searchHandler = () => {
    setTextFlag(false);
    let res = makeValAndVarArr([name, age], ["name", "age"]);
    axios.post("http://localhost:2357/artist/search", res).then((response) => {
      console.log("search - data: ", response);
      if (!response.data) {
        setTextFlag(true);
      }
      props.onClick(response.data);
    });
  };

  return (
    <div class="search">
      <h1>Search</h1>
      {textFlag ? <p> There is no row with this info</p> : ""}
      <hr />
      <label>
        name: <input class="name" onChange={nameHandler} />
      </label>
      <label>
        age: <input class="age" onChange={ageHandler} />
      </label>
      <button onClick={searchHandler}>Search</button>
    </div>
  );
};

export default Search;
