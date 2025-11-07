import React from "react";
import { CircleX } from "lucide-react";

const Error = ({ message = "Test" }) => {
  return (
    <div className="bg-red-200/90 rounded px-2 py-3 text-xs tracking-tight">
      <span className="text-red-950/50 font-bold flex items-center gap-2 flex-nowrap">
        {" "}
        <CircleX className="inline" /> {message}
      </span>
    </div>
  );
};

export default Error;
