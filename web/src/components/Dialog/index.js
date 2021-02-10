import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import logo from "../../assents/logo.svg";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  titlewarper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formfield: {
    margin: "10px",
    width: "250px",
    marginLeft: "15%",
  },
  formgrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
  },
});

const Dialogcomponent = (props) => {
  const classes = useStyles();
  const { isOpen, setIsOpen } = props;
  function onBlurrecep(ev, setFieldValue) {
    const value = ev.target.value;
    const recep = value?.replace(/[^0-9]/g, "");
    return setFieldValue("recep", recep);
  }
  return (
    <Dialog open={isOpen} maxWidth="sm">
      <DialogTitle>
        <div className={classes.titlewarper}>
          <div className={classes.titlewarper}>
            <img
              src={logo}
              alt="logo"
              style={{
                width: "50px",
                marginRight: "30px",
              }}
            />
            <p
              style={{
                fontSize: "36px",
                marginTop: "5px",
                marginBottom: "5px",
                marginRight: "40px",
              }}
            >
              Cadastre-se:
            </p>
          </div>
          <div />
          <button
            onClick={setIsOpen}
            style={{
              fontFamily: ["Poppins", "sans-serif"],
              fontSize: "24px",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            X
          </button>
        </div>
      </DialogTitle>

      <DialogContent dividers>
        <Formik
          initialValues={{
            refullname: "",
            reemail: "",
            creemail: "",
            repassword: "",
            crepassword: "",
            recep: "",
          }}
          onSubmit={(values, formikHelpers) => {
            alert(JSON.stringify(values, null, 2));
          }}
          validationSchema={yup.object({
            refullname: yup.string().required().min(8).max(100),
            reemail: yup.string().email().required(),
            creemail: yup
              .string()
              .required()
              .oneOf([yup.ref("reemail"), null]),
            repassword: yup.string().min(6).required(),
            crepassword: yup
              .string()
              .required()
              .oneOf([yup.ref("repassword"), null]),
            recep: yup
              .string()
              .min(8)
              .test("len", "", (val) => {
                if (val) return val.length === 8;
              }),
          })}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className={classes.formgrid}>
                {touched.refullname && errors.refullname ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="refullname"
                    label="Nome Completo"
                    as={TextField}
                    variant="outlined"
                    id="refullname"
                    className={classes.formfield}
                    type="string"
                    size="small"
                  />
                ) : (
                  <Field
                    name="refullname"
                    label="Nome Completo"
                    as={TextField}
                    variant="outlined"
                    id="refullname"
                    className={classes.formfield}
                    type="string"
                    size="small"
                  />
                )}
                {touched.reemail && errors.reemail ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="reemail"
                    label="Email"
                    as={TextField}
                    variant="outlined"
                    id="reemail"
                    className={classes.formfield}
                    type="email"
                    size="small"
                  />
                ) : (
                  <Field
                    name="reemail"
                    label="Email"
                    as={TextField}
                    variant="outlined"
                    id="reemail"
                    className={classes.formfield}
                    type="email"
                    size="small"
                  />
                )}
                {touched.creemail && errors.creemail ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="creemail"
                    label="Confirmar Email"
                    as={TextField}
                    variant="outlined"
                    id="creemail"
                    className={classes.formfield}
                    type="email"
                    size="small"
                  />
                ) : (
                  <Field
                    name="creemail"
                    label="Confirmar Email"
                    as={TextField}
                    variant="outlined"
                    id="creemail"
                    className={classes.formfield}
                    type="email"
                    size="small"
                  />
                )}
                {touched.repassword && errors.repassword ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="repassword"
                    label="Senha"
                    as={TextField}
                    variant="outlined"
                    id="repassword"
                    className={classes.formfield}
                    type="password"
                    size="small"
                  />
                ) : (
                  <Field
                    name="repassword"
                    label="Senha"
                    as={TextField}
                    variant="outlined"
                    id="repassword"
                    className={classes.formfield}
                    type="password"
                    size="small"
                  />
                )}
                {touched.crepassword && errors.crepassword ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="crepassword"
                    label="Confirmar senha"
                    as={TextField}
                    variant="outlined"
                    id="crepassword"
                    className={classes.formfield}
                    type="password"
                    size="small"
                  />
                ) : (
                  <Field
                    name="crepassword"
                    label="Confirmar senha"
                    as={TextField}
                    variant="outlined"
                    id="crepassword"
                    className={classes.formfield}
                    type="password"
                    size="small"
                  />
                )}
                {touched.recep && errors.recep ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="recep"
                    label="CEP"
                    as={TextField}
                    variant="outlined"
                    id="recep"
                    className={classes.formfield}
                    type="string"
                    size="small"
                    onBlur={(ev) => onBlurrecep(ev, setFieldValue)}
                  />
                ) : (
                  <Field
                    name="recep"
                    label="CEP"
                    as={TextField}
                    variant="outlined"
                    id="recep"
                    className={classes.formfield}
                    type="string"
                    size="small"
                    onBlur={(ev) => onBlurrecep(ev, setFieldValue)}
                  />
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={{
                    marginTop: "30px",
                  }}
                >
                  Cadastrar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default Dialogcomponent;
