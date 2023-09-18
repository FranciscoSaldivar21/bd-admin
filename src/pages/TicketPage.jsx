import { useLocation } from "react-router-dom";
import { Layout } from "../ui/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../api/config";
import { ClientAdress } from "../moleculs/ClientAdress";
import { TicketItem } from "../moleculs/TicketItem";

export const TicketPage = () => {
  const { state } = useLocation();
  const { ticket_number, giveaway_id } = state;
  const [ticketInfo, setTicketInfo] = useState({});
  const [show, setShow] = useState(false);

  const getTicketInfo = async () => {
    const { data } = await axios.get(`${apiURL}sales/buyer/${ticket_number}/${giveaway_id}`);
    const [ ticketInfo ] = data;
    setTicketInfo(ticketInfo);
  }
  useEffect(() => {
    getTicketInfo();
  }, [])
  
  return (
    <Layout>
      <div className="flex flex-col items-start">
        <h1 className="font-titles text-3xl mb-6">INFORMACIÓN SOBRE EL TICKET</h1>
        <div className="mb-2">
          <TicketItem color={ticketInfo.benefic} ticketNumber={ticket_number} />
        </div>
        <p><span className="font-bold">Numero del boleto:</span> {ticket_number}</p>
        <p><span className="font-bold">ID de compra:</span> {ticketInfo.id}</p>
        <p><span className="font-bold">Fecha de compra:</span> {ticketInfo.sale_date}</p>
        <p><span className="font-bold">Estatus de compra:</span> {ticketInfo.status === 1 ? "Pagada" : "Pendiente de pago"}</p>
        <p><span className="font-bold">Nombre de cliente:</span> {ticketInfo.user_name}</p>
        <p><span className="font-bold">Correo del cliente:</span> {ticketInfo.user_email}</p>
        <p><span className="font-bold">Teléfono de cliente:</span>{ticketInfo.user_phone}</p>
        <p><span className="font-bold">Fecha de registro del cliente:</span> {ticketInfo.register_date}</p>
        {
          show ? 
            <div className="mt-4">
              <p className="my-2"><span className="font-bold">Domicilio</span></p>
              <ClientAdress adress={ticketInfo.adress} />
              <button onClick={() => setShow(false)} className="bg-darkGold hover:font-bold py-1 px-2 mt-4 rounded-lg">Ocultar</button>
            </div>
          :
            <button onClick={() => setShow(true)} className="bg-darkGold hover:font-bold py-1 px-2 mt-4 rounded-lg">Mostrar domicilio</button>
        }
      </div>
    </Layout>
  );
};
