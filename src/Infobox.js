import { CardContent, Typography } from "@mui/material";
import React from "react";

const Infobox = ({ title, cases, total }) => {
  return (
    <div className="infoBox flex w-44 bg-white mt-3 mb-3 rounded-3xl border shadow-xl mx-auto justify-center" id="infobox">
      <CardContent>
        <Typography
          className="text-2xl text-red-500 mx-auto"
          color="textSecondary"
        >
          {title}
        </Typography>

        <h2 className="text-4xl text-red-500 font-bold mx-auto" style={{color: title === "Recovered" ? "green" : "red"}}>{cases}</h2>

        <Typography className="infoBox__total mx-auto" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </div>
  );
};

export default Infobox;
