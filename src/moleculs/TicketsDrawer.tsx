import { giveawayStore } from "../store/giveawayStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { data } from 'autoprefixer';
import { apiURL } from "../api/config.js";
import { userStore } from "../store/userStore";
import { TicketItem } from "./TicketItem";

export const TicketsDrawer = (data: props) => {
  const token = userStore((state) => state.token);
  const resetSession = userStore((state) => state.reset);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //Extraer total de tickets
  const { id, tickets: totalTickets, ticket_price, creation_date } = giveawayStore((state) => state.giveaway);

  //Variable que controla donde va la paginación
  const [ticketsOffset, setTicketsOffset] = useState(0);

  //Cantidad de paginas de la paginación
  const offsetRange = data.offsetRange;

  //Array para dibujar todos los boletos
  const [tickets, setTickets] = useState([]);

  //Hacer llamado a API para obtener los boletos vendidos de cada sorteo
  const [soldTickets, setSoldTickets] = useState([]);

  //Variable para busqueda
  const [search, setSearch] = useState("");
  const [ticketSearch, setTicketSearch] = useState(null);
  const [ticketFound, setTicketFound] = useState(false);


  //Extraer tickets vendidos
  const getTickets = async (offset) => {
    try {
      const { data } = await axios.get(`${apiURL}giveaway/tickets/${id}/${offset}`);
      //Recorrer arreglo para guardar boletos
      data.forEach((element, i) => {
        setSoldTickets((prevTickets) => [...prevTickets, element.ticket_number]);
      });
      setIsLoading(false);
    } catch (error) {
    }
  }

  const searchTickets = async (ticket) => {
    if (ticket > totalTickets) {
      alert(`Elige un rango menor a ${totalTickets}`)
      return;
    }

    if (ticket <= 0) {
      alert(`Elige un rango mayor a 0`);
      return;
    }

    setTicketSearch(ticket);
    if (ticket && ticket > 0 && ticket <= totalTickets) {
      try {
        const { data } = await axios.get(`${apiURL}giveaway/ticket/${id}/${ticket}`);
        setTicketFound(data.found);
      } catch (error) {
      }
    }

    return;
  }

  useEffect(() => {
    setSoldTickets([]);
    //Extraer tickets vendidos
    getTickets(ticketsOffset);
    //Reiniciar arrays para paginación
    setTickets([]);

    //Definir donde inicia y termina la paginación
    const start = parseInt(ticketsOffset) * 500 + 1;
    const limit = (parseInt(ticketsOffset) + 1) * 500;

    //Guardar elementos en arreglo que se dibujará
    for (let i = start; i <= limit; i++) {
      if (i > data.totalTickets)
        break;
      setTickets((prevTickets) => [...prevTickets, i]);
    }
  }, [ticketsOffset, isLoading]);


  return (
    <div className="mb-8">
      <div className="mx-auto sm:flex sm:flex-row sm:items-center">
        <label>Elige un rango de boletos</label>
        <select
          onChange={({ target }) => setTicketsOffset(target.value)}
          className="ml-2 border rounded-md sm:px-3 sm:py-2 sm:mr-4 bg-gray-50 border-gray-300 px-1 py-1"
        >
          {offsetRange.map((element) => {
            return (
              <option key={element} value={element}>
                {element * 500 + 1}-{(element + 1) * 500}
              </option>
            );
          })}
        </select>
        <div className="relative mt-4 sm:mt-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-3 h-3 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="number" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Buscar boleto" value={search} onChange={({ target }) => setSearch(target.value)} />
          <button onClick={() => searchTickets(search)} type="submit" className="text-black absolute right-1 bottom-1 bg-darkGold hover:font-bold font-medium rounded-lg text-sm px-2 py-1">Buscar</button>
        </div>
      </div>
      <p className="mt-4 font-semibold">Da click en el boleto deseado para seleccionarlo</p>
      <div className="grid grid-cols-6 md:grid-cols-8 xl:grid-cols-12 gap-1.5 mx-auto mt-4">
        {
          ticketSearch ?
            <TicketItem ticket={ticketSearch} status={!ticketFound} onClick={() => console.log(ticketSearch)} />
            :
            tickets.map((ticket, i) => {
              if (soldTickets.includes(tickets[i]))
                return (
                  <TicketItem
                    key={i}
                    ticketNumber={ticket}
                    status={-1} //Inactivo
                    onClick={() => navigate(`/ticket`, { state: { ticket_number: ticket, giveaway_id: id } })}
                  />
                );
              return (
                <TicketItem
                  key={i}
                  ticketNumber={ticket}
                  status={0} //Activo
                  onClick={() => alert("El boleto aún no se ha vendido o regalado")}
                />
              );
            })
        }
      </div>
    </div>
  );
};
