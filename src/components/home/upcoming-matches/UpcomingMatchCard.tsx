import Image from "next/image";

import { Event } from "@/utils/constants/types";

const UpcomingMatchCard = ({ event }: { event: Event }) => {
  const { match } = event;
  return (
    <div className="relative border border-accent-gold flex h-full flex-col items-center justify-center rounded-lg shadow-lg p-4 cursor-pointer duration-200  hover:scale-105">
      <div className="absolute w-full h-full bg-secondary opacity-80 z-[10] top-0 left-0 rounded-lg "></div>
      <Image
        src="/images/background.jpg"
        alt="Background Image"
        className="w-full h-full z-[5] rounded-lg"
        layout="fill"
        objectFit="cover"
        draggable={false}
        objectPosition="center"
      />
      <div className="grid grid-cols-3 flex-row items-center justify-center mb-4 z-20">
        <div className="flex flex-col items-center flex-grow">
          <Image
            src={match.teams[0].image}
            alt={match.teams[0].name}
            className={`${
              match.teams[0].name === "TBD" ? "opacity-50 invert" : ""
            }`}
            width={100}
            height={100}
            draggable={false}
          />
          <h3 className="text-xl font-bold mt-2 text-center">
            {match.teams[0].name}
          </h3>
        </div>
        <h3 className="text-xl font-bold text-center">VS</h3>
        <div className="flex flex-col items-center">
          <Image
            src={match.teams[1].image}
            alt={match.teams[1].name}
            className={`${
              match.teams[1].name === "TBD" ? "opacity-50 invert" : ""
            }`}
            width={100}
            height={100}
            draggable={false}
          />
          <h3 className="text-xl font-bold mt-2 text-center">
            {match.teams[1].name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMatchCard;
