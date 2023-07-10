import pledges from "@/data/pledges.json";
import React from "react";
import TwitterPledge from "./TwitterPledge";

interface PledgesProps {}

const Pledges: React.FC<PledgesProps> = () => {
  return (
    <div className="flex flex-col pt-8">
      <h2 className="font-bold text-2xl text-zinc-100">
        Pledges for Whitelist
      </h2>
      {pledges.map((pledge, index) => (
        <TwitterPledge key={pledge.id} pledge={pledge} />
      ))}
    </div>
  );
};

export default Pledges;
