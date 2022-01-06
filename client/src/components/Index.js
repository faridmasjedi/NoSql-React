import React, { useState, useEffect } from "react";
import axios from "axios";

const Index = (props) => {
  const [artist, setArtist] = useState(() => []);
  const [name, setName] = useState(() => "");
  const [age, setAge] = useState(() => "");
  const [editFlag, setEditFlag] = useState(() => false);

  useEffect(() => {
    axios.get("http://localhost:2357/artists").then((response) => {
      console.log("all - data: ", response.data);
      let allInfo = [];
      for (let key in response.data) {
        response.data[key]["editFlag"] = false;
        if (
          response.data[key]["name"] !== "" &&
          response.data[key]["age"] !== ""
        ) {
          allInfo.push(response.data[key]);
        }
      }
      setArtist(() => allInfo);
    });
  }, []);

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
        let allInfo = [];
        for (let key in response.data) {
          if (
            response.data[key]["name"] !== "" &&
            response.data[key]["age"] !== ""
          ) {
            allInfo.push(response.data[key]);
          }
        }
        setArtist(() => allInfo);
      })
      .then(() => console.log("artists:", artist));
  };

  const editHandler = (id) => {
    let info = artist.map((a) => {
      if (a.Id === id) {
        a.editFlag = true;
      }
      return a;
    });
    setArtist(() => info);
  };

  const editSubmitter = (id) => {
    let info = artist.map((a) => {
      if (a.Id === id) {
        a = {
          Id: id,
          name: name || a.name,
          age: age || a.age,
          editFlag: false,
        };
      }
      return a;
    });
    console.log("edit - client:", info);
    setArtist(() => info);
    axios.post("http://localhost:2357/artist/edit", {
      Id: id,
      name,
      age,
    });
    setEditFlag((prev) => !prev);
  };

  const removeHandler = (data) => {
    let info = artist.filter((a) => {
      return a.Id !== data.Id;
    });
    console.log("remove - client:", info);
    setArtist(() => info);
    axios.post("http://localhost:2357/artist/remove", {
      Id: data.Id,
      name: data.name,
      age: data.age,
    });
  };

  return (
    <div>
      <h1>Index page </h1>
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
      <hr />
      {artist.map((a) => (
        <div key={a.Id}>
          <p>
            name: {a.name}{" "}
            {a.editFlag ? <input onChange={nameHandler} value={name} /> : ""}
          </p>
          <p>
            age: {a.age}{" "}
            {a.editFlag ? <input onChange={ageHandler} value={age} /> : ""}
          </p>
          {a.editFlag ? (
            <button onClick={() => editSubmitter(a.Id)}>Submit</button>
          ) : (
            ""
          )}
          <button onClick={() => editHandler(a.Id)}>Edit</button>
          <button onClick={() => removeHandler(a)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Index;
