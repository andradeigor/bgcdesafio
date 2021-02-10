import React from "react";
import Appbar from "@material-ui/core/AppBar";
import logo from "../../assents/logo.svg";
import logo_title from "../../assents/logo_title.svg";
import { makeStyles } from "@material-ui/core/styles";

import LoginForm from "../LoginForm/index";

const useStyles = makeStyles((theme) => {
  return {
    imagelogo: {
      width: "100px",
      padding: "10px",
      [theme.breakpoints.down("sm")]: {
        width: "80px",
      },
    },
    logo: {
      display: "flex",
    },
    logotitle: {
      width: "300px",
      [theme.breakpoints.down("sm")]: {
        width: "200px",
      },
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    appBar: {
      borderBottom: "solid 3px #3C3B3F",
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      position: "relative",
    },
    grow: {
      flexGrow: 1,
    },
  };
});

const Header = () => {
  const classes = useStyles();
  return (
    <Appbar className={classes.appBar}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" className={classes.imagelogo}></img>
        <img
          src={logo_title}
          alt="logo title"
          className={classes.logotitle}
        ></img>
      </div>
      <div className={classes.grow}></div>
      <LoginForm />
    </Appbar>
  );
};

export default Header;
