import Image from "next/image";
import React from "react";

type Item = {
    name: string;
    image: string;
  };
  

  const DropdownMenu: React.FC<{ items: Item[] }> = ({ items }) => {
    return (
      <div className="absolute z-10 bg-gray-800 rounded-md shadow-md">
        <div className="flex flex-col gap-2 min-w-[150px] w-auto p-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
            >
              <img src={item.image} alt={item.name} className="w-10 h-auto rounded" />
              <p className="text-sm text-white whitespace-nowrap">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default DropdownMenu;