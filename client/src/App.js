import React, { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import NavBar from "./components/NavBar";
import { Route } from "react-router-dom";
import "./App.css";

import axios from "axios";

function App() {
  const [firstAPI, setFirstAPI] = useState();
  const [refresh, setRefresh] = useState(true);

  async function fetchUsers() {
    try {
      const data = await axios.get("http://localhost:8080/api/");
      return setFirstAPI(data.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(firstAPI);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <Route exact path="/">
          <Homepage apiLoaded={firstAPI} />
        </Route>
      </div>
    </div>
  );
}

export default App;
