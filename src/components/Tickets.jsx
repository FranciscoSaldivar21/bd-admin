
import { TicketsDrawer } from "../moleculs/TicketsDrawer";
import { giveawayStore } from "../store/giveawayStore";



export const Tickets = () => {
    //Este proceso se realiza para pasar el numero de páginas necesarias como prop para la paginación de mil en mil boletos
    const { tickets: totalTickets } = giveawayStore((state) => state.giveaway);
    let arrayOffset = [];
    let pages = 0;
    for (let i = 0; pages < totalTickets * 3; pages += 500) {
        arrayOffset.push(i);
        i++;
    }
  return (
    <div>
      <TicketsDrawer offsetRange={arrayOffset} />
    </div>
  );
}
