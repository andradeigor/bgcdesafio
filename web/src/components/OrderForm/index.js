import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { CheckboxWithLabel } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assents/logo.svg";
import axios from "axios";

const useStyles = makeStyles((theme) => {
  return {
    orderformwarper: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#FFFFFF",
      paddingTop: "5%",
      paddingBottom: "5%",
    },
    formwarper: {
      border: "solid 3px #3C3B3F",
      maxWidth: "640px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "400px",
      },
    },
    formtitlewarper: {
      borderBottom: "solid 3px #3C3B3F",
      display: "flex",
      maxHeight: "120px",
    },
    formimage: {
      width: "100px",
      padding: "10px",
      [theme.breakpoints.down("sm")]: {
        padding: "10px",
        width: "80px",
      },
    },
    formtitle: {
      fontSize: "36px",
      fontWeight: "400px",
      textAlign: "center",
      width: "600px",
      fontFamily: ["Poppins", "sans-serif"],
      [theme.breakpoints.down("sm")]: {
        fontSize: "22px",
        paddingLeft: "0px",
      },
    },
    formfield: {
      margin: "20px",
      width: "250px",
      marginLeft: "10%",
    },
    formcheckbox: {
      marginLeft: "10%",
    },
    formgrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
      },
    },
    checkboxgrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr ",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
      },
    },
    submitbutton: {
      marginLeft: "20%",
      width: "60%",
      marginBottom: "5%",
      marginTop: "5%",
    },
  };
});

