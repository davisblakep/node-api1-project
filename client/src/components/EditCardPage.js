import React from "react";
import EditUserForm from "./EditUserForm";

const EditCardPage = (props) => {
  return (
    <div className="editCardPage">
      <EditUserForm users={props.users} setRefresh={props.setRefresh} />
    </div>
  );
};

export default EditCardPage;
