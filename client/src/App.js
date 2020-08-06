import React, { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import NavBar from "./components/NavBar";
import UserCardPage from "./components/UserCardPage";
import EditCardPage from "./components/EditCardPage";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import axios from "axios";

function App() {
  const [firstAPI, setFirstAPI] = useState();
  const [users, setUsers] = useState();
  const [refresh, setRefresh] = useState(true);

  async function fetchWelcome() {
    try {
      const data = await axios.get("http://localhost:8080/api/");
      return setFirstAPI(data.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUsers() {
    try {
      const data = await axios.get("http://localhost:8080/api/users");
      // return console.log("Fetch Users Data", data.data);
      return setUsers(data.data), setRefresh(false);
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(firstAPI);
  console.log("Refresh", refresh);

  useEffect(() => {
    if (refresh) {
      fetchWelcome();
      fetchUsers();
    }
  }, [refresh]);

  return (
    <div>
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/">
            <Homepage apiLoaded={firstAPI} />
          </Route>
          <Route exact path="/users">
            <UserCardPage users={users} setRefresh={setRefresh} />
          </Route>
          <Route path="/users/edit/:id">
            <EditCardPage users={users} setRefresh={setRefresh} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
