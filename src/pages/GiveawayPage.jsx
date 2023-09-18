import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Layout } from "../ui/layout/Layout";
import { ModifyGiveawayForm } from "../components/ModifyGiveawayForm";
import { Tickets } from "../components/Tickets";
import { giveawayStore } from "../store/giveawayStore";
import { apiURL } from "../api/config";


export const GiveawayPage = () => {
  const { id } = useParams();
  const setGiveaway = giveawayStore((state) => state.setGiveaway);
  const { car, description, giveaway_date, creation_date, status, winner_id, tickets, ticket_price} = giveawayStore((state) => state.giveaway);
  
  const [modify, setModify] = useState(false);

  const getGiveaway = async () => {
    const { data } = await axios.get(`${apiURL}giveaway/${id}`);
    setGiveaway(data);
  };

  useEffect(() => { 
    getGiveaway();
  }, []);


  return (
    <Layout>
      <div className="m-auto">
        <div className="mt-8">
          <p className="font-titles text-4xl mb-4">{car}</p>
          <p className="mb-5 font-titles font-semibold text-xl">
            Especificaciones:{" "}
          </p>
          <p>{description}</p>
        </div>
        <div className="mt-8">
          <p className="mb-5 font-titles font-semibold text-xl">Sorteo: </p>
          <p>
            <span className="font-semibold">Fecha de sorteo: </span>
            {giveaway_date}
          </p>
          <p>
            <span className="font-semibold">Publicación del sorteo: </span>
            {creation_date}
          </p>
          <p>
            <span className="font-semibold">Numero total de boletos: </span>
            {tickets}
          </p>
          <p>
            <span className="font-semibold">Precio por boleto: </span>$
            {ticket_price}
          </p>
          {status === 1 ? (
            <p className="text-green-500">
              <span className="font-semibold text-black">
                Estado del sorteo:{" "}
              </span>
              Activo
            </p>
          ) : (
            <p className="text-red-500">
              <span className="font-semibold text-black">
                Estado del sorteo:{" "}
              </span>
              Terminado
            </p>
          )}
        </div>
        {!modify ? (
          <div className="mx-auto mt-6">
            <button
              className="bg-blue-500 px-3 py-2 rounded-md font-normal text-white hover:bg-blue-600"
              onClick={() => setModify(true)}
            >
              Modificar sorteo
            </button>
          </div>
        ) : (
          <></>
        )}
        {modify ? (
          <div className="mt-4">
            <ModifyGiveawayForm id={id} />
            <button
              className="bg-red-500 px-3 py-2 rounded-md font-normal text-white hover:bg-red-600 mt-4 w-32"
              onClick={() => setModify(false)}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <></>
        )}
        <Tickets />
      </div>
    </Layout>
  );
}
