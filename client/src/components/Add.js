import React, { useState } from "react";
import axios from "axios";

const Add = (props) => {
  const [name, setName] = useState(() => "");
  const [age, setAge] = useState(() => "");

  const nameHandler = (e) => setName(() => e.target.value);
  const ageHandler = (e) => setAge(() => e.target.value);
  const addHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2357/artist/add", {
        name,
        age,
      })
      .then((response) => {
        props.onClick(response.data);
      });
    let inputs = document.querySelectorAll("input");
    inputs.forEach((inp) => {
      inp.value = "";
    });
  };

  return (
    <div class="add">
      <h1>Add</h1>
      <hr />
      <form onSubmit={addHandler}>
        <h2>Add a new info</h2>
        <label>
          artist name: <input onChange={nameHandler} />
        </label>
        <br />
        <br />
        <label>
          artist age: <input onChange={ageHandler} />
        </label>
        <button>Add</button>
      </form>
    </div>
  );
};

export default Add;
