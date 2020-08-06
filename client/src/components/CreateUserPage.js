import React from "react";
import CreateUserForm from "./CreateUserForm";

const CreateUserPage = (props) => {
  return (
    <div className="createUserPage">
      <CreateUserForm setRefresh={props.setRefresh} />
    </div>
  );
};

export default CreateUserPage;
