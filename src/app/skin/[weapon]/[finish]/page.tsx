"use client";
import { HamburgerMenu } from "@/app/components/HamburgerMenu";
import { useParams, useRouter } from "next/navigation"; // do pobrania parametrów z URL
import { useState, useEffect } from "react";

type Skin = {
  weapon: string;
  image: string;
  finish: string;
  rarity: string;
  inspect: {
    gen: string;
    link: string;
  }
};

export default function SkinDetails() {
  const { weapon, finish } = useParams(); // Pobieramy dynamiczne parametry URL: weapon i finish
  const decodedWeapon = decodeURIComponent(weapon);
  const decodedFinish = decodeURIComponent(finish);
  const [skin, setSkin] = useState<Skin | null>(null);
  const router = useRouter();

  function copyToClipboard() {
    if (skin && skin.inspect) {
      navigator.clipboard.writeText(skin.inspect.gen);
      alert("Copied to clipboard!");
    }
  }

  useEffect(() => {
    if (decodedWeapon && decodedFinish) {
      fetch("https://raw.githubusercontent.com/qwkdev/csapi/main/data2.json")
        .then((res) => res.json())
        .then((data) => {
          const transformedData = Object.entries(data).map(([key, value]: [string, any]) => ({
            weapon: value.weapon,
            image: value.image,
            finish: value.finish,
            rarity: value.rarity,
            inspect: value.inspect,
          }));

          const foundSkin = transformedData.find(
            (skin) =>
              skin.weapon.toLowerCase() === decodedWeapon.toLowerCase() &&
              skin.finish.toLowerCase() === decodedFinish.toLowerCase()
          );

          setSkin(foundSkin || null);
        });
    }
  }, [decodedWeapon, decodedFinish]);

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
        <h1 className="text-2xl font-bold mb-4">{skin.weapon} | {skin.finish}</h1>
        <img src={skin.image} alt={`${skin.weapon} ${skin.finish}`} className="w-128 h-auto mb-4" />
        <p className="text-gray-500 text-center">Rzadkość: {skin.rarity}</p>

        <div className="flex flex-row items-center justify-center mt-8 gap-8">
          <button onClick={copyToClipboard} className="h-12 w-48 rounded-xl bg-gray-800 border-2 border-gray-500 text-white hover:bg-gray-600 transition-all duration-300 ease-in-out">!gen command</button>
          <button onClick={() => router.push(skin.inspect.link)} className="h-12 w-48 rounded-xl bg-gray-800 border-2 border-gray-500 text-white hover:bg-gray-600 transition-all duration-300 ease-in-out">Inspect InGame</button>
        </div>
      </div>
    </div>
  );
}