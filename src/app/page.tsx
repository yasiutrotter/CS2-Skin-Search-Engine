"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Navbar } from "./components/Navbar";

type Skin = {
  weapon: string;
  image: string;
  finish: string;
};

export default function Home() {
  const [skins, setSkins] = useState<Skin[]>([]);
  const [query, setQuery] = useState("");
  const [filteredSkins, setFilteredSkins] = useState<Skin[]>([]);
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/qwkdev/csapi/main/data2.json")
      .then((res) => res.json())
      .then((data) => {
        const transformedData = Object.entries(data).map(([key, value]: [string, any]) => ({
          weapon: value.weapon,
          image: value.image,
          finish: value.finish,
        }));

        const uniqueSkins = Array.from(
          new Map(transformedData.map(skin => [`${skin.weapon} | ${skin.finish}`, skin])).values()
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
        skin.finish.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, skins]);

  const router = useRouter()
  return (
    <div className="px-96 my-8 bg-gray-950">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-16">
        <h1 className="text-5xl font-extrabold text-gray-50 mb-2">CS2 Skin Search Engine</h1>
        <h3 className="text-xl font-thin text-gray-400">Search any existing CS2 skin and test it in game!</h3>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a skin or weapon name"
          className="pl-8 mt-20 p-4 w-full rounded-full text-sm font-thin place-content-center bg-gray-900 text-gray-50 decoration-transparent border-2 border-gray-800 outline-none mb-4"></input>
      </div>
      {query.trim().length < 3 ? (
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4">

          </div>
          
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4">
          {filteredSkins.map((skin, index) => (
            <div key={index} className="flex-col bg-gray-900 border-2 border-gray-800 flex items-center justify-center p-2 py-6 rounded-xl cursor-pointer hover:bg-gray-800 transition-colors duration-300 ease-in-out" onClick={() => router.push(`/skin/${encodeURIComponent(skin.weapon).toLowerCase()}/${encodeURIComponent(skin.finish).toLowerCase()}`)}>
              <img src={skin.image} alt={`${skin.weapon} ${skin.finish}`} className="w-48 flex h-auto mb-2" />
              <p className="text-center font-extrabold text-3xl">{skin.weapon}</p>
              <p className="text-center font-medium text-xl">{skin.finish}</p>
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