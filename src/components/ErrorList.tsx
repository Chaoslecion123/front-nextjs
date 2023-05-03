import React from "react";

const ErrorList = (props: any) => {
  const { listErrors } = props;
  console.log("listErrors", listErrors);
  return (
    <>
      <div>
        {" "}
        {listErrors?.[0]?.addresses[0] &&
          "Direccion: " + listErrors?.[0]?.addresses[0]}{" "}
      </div>
      <div>
        {" "}
        {listErrors?.[0]?.email[0] &&
          "email: " + listErrors?.[0]?.email[0]}{" "}
      </div>
      <div>
        {" "}
        {listErrors?.[0]?.first_name[0] &&
          "Nombres: " + listErrors?.[0]?.first_name[0]}{" "}
      </div>
      <div>
        {" "}
        {listErrors?.[0]?.last_name[0] &&
          "Apellidos: " + listErrors?.[0]?.last_name[0]}{" "}
      </div>
      <div>
        {" "}
        {listErrors?.[0]?.optical_power[0] &&
          "Potencia optica: " + listErrors?.[0]?.optical_power[0]}{" "}
      </div>
      <div>
        {" "}
        {listErrors?.[0]?.phone_number[0] &&
          "Telefono: " + listErrors?.[0]?.phone_number[0]}{" "}
      </div>
    </>
  );
};

export default ErrorList;
