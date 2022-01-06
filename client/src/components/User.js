import React, { useState, useEffect } from "react";
import Index from "./Index";
import Crud from "./Crud";

const User = (props) => {
  const [artists, setArtists] = useState(() => {});
  const searchHandler = (data) => {
    setArtists(data);
  };

  useEffect(() => {}, [artists]);

  return (
    <div className="App">
      <Index class="index" artists={artists} />
      <Crud onClick={searchHandler} />
    </div>
  );
};

export default User;
