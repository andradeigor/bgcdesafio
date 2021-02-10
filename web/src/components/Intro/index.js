import React from "react";
import IntroImage from "../../assents/intro.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    introwarper: {
      display: "flex",
      paddingLeft: "10%",
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: "5%",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        paddingLeft: "0",
      },
    },
    introimage: {
      maxWidth: "700px",
      [theme.breakpoints.down("md")]: {
        maxWidth: "600px",
      },
      [theme.breakpoints.down("sm")]: {
        maxWidth: "400px",
      },
    },
    introtext: {
      marginLeft: "10%",
      marginTop: "25%",
      maxWidth: "60%",
      fontSize: "28px",
      fontWeight: "400",
      fontFamily: ["Poppins", "sans-serif"],
      [theme.breakpoints.down("md")]: {
        marginTop: "10%",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "18px",
      },
    },
  };
});
const Intro = () => {
  const classes = useStyles();
  return (
    <div className={classes.introwarper}>
      <img
        src={IntroImage}
        alt="imagem dos minions da introdução"
        className={classes.introimage}
      ></img>
      <div>
        <p className={classes.introtext}>
          Você disse Baboi*? Então você veio ao lugar certo ! Somos a melhor e
          maior loja de Action Figures de Minions do Brasil. Para realizar um
          pedido é necessário escolher os Minions desejados e lista-los no
          formulário ao final da página e clicar em “Realizar Pedido”. Tank Yu*
        </p>
        <p
          variant="h6"
          style={{
            fontSize: "12px",
            marginLeft: "10%",
            fontFamily: ["Poppins", "sans-serif"],
          }}
        >
          *linguagem dos Minions <br />
          Baboi=Brinquedo, Tank Yu=Obrigado
        </p>
      </div>
    </div>
  );
};

export default Intro;
