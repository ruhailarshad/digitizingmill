import React from "react";
import Card from "../Card/Card";

const StatsCard = ({ data }) => {
  return (
    <Card shadow styles="shadow-[-7px_10px_12px_-1px_rgba(0,0,0,0.03)]  flex space-x-10 bg-white rounded-20   p-20 ">
      <div className="p-18 bg-red-100 flex items-center justify-center rounded-20">{data.icon}</div>
      <div className="flex flex-col justify-start">
        <h6 className=" h6-bold text-gray-40 whitespace-nowrap">{data.heading}</h6>
        <h4 className=" h4-bold text-gray-80 ml-4">{data.stats}</h4>
      </div>
    </Card>
  );
};

export default StatsCard;
