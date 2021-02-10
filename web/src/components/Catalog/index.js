import { React, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  containerstyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  gridstyle: {
    marginLeft: "20px",
    marginTop: "20px",
    marginRight: "10%",
    backgroundColor: "#FFFFFF",
    maxWidth: "240px",
  },
  catalogoimg: {
    maxWidth: "200px",
    marginLeft: "15px",
  },
  catalogtitle: {
    fontSize: "28px",
    fontWeight: "400",
    fontFamily: ["Poppins", "sans-serif"],
    textAlign: "center",
    maxWidth: "250px",
    marginBottom: "0px",
  },
  catalogdesc: {
    margintop: "0px",
    maxWidth: "250px",
    fontSize: "18px",
    fontWeight: "400",
    fontFamily: ["Poppins", "sans-serif"],
    textAlign: "center",
    marginRight: "10px",
  },
});
const Catalog = () => {
  const classes = useStyles();
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    const urlbase =
      "https://gnrm27peal.execute-api.sa-east-1.amazonaws.com/dev/catalogo";
    axios.get(urlbase).then((res) => setCatalogo(res.data.input));
  }, []);

  return (
    <Grid container className={classes.containerstyle}>
      {catalogo.map((e) => (
        <Grid
          item
          lg={3}
          md={4}
          sm={6}
          xs={12}
          className={classes.gridstyle}
          key={e.id}
        >
          <img
            src={e.imageURL}
            style={{
              paddingTop: "20px",
            }}
            alt={e.description}
            className={classes.catalogoimg}
          />
          <p className={classes.catalogtitle}>{e.title}</p>
          <p className={classes.catalogdesc}>{e.description}</p>
          <p className={classes.catalogdesc}>{e.price}</p>
        </Grid>
      ))}
    </Grid>
  );
};

export default Catalog;
