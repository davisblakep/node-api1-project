import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 245,
    maxWidth: 245,
  },
  media: {
    height: 140,
  },
});

export default function UserCardPage(props) {
  const classes = useStyles();
  const history = useHistory();
  let params = useParams();

  console.log("Params on UserCardPage", params);

  const editButton = (id) => {
    return history.push(`/users/edit/${id}`), props.setRefresh(true);
  };

  return (
    <div className="userCardPage" style={{ paddingTop: "10%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignContent: "center",
        }}
      >
        {props.users &&
          props.users.map((user) => {
            return (
              <Card className={classes.root} key={user.id}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://images.pexels.com/photos/209717/pexels-photo-209717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {user.bio}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" variant="outlined">
                    Share
                  </Button>

                  <Button
                    onClick={() => editButton(user.id)}
                    size="small"
                    color="primary"
                  >
                    Edit
                  </Button>

                  <Button size="small" color="secondary">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
