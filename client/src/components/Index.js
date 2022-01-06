import React, { useState, useEffect } from "react";
import axios from "axios";

const Index = (props) => {
  const [artist, setArtist] = useState(() => []);
  const [name, setName] = useState(() => "");
  const [age, setAge] = useState(() => "");

  const nameHandler = (e) => setName(() => e.target.value);
  const ageHandler = (e) => setAge(() => e.target.value);

  const makeArrFromObject = (response) => {
    let allInfo = [];
    for (let key in response) {
      response[key]["editFlag"] = false;
      if (response[key]["name"] !== "" && response[key]["age"] !== "") {
        allInfo.push(response[key]);
      }
    }
    return allInfo;
  };

  useEffect(() => {
    let resp = "";
    if (props.artists) {
      resp = props.artists;
      let arrInfo = makeArrFromObject(resp);
      setArtist(() => arrInfo);
    } else {
      axios.get("http://localhost:2357/artists").then((response) => {
        let arrInfo = makeArrFromObject(response.data);
        setArtist(() => arrInfo);
      });
    }
  }, [props.artists]);

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

    setArtist(() => info);
    axios.post("http://localhost:2357/artist/edit", {
      Id: id,
      name,
      age,
    });
  };

  const removeHandler = (data) => {
    let info = artist.filter((a) => {
      return a.Id !== data.Id;
    });

    setArtist(() => info);
    axios.post("http://localhost:2357/artist/remove", {
      Id: data.Id,
      name: data.name,
      age: data.age,
    });
  };

  return (
    <div class="index">
      <h1>Index page </h1>
      <hr />
      {artist.map((a) => (
        <div class="user" key={a.Id}>
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
