"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Navbar } from "./components/Navbar";

type Skin = {
  weapon: {
    name: string;
  },
  pattern: {
    name: string;
  },
  image: string;
  category: {
    name: string;
  },
};

export default function Home() {
  const [skins, setSkins] = useState<Skin[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [filteredSkins, setFilteredSkins] = useState<Skin[]>([]);

  useEffect(() => {
    fetch("https://bymykel.github.io/CSGO-API/api/en/skins.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch skins data");
        }
        return res.json();
      })
      .then((data: any[]) => {
        const transformedData = data
          .filter(
            (skin) =>
              skin.weapon && skin.weapon.name && skin.pattern && skin.pattern.name && skin.category && skin.category.name
          ) // Filter out invalid skins
          .map((skin) => ({
            weapon: {
              name: skin.weapon.name,
            },
            pattern: {
              name: skin.pattern.name,
            },
            image: skin.image,
            category: {
              name: skin.category.name,
            },
          }));

        const uniqueSkins = Array.from(
          new Map(
            transformedData.map((skin) => [
              `${skin.weapon.name} | ${skin.pattern.name}`,
              skin,
            ])
          ).values()
        );
        setSkins(uniqueSkins);
      })
      .catch((error) => {
        console.error("Error fetching skins:", error);
      });
  }, []);

  useEffect(() => {
    // Combined filtering logic
    const filtered = skins.filter((skin) => {
      const matchesCategory = selectedCategory === "All" || skin.category.name === selectedCategory;
      const matchesQuery =
        query.trim() === "" ||
        skin.weapon.name.toLowerCase().includes(query.toLowerCase()) ||
        skin.pattern.name.toLowerCase().includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });

    setFilteredSkins(filtered);
  }, [query, selectedCategory, skins]); // Trigger whenever skins, query, or selectedCategory changes

  const router = useRouter();
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
          className="pl-8 mt-20 p-4 w-full rounded-full text-sm font-thin place-content-center bg-gray-900 text-gray-50 decoration-transparent border-2 border-gray-800 outline-none mb-4"
        />

        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="All">All</option>
          <option value="Pistols">Pistols</option>
          <option value="Rifles">Rifles</option>
        </select>
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
                key={index}
                className="flex-col bg-gray-900 border-2 border-gray-800 flex items-center justify-center p-2 py-6 rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                onClick={() =>
                  router.push(
                    `/skin/${encodeURIComponent(skin.weapon.name).toLowerCase()}/${encodeURIComponent(skin.pattern.name).toLowerCase()}`
                  )
                }
              >
                <img
                  src={skin.image || "/fallback-image-path.jpg"}
                  loading="lazy"
                  alt={`${skin.weapon.name} ${skin.pattern.name}`}
                  className="w-48 flex h-auto mb-2"
                />
                <p className="text-center font-extrabold text-3xl">{skin.weapon.name}</p>
                <p className="text-center font-medium text-xl">{skin.pattern.name}</p>
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
