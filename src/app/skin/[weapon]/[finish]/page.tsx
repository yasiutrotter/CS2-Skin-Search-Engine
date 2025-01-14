"use client";
import { HamburgerMenu } from "@/app/components/HamburgerMenu";
import { useParams, useRouter } from "next/navigation"; // do pobierania parametrów z URL
import { useState, useEffect } from "react";

type Skin = {
  weapon: {
    name: string;
  },
  image: string;
  pattern: {
    name: string;
  },
  category: {
    name: string;
  },
};

export default function SkinDetails() {
  const { weapon, pattern } = useParams(); // Pobieramy dynamiczne parametry URL: weapon i finish
  const [skin, setSkin] = useState<Skin | null>(null);
  const router = useRouter(); 

  useEffect(() => {
      fetch("https://raw.githubusercontent.com/qwkdev/csapi/main/data2.json")
        .then((res) => res.json())
        .then((data) => {
          const transformedData = Object.entries(data).map(([key, value]: [string, any]) => ({
            weapon: {
              name: value.weapon.name,
            },
            pattern: {
              name: value.pattern.name,
            },
            image: value.image,
          }));

        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setSkin(null);
        });
    }, [weapon, pattern]);

  if (!skin) {
    return (
      <div className="container mx-auto px-48 py-6">
        <HamburgerMenu />
        <h1 className="text-2xl font-bold mb-4">Nie znaleziono skina</h1>
        <p className="text-gray-500 text-center">Brak danych dla podanego skina.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-48 py-6">
      <HamburgerMenu />
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-2xl font-bold mb-4">{skin.weapon.name} | {skin.pattern.name}</h1>
        <img src={skin.image} alt={`${skin.weapon.name} ${skin.pattern.name}`} className="w-128 h-auto mb-4" />
      </div>
    </div>
  );
}
