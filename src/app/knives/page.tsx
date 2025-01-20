"use client";
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, react/no-unescaped-entities */

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from "../components/Navbar";

type Skin = {
  weapon: string;
  pattern: string; 
  image: string;
  rarity: {
    name: string;
    color: string;
  },
};

export default function Home() {
  const [skins, setSkins] = useState<Skin[]>([]);
  const [query, setQuery] = useState("");
  const [filteredSkins, setFilteredSkins] = useState<Skin[]>([]);
  useEffect(() => {
    fetch("https://bymykel.github.io/CSGO-API/api/en/skins.json")
      .then((res) => res.json())
      .then((data) => {
        const transformedData = Object.entries(data).map(([_, value]: [string, any]) => ({
          weapon: value.weapon?.name?.toString() || "", 
          image: value.image,
          pattern: value.pattern?.name?.toString() || "",
          rarity: {
            name: value.rarity?.name?.toString() || "",
            color: value.rarity?.color?.toString() || "",
          },
        }));

        const uniqueSkins = Array.from(
          new Map(
            transformedData.map(skin => [`${skin.weapon} | ${skin.pattern}`, skin])
          ).values()
        );
        setSkins(uniqueSkins);
      });
  }, []);
  
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredSkins([]);
      return;
    }

    setFilteredSkins(
      skins.filter((skin) =>
        skin.weapon.toLowerCase().includes(query.toLowerCase()) ||
        skin.pattern.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, skins]);

  const router = useRouter();
  return (
    <div className="px-96 my-8 bg-gray-950">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-16">
        <h1 className="text-5xl font-extrabold text-gray-50 mb-2">CS2 Skin Search Engine</h1>
        <h3 className="text-xl font-light text-gray-400">Search any existing CS2 skin and test it in game!</h3>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a skin or weapon name"
          className="pl-8 mt-20 p-4 w-full rounded-full text-sm font-light place-content-center bg-gray-900 text-gray-50 decoration-transparent border-2 border-gray-800 outline-none mb-4"
        ></input>
      </div>
      {query.trim().length < 3 ? (
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4"></div>
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {filteredSkins.map((skin, index) => (
              
              <div
                key={`${index}-${skin.rarity.color}`}
                style={{ outlineWidth: "2px", outlineStyle: "solid", outlineColor: skin.rarity.color }}
                className={`flex-col bg-gray-900 flex items-center px-4 justify-center p-2 py-6 rounded-xl cursor-pointer hover:bg-gray-800 transition-colors duration-300 ease-in-out"`}
                onClick={() =>
                  router.push(
                    `/skin/${encodeURIComponent(skin.weapon).toLowerCase()}/${encodeURIComponent(skin.pattern).toLowerCase()}`
                  )
                }
              >
              <div 
              
              className="px-4 py-2 mb-4 rounded-full flex items-center justify-center tracking-widest w-full" 
              key={skin.rarity.color} 
              style={{ backgroundColor: skin.rarity.color }}
              >
               <p className="text-xs font-medium text-white">{skin.rarity.name}</p>
              </div>
                <Image src={skin.image} alt={`${skin.weapon} ${skin.pattern}`} width={192} height={192} loading="lazy" quality={75} className="flex w-auto h-auto mb-2"/>
                
                
                <p className="text-center font-bold text-3xl mt-6">{skin.weapon}</p>
                <p className="text-center font-normal text-xl">{skin.pattern}</p>
              </div>
            ))}
            {filteredSkins.length === 0 && (
              <p className="text-gray-400 text-center col-span-full mt-4">No results found for your query.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
