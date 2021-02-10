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
  const { isOpenLogin, setIsOpenLogin } = props;

  return (
    <Dialog open={isOpenLogin} maxWidth="sm">
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
              Logue Aqui:
            </p>
          </div>
          <div />
          <button
            onClick={setIsOpenLogin}
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
            loemail: "",
            lopassword: "",
          }}
          onSubmit={(values, formikHelpers) => {
            alert(JSON.stringify(values, null, 2));
          }}
          validationSchema={yup.object({
            loemail: yup.string().email().required(),
            lopassword: yup.string().min(6).required(),
          })}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className={classes.formgrid}>
                {touched.loemail && errors.loemail ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="loemail"
                    label="Nome Completo"
                    as={TextField}
                    variant="outlined"
                    id="loemail"
                    className={classes.formfield}
                    type="string"
                    size="small"
                  />
                ) : (
                  <Field
                    name="loemail"
                    label="Email"
                    as={TextField}
                    variant="outlined"
                    id="loemail"
                    className={classes.formfield}
                    type="email"
                    size="small"
                  />
                )}
                {touched.lopassword && errors.lopassword ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="lopassword"
                    label="Senha"
                    as={TextField}
                    variant="outlined"
                    id="lopassword"
                    className={classes.formfield}
                    type="password"
                    size="small"
                  />
                ) : (
                  <Field
                    name="lopassword"
                    label="Senha"
                    as={TextField}
                    variant="outlined"
                    id="lopassword"
                    className={classes.formfield}
                    type="password"
                    size="small"
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
                  Login
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
