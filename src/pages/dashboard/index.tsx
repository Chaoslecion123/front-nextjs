import { BtnMyLocation } from "@/components/BtnMyLocation";
import { Header } from "@/components/Header";
import MapView from "@/components/MapView";
import Modal from "@/components/Modal";
import CreateClient from "@/components/dashboard/CreateClient";
import endPoints from "@/services/api";
import { getUserLocation } from "@/utils/getUserLocation";
import { OptionsHeaders } from "@/utils/headers";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useReducer, useState } from "react";
import avantarImg from "../../static/avatar.png";

const Dashboard = () => {
  const [listClients, setListClients] = useState([]);
  const [showModal, setShowModal] = React.useState(false);

  const tokenData = Cookies.get("token")
    ? JSON.parse(Cookies.get("token") as string)
    : undefined;

  const products = [
    {
      images: [
        "https://vignette.wikia.nocookie.net/fifa/images/a/aa/FIFA_20_Regular_Edition.jpg/revision/latest/scale-to-width-down/310?cb=20191002111706&path-prefix=es",
      ],
    },
  ];

  console.log("tokenData dashboard", tokenData?.user.username);

  useEffect(() => {
    axios
      .get(endPoints.dashboard.clients.list, OptionsHeaders)
      .then((result: any) => setListClients(result?.data?.results))
      .catch((error: Error) => console.log(error));
  }, []);

  return (
    <>
      {" "}
      <div className="flex flex-col">
        <Header username={tokenData?.user.username} />
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          name="Crear Cliente"
        >
          <CreateClient setShowModal={setShowModal} />
        </Modal>

        <MapView />
        <BtnMyLocation />
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nombres Completos
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Correo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Celular
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Direccion
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {listClients?.map((client: any) => (
                    <tr key={`Client-item-${client?.email}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image
                              className="h-10 w-10 rounded-full"
                              src={avantarImg}
                              alt="imagen"
                              width={500}
                              height={500}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {client?.first_name} {client?.last_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {client.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {client.phone_number}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.addresses}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="/edit"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="/edit"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
