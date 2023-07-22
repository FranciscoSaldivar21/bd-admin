import { useNavigate } from "react-router-dom";

interface ICarProps {
  id: number;
  title: string;
  description: string;
  status: number;
  created_date: string;
  giveaway_date: string;
  model: number;
  winner_id?: string;
}

export const GiveawayCard = ({ giveaway }: ICarProps) => {
  const navigate = useNavigate();

  const handleButtonPress = () => {
    navigate(`/giveaway/${giveaway.id}`);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src="https://img.remediosdigitales.com/1c4e7f/bl5a8845/1366_2000.jpeg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <p className="font-bold text-xl mb-2">
          {giveaway.car}
        </p>
        <p className="text-justify">{giveaway.description}</p>
        <p className="mt-2">
          Status:{" "}
          {giveaway.status === 1 ? (
            <span className="text-green-500">Activo</span>
          ) : (
            <span className="text-red-500">Finalizado</span>
          )}
        </p>
      </div>
      <div className="flex justify-center align-bottom">
        <button
          onClick={handleButtonPress}
          className="uppercase rounded w-60 h-8 mb-4 text-white transition ease-in-out delay-50 bg-blue-700 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-100"
        >
          Ver sorteo
        </button>
      </div>
    </div>
  );
};
