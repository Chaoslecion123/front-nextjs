import React, { useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import endPoints from "@/services/api";
import axios from "axios";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ErrorList from "../ErrorList";

const FormClient = (props: any) => {
  const { setShowModal, dataClient, setDataClient } = props;
  const formRef = useRef<HTMLFormElement>();
  const [listErrors, setListErrors] = useState(null);
  const router = useRouter();

  const { data: dataSession } = useSession();

  // const first_name = useRef<HTMLInputElement>(null);
  // const lastName = useRef<HTMLInputElement>(null);
  // const email = useRef<HTMLInputElement>(null);
  // const phone = useRef<HTMLInputElement>(null);
  // const addresses = useRef<HTMLInputElement>(null);
  // const opticalPower = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: Event) => {
    e.preventDefault();
    console.log("formRef.current", formRef);

    const formData = new FormData(formRef.current);

    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone_number: formData.get("phone_number"),
      addresses: formData.get("addresses"),
      code: dataSession?.user?.code,
      optical_power: formData.get("optical_power"),
      id_user: dataSession?.user?.id,
    };

    console.log("data ->", data);

    if (dataClient) {
      axios
        .put(endPoints.dashboard.clients.update(dataClient.id), data)
        .then((res: any) => {
          setShowModal(false);
          router.reload();
        })
        .catch((err: any) => {
          setListErrors([err.response.data]);
        });
    } else {
      axios
        .post(endPoints.dashboard.clients.add, data)
        .then((res: any) => {
          setShowModal(false);
          router.reload();
        })
        .catch((err: any) => {
          console.log("err", err);
          setListErrors([err.response.data]);
        });
    }

    // try {
    //   const { data } = await axios.post(endPoints.dashboard.clients.add, {
    //     first_name: firstName?.current?.value,
    //     last_name: lastName?.current?.value,
    //     email: email?.current?.value,
    //     phone_number: phone?.current?.value,
    //     addresses: addresses?.current?.value,
    //     code: dataSession?.user?.code,
    //     optical_power: opticalPower.current?.value,
    //     id_user: dataSession?.user?.id,
    //   });
    //   console.log("data", data);
    //   setShowModal(false);
    //   router.reload();
    // } catch (error: any) {
    //   setListErrors([error.response.data]);
    // }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          className="
        relative w-auto my-6 mx-auto max-w-3xl h-full"
        >
          {/*content*/}
          <form ref={formRef} onSubmit={submitHandler}>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  {" "}
                  {dataClient !== null
                    ? "Editar Cliente"
                    : "Crear Cliente"}{" "}
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div className="md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Nombres
                    </label>
                  </div>
                  <div>
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      // id="inline-full-name"
                      defaultValue={dataClient?.first_name}
                      type="text"
                      id="first_name"
                      name="first_name"

                      // value="Jane Doe"
                    />
                  </div>
                  <div>
                    {" "}
                    {listErrors?.[0]?.first_name &&
                      "Nombres: " + listErrors?.[0]?.first_name[0]}{" "}
                  </div>

                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Apellidos
                    </label>
                  </div>
                  <div>
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      defaultValue={dataClient?.last_name}
                      name="last_name"
                      // value="Jane Doe"
                    />
                  </div>
                  <div>
                    {" "}
                    {listErrors?.[0]?.last_name &&
                      "Apellidos: " + listErrors?.[0]?.last_name[0]}{" "}
                  </div>

                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Correo
                    </label>
                  </div>
                  <div>
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="email"
                      defaultValue={dataClient?.email}
                      name="email"
                      // value="Jane Doe"
                    />
                  </div>
                  <div>
                    {" "}
                    {listErrors?.[0]?.email &&
                      "email: " + listErrors?.[0]?.email[0]}{" "}
                  </div>

                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Telefono
                    </label>
                  </div>
                  <div>
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="tel"
                      defaultValue={dataClient?.phone_number}
                      name="phone_number"
                      // value="Jane Doe"
                    />
                  </div>
                  <div>
                    {" "}
                    {listErrors?.[0]?.phone_number &&
                      "Telefono: " + listErrors?.[0]?.phone_number[0]}{" "}
                  </div>

                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Dirección
                    </label>
                  </div>
                  <div>
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      defaultValue={dataClient?.addresses}
                      name="addresses"
                      // value="Jane Doe"
                    />
                  </div>
                  <div>
                    {" "}
                    {listErrors?.[0]?.addresses &&
                      "Direccion: " + listErrors?.[0]?.addresses[0]}{" "}
                  </div>

                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Potencia Optico
                    </label>
                  </div>
                  <div>
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      defaultValue={dataClient?.optical_power}
                      name="optical_power"
                      // value="Jane Doe"
                    />
                  </div>
                  <div>
                    {" "}
                    {listErrors?.[0]?.optical_power &&
                      "Potencia optica: " +
                        listErrors?.[0]?.optical_power[0]}{" "}
                  </div>
                </div>
              </div>

              {/* <ErrorList listErrors={listErrors} /> */}

              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setDataClient(null);
                    setShowModal(false);
                  }}
                >
                  Cerrar
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                  // disabled={false}
                  // onClick={(e: any) => submitHandler(e)}
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default FormClient;
