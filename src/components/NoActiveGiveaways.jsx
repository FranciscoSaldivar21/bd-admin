import axios from "axios";
import { useEffect, useState } from "react";
import { GiveawayCard } from "../moleculs/GiveawayCard";
import { apiURL } from "../api/config";

export const NoActiveGiveaways = () => {
  const [giveaways, setGiveaways] = useState([]);

  const getGiveaways = async () => {
    const { data } = await axios.get(
      `${apiURL}giveaway/all/0`
    );
    setGiveaways(data);
  };

  useEffect(() => {
    getGiveaways();
  }, []);
  return (
    <>
      {giveaways.length > 0 ? (
        <div className="mt-8">
          <div className="mx-auto">
            <h1 className="font-titles text-3xl uppercase">
              Sorteos anteriores
            </h1>
          </div>
          <div className="flex flex-col mt-4 items-left mx-auto w-full">
            <div className="grid grid-cols-4 gap-4 mt-4 mb-12">
              {giveaways.map((giveaway) => {
                return <GiveawayCard giveaway={giveaway} key={giveaway.id} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
