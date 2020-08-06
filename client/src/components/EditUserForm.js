import React, { useState, useEffect } from "react";
// import { useEffect } from "react";
// import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
// import jwt from 'jsonwebtoken';
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
// import { updateNavName } from '../../state/actions'
// import { submitEditValue } from "../../state/actions";
import axios from "axios";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  bio: yup.string().required("A bio is a required field"),
  date: yup.string().required("A goal date is a required field"),
  img: yup.string().required("An Image HTML Link is required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    maxWidth: 300,
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const EditUserForm = (props) => {
  let history = useHistory();
  let params = useParams();
  const paramsid = params.id;
  const classes = useStyles();
  const [load, setLoad] = useState(true);
  const submitButton = () => {
    return history.push("/users");
  };

  const cancelButton = (e) => {
    return history.goBack();
  };

  const [formState, setFormState] = useState({
    name: "",
    bio: "",
    // img: "",
  });

  console.log("Logging updated formState in EditValuesForm", formState);

  const [errorState, setErrorState] = useState({
    name: "",
    bio: "",
    img: "",
  });

  async function fetchUserById() {
    try {
      const data = await axios.get(
        `http://localhost:8080/api/users/${params.id}`
      );
      // return console.log("Edit User Form Data", data.data);
      return setFormState(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function submitEdit() {
    axios
      .put(`http://localhost:8080/api/users/${params.id}`, formState)
      .then(history.push("/users"))
      // return console.log("Edit User Form Data", data.data);
      // return setFormState({ name: "", bio: "" });
      // console.log("sumbitEdit axios call", data);
      .catch((err) => console.log(err))
      .finally(props.setRefresh(true));
  }

  console.log(formState);

  useEffect(() => {
    if (load) fetchUserById();
    setLoad(false);
  }, [load]);

  const inputChange = (e) => {
    e.persist();
    validate(e);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const validate = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        console.log("errors", err.errors);
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  // const editButton = () => {
  //   return history.push(`/users/edit/${params.id}`);
  // };

  console.log("ParamsID in EditValuesForm", paramsid);

  const submitForm = (e) => {
    e.preventDefault();
    props.submitEditValue(props.editValues.id, formState);
    console.log("submitEditValues action Submit");
    setFormState({ value: "", description: "", img: "" });
    submitButton();
    // axios
    //     .post("https://vr-direct1.herokuapp.com/api/backer/login", formState)
    //     .then(response => {
    //       const decoded = jwt.decode(response.data.token);
    //       console.log("Axios response from Backer Login submit", response, decoded);
    //       console.log("Axios response from Backer Login userID", decoded.userId);
    //       localStorage.setItem("token", response.data.token);
    //       setTimeout(()=>{history.push(`/backer-dashboard/${decoded.userId}`)},1000);
    //       {props.BackerDisplayName.BackerDisplayName(response, decoded)};
    //       ;})
    //     .catch(err => {console.log("Axios error", err)});
    // cancelButton()
  };

  return (
    <div
      style={{ paddingTop: "10%", display: "flex", justifyContent: "center" }}
    >
      <Card
        className={classes.root}
        // style={{ opacity: "0.9", marginLeft: "10%" }}
        style={{ backgroundColor: "black" }}
      >
        <CardContent>
          <Typography
            // style={{ marginLeft: "4%" }}
            variant="h5"
            component="h2"
            style={{ color: "white", marginLeft: "2%" }}
          >
            Edit Your Value
          </Typography>
          <br />
          <form
            onSubmit={() => submitButton()}
            className={classes.form}
            autoComplete="off"
          >
            <FormControl required>
              <TextField
                autoFocus
                id="name"
                name="name"
                label="Name"
                value={formState.name}
                onChange={inputChange}
                variant="filled"
                isRequired="true"
                style={{ backgroundColor: "white" }}
              />
              <Typography style={{ color: "red", fontSize: "10px" }}>
                {errorState.name}
              </Typography>
            </FormControl>
            <FormControl required>
              <TextField
                id="bio"
                name="bio"
                label="Bio"
                value={formState.bio}
                onChange={inputChange}
                variant="filled"
                type="text"
                required={true}
                isRequired="true"
                style={{ backgroundColor: "white" }}
              />
              <Typography style={{ color: "red", fontSize: "10px" }}>
                {errorState.bio}
              </Typography>
            </FormControl>
            <FormControl required>
              <TextField
                id="img"
                name="img"
                label="Image (HTML LINK)"
                value={formState.img}
                onChange={inputChange}
                variant="filled"
                type="text"
                required={true}
                isRequired="true"
                style={{ backgroundColor: "white" }}
              />
              <Typography style={{ color: "red", fontSize: "10px" }}>
                {errorState.img}
              </Typography>
            </FormControl>
            <CardActions>
              <Button
                onClick={submitEdit}
                type="submit"
                size="small"
                style={{ color: "white" }}
              >
                Submit
              </Button>
              <Button
                onClick={cancelButton}
                size="small"
                style={{ backgroundColor: "white" }}
              >
                Cancel
              </Button>
              <a
                style={{
                  marginBottom: "2%",
                  marginLeft: "6%",
                  font: "1.8rem",
                  color: "white",
                }}
                href="https://www.pexels.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pexels
              </a>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUserForm;
