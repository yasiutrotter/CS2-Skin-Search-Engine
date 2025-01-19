"use client";
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, react/no-unescaped-entities */

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Skin = {
  weapon: string;
  pattern: string; 
  image: string;
};

export default function SkinDetails() {
  const { weapon, pattern } = useParams();
  const decodedWeapon = typeof weapon === 'string' ? decodeURIComponent(weapon) : '';
  const decodedSkin = typeof pattern === 'string' ? decodeURIComponent(pattern) : '';
  const [skin, setSkin] = useState<Skin | null>(null);
  const router = useRouter();

/*
  function copyToClipboard() {
    if (skin && skin.inspect) {
      navigator.clipboard.writeText(skin.inspect.gen);
      alert("Copied to clipboard!");
    }
  }
*/

  useEffect(() => {
    if (decodedWeapon && decodedSkin) {
      fetch("https://bymykel.github.io/CSGO-API/api/en/skins.json")
      .then((res) => res.json())
      .then((data) => {
        const transformedData = Object.entries(data).map(([_, value]: [string, any]) => ({
          weapon: value.weapon?.name?.toString() || "", 
          image: value.image,
          pattern: value.pattern?.name?.toString() || "",
        }));

          const foundSkin = transformedData.find(
            (skin) =>
              skin.weapon.toLowerCase() === decodedWeapon.toLowerCase() &&
              skin.pattern.toLowerCase() === decodedSkin.toLowerCase()
          );

          setSkin(foundSkin || null);
        });
    }
  }, [decodedWeapon, decodedSkin]);

  if (!skin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center mx-auto px-4 sm:px-6 lg:px-48 gap-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">Error!</h1>
        <p className="text-gray-500 text-xl sm:text-2xl text-center">
          It seems like the skin you tried to search doesn't exist.
        </p>
        <button 
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition duration-200 ease-in-out"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-48 py-6">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-2xl font-bold mb-4">{skin.weapon} | {skin.pattern}</h1>
        <img src={skin.image} alt={`${skin.weapon} ${skin.pattern}`} className="w-128 h-auto mb-4" />
      </div>
    </div>
  );
}