const Orderform = () => {
  const classes = useStyles();
  function onBlurcep(ev, setFieldValue) {
    const value = ev.target.value;
    const cep = value?.replace(/[^0-9]/g, "");
    setFieldValue("cep", cep);
    if (cep?.length !== 8) {
      return;
    } else {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
        const info = response.data;
        setFieldValue("uf", info.uf);
        setFieldValue("city", info.localidade);
        setFieldValue("neighborhood", info.bairro);
        setFieldValue("street", info.logradouro);
      });
    }
  }
  return (
    <div className={classes.orderformwarper}>
      <div></div>
      <div className={classes.formwarper}>
        <div className={classes.formtitlewarper}>
          <img src={logo} alt="logo" className={classes.formimage}></img>
          <p className={classes.formtitle}>Faça seu pedido aqui:</p>
        </div>
        <Formik
          initialValues={{
            fullname: "",
            orderemail: "",
            cemail: "",
            cep: "",
            uf: "",
            city: "",
            street: "",
            neighborhood: "",
            number: 0,
            complement: "",
            order: [],
          }}
          onSubmit={(values) => {
            axios({
              method: "post",
              url:
                "https://gnrm27peal.execute-api.sa-east-1.amazonaws.com/dev/mailsender",
              data: values,
            }).then(
              alert(
                "Pedido Realizado com Sucesso, verifique sua caixa de email!"
              )
            );
          }}
          validationSchema={yup.object({
            fullname: yup.string().required().min(8).max(100),
            orderemail: yup.string().email().required(),
            cemail: yup
              .string()
              .required()
              .oneOf([yup.ref("orderemail"), null], "Emails incorretos"),
            cep: yup
              .string()
              .min(8)
              .test("len", "Preencha corretamente", (val) => {
                if (val) return val.length === 8;
              }),
            city: yup.string().required(),
            street: yup.string().required(),
            neighborhood: yup.string().required(),
            number: yup.string().required(),
            order: yup.array().required().min(1),
            uf: yup.string().required(),
          })}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className={classes.formgrid}>
                {touched.fullname && errors.fullname ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="fullname"
                    label="Nome Completo"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="fullname"
                    type="string"
                    size="small"
                  />
                ) : (
                  <Field
                    name="fullname"
                    label="Nome Completo"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="fullname"
                    type="string"
                    size="small"
                  />
                )}
                {touched.orderemail && errors.orderemail ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="orderemail"
                    label="Email"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="orderemail"
                    type="email"
                    size="small"
                  />
                ) : (
                  <Field
                    name="orderemail"
                    label="Email"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="orderemail"
                    type="email"
                    size="small"
                  />
                )}
                {touched.cemail && errors.cemail ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="cemail"
                    label="Confirmar Email"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="cemail"
                    type="email"
                    size="small"
                  />
                ) : (
                  <Field
                    name="cemail"
                    label="Confirmar Email"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="cemail"
                    type="email"
                    size="small"
                  />
                )}
                {touched.cep && errors.cep ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="cep"
                    label="CEP"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="cep"
                    type="string"
                    size="small"
                    onBlur={(ev) => onBlurcep(ev, setFieldValue)}
                  />
                ) : (
                  <Field
                    name="cep"
                    label="CEP"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="cep"
                    type="string"
                    size="small"
                    onBlur={(ev) => onBlurcep(ev, setFieldValue)}
                  />
                )}
                {touched.uf && errors.uf ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="uf"
                    label="Estado"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="uf"
                    type="string"
                    size="small"
                  />
                ) : (
                  <Field
                    name="uf"
                    label="Estado"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="uf"
                    type="string"
                    size="small"
                  />
                )}
                {touched.city && errors.city ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="city"
                    label="Cidade"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="city"
                    type="string"
                    size="small"
                  />
                ) : (
                  <Field
                    name="city"
                    label="Cidade"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="city"
                    type="string"
                    size="small"
                  />
                )}
                {touched.street && errors.street ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="street"
                    label="Rua"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="street"
                    type="string"
                    size="small"
                  />
                ) : (
                  <Field
                    name="street"
                    label="Rua"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="street"
                    type="string"
                    size="small"
                  />
                )}
                {touched.neighborhood && errors.neighborhood ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="neighborhood"
                    label="Bairro"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="neighborhood"
                    type="string"
                    size="small"
                  />
                ) : (
                  <Field
                    name="neighborhood"
                    label="Bairro"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="neighborhood"
                    type="string"
                    size="small"
                  />
                )}
                {touched.number && errors.number ? (
                  <Field
                    error
                    helperText="Preencha Corretamente"
                    name="number"
                    label="Número"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="number"
                    type="string"
                    size="small"
                  />
                ) : (
                  <Field
                    name="number"
                    label="Número"
                    as={TextField}
                    variant="outlined"
                    className={classes.formfield}
                    id="number"
                    type="string"
                    size="small"
                  />
                )}
                <Field
                  name="complement"
                  label="Complemento"
                  as={TextField}
                  variant="outlined"
                  className={classes.formfield}
                  id="complement"
                  type="string"
                  size="small"
                />
              </div>
              <div>
                <div className={classes.checkboxgrid}>
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    value="msteeve"
                    className={classes.formcheckbox}
                    name="order"
                    Label={{ label: "Minion Steeve" }}
                  />
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    className={classes.formcheckbox}
                    name="order"
                    value="mpresidiario"
                    Label={{ label: "Minion Presidiário" }}
                  />
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    className={classes.formcheckbox}
                    name="order"
                    value="mbob"
                    Label={{ label: "Minion Bob" }}
                  />
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    className={classes.formcheckbox}
                    name="order"
                    value="mvampiro"
                    Label={{ label: "Minion Vampiro" }}
                  />
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    className={classes.formcheckbox}
                    name="order"
                    value="mbobp"
                    Label={{ label: "Minion Bob Pijama" }}
                  />
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    className={classes.formcheckbox}
                    name="order"
                    value="mtom"
                    Label={{ label: "Minion Tom" }}
                  />
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    className={classes.formcheckbox}
                    name="order"
                    value="mstuart"
                    Label={{ label: "Minion Stuart" }}
                  />
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    className={classes.formcheckbox}
                    name="order"
                    value="motto"
                    Label={{ label: "Minion Otto" }}
                  />
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    className={classes.formcheckbox}
                    name="order"
                    value="mjerry"
                    Label={{ label: "Minion Jerry" }}
                  />
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    className={classes.formcheckbox}
                    name="order"
                    value="mdave"
                    Label={{ label: "Minion Dave" }}
                  />
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    className={classes.formcheckbox}
                    name="order"
                    value="cbonecos"
                    Label={{ label: "Conjunto de bonecos" }}
                  />
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    className={classes.formcheckbox}
                    name="order"
                    value="mkevinatirador"
                    Label={{ label: "Minion Kevin Atirador" }}
                  />
                </div>
                <Button
                  variant="contained"
                  color="secondary"
                  type="Submit"
                  className={classes.submitbutton}
                >
                  Realizar Pedido
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div></div>
    </div>
  );
};

export default Orderform;
