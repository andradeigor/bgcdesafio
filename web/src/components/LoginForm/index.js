import { React, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Dialogcomponent from "../Dialog/index";
import Logindialog from "../Logindialog/index";

const useStyles = makeStyles((theme) => {
  return {
    loginForm: {
      maxWidth: "250px",
      maxHeight: "100px",
      marginRight: "16px",
      fontSize: "18px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    buttonlogin: {
      marginRight: 5,
      backgroundColor: "#3C3B3F",
      fontSize: "18px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    buttonloginres: {
      marginRight: 5,
      backgroundColor: "#3C3B3F",
      fontSize: "18px",
      display: "none",
      [theme.breakpoints.down("md")]: {
        display: "inline",
        flexDirection: "row",
      },
    },
    button: {
      marginRight: 5,
      backgroundColor: "#3C3B3F",
      fontSize: "18px",
    },
    FormWarper: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    },
  };
});

const LoginForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const classes = useStyles();

  function haddleIsOpen() {
    setIsOpen(!isOpen);
  }
  function haddleIsOpenLogin() {
    setIsOpenLogin(!isOpenLogin);
  }
  return (
    <Formik
      validationSchema={yup.object({
        email: yup
          .string()
          .email("Formato de Email inválido")
          .max(100)
          .required("Campo obrigatório"),
        password: yup.string().min(6).required("Campo obrigatório"),
      })}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, formikHelpers) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values, errors, touched }) => (
        <div className={classes.FormWarper}>
          <Form>
            {touched.email && errors.email ? (
              <Field
                error
                helperText="Preencha Corretamente"
                name="email"
                label="Email"
                as={TextField}
                variant="outlined"
                id="email"
                className={classes.loginForm}
                type="email"
                size="small"
              />
            ) : (
              <Field
                name="email"
                label="Email"
                as={TextField}
                variant="outlined"
                id="email"
                className={classes.loginForm}
                type="email"
                size="small"
              />
            )}
            {touched.password && errors.password ? (
              <Field
                error
                helperText="Preencha Corretamente"
                name="password"
                label="Senha"
                as={TextField}
                variant="outlined"
                id="password"
                className={classes.loginForm}
                type="password"
                size="small"
              />
            ) : (
              <Field
                name="password"
                label="Senha"
                as={TextField}
                variant="outlined"
                id="password"
                className={classes.loginForm}
                type="password"
                size="small"
              />
            )}
            <Button
              className={classes.buttonlogin}
              variant="contained"
              color="secondary"
              type="Submit"
            >
              Login
            </Button>
            <Button
              className={classes.buttonloginres}
              variant="contained"
              color="secondary"
              onClick={haddleIsOpenLogin}
            >
              Login
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={haddleIsOpen}
            >
              Cadastre-se
            </Button>
          </Form>
          <Logindialog
            isOpenLogin={isOpenLogin}
            setIsOpenLogin={haddleIsOpenLogin}
          />
          <Dialogcomponent isOpen={isOpen} setIsOpen={haddleIsOpen} />
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
