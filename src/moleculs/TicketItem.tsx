import fichaDorada from "../assets/Fichas/ficha-dorada.png";
import fichaGold from "../assets/Fichas/ficha-gold.png";
import fichaSilver from "../assets/Fichas/ficha-silver.png";
import fichaBronze from "../assets/Fichas/ficha-bronze.png";
import fichaGris from "../assets/Fichas/ficha-gris.png";

export const TicketItem = ({ ticketNumber, onClick, status }: props) => {
	if (status === -1)
		return (
			<p className="hover:font-semibold py-2 px-8 bg-lightGold text-center rounded-lg line-through font-bold">
				{ticketNumber}
			</p>
		);
	else
		return (
			<p className="hover:font-semibold font-normal py-2 px-8 bg-lightGold text-center rounded-lg">
				{ticketNumber}
			</p>
		);
}
