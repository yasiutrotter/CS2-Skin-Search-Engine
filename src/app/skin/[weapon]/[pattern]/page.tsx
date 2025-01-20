"use client";
import { Navbar } from "@/app/components/Navbar";
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
import Image from 'next/image';
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Crate = {
  name: string;
  image: string;
};

type Skin = {
  weapon: string;
  description: string;
  pattern: string;
  image: string;
  rarity: {
    name: string;
    color: string;
  },
  category: string;
  min_float: number;
  max_float: number;
  collections: string;
  crates: Crate[];
};

export default function SkinDetails() {
  const { weapon, pattern } = useParams();
  const decodedWeapon = typeof weapon === 'string' ? decodeURIComponent(weapon) : '';
  const decodedSkin = typeof pattern === 'string' ? decodeURIComponent(pattern) : '';
  const [skin, setSkin] = useState<Skin | null>(null);
  const router = useRouter();

  const removeTags = (description: string) => {
    let cleaned = description.replace(/<[^>]*>?/g, '');
    cleaned = cleaned.replace(/\\n/g, " ");
    return cleaned;
  };

  useEffect(() => {
    if (decodedWeapon && decodedSkin) {
      fetch("https://bymykel.github.io/CSGO-API/api/en/skins.json")
        .then((res) => res.json())
        .then((data) => {
          const transformedData = Object.entries(data).map(([_, value]: [string, any]) => ({
            weapon: value.weapon?.name?.toString() || "",
            image: value.image,
            pattern: value.pattern?.name?.toString() || "",
            description: removeTags(value.description + "." || ""),
            rarity: {
              name: value.rarity?.name?.toString() || "",
              color: value.rarity?.color?.toString() || "",
            },
            category: value.category?.name?.toString() || "",
            min_float: value.min_float || 0,
            max_float: value.max_float || 0,
            collections: value.collections?.map((collection: { name: string }) => collection.name).join(", ") || "Not in any collection",
            crates: Array.isArray(value.crates) ? value.crates : value.crates ? [value.crates] : [],
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
      <Navbar />
      <div className="mt-8"></div>
      <div className="h-full w-full flex flex-row p-8 border-2 border-gray-800 rounded-3xl gap-8">

        <div className="bg-gray-900 rounded-xl w-64 h-64 flex items-center justify-center" >
          <Image src={skin.image} alt={skin.weapon} width={192} height={192} />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col items-start justify-between h-full">
            <div>
              <h2 className="text-2xl font-normal text-gray-400">{skin.weapon}</h2>
              <h1 className="text-5xl font-semibold text-gray-50 mt-1">{skin.pattern}</h1>
            </div>

            <div>
              <p className="text-gray-500 text-xs max-w-96 font-normal">{skin.description}</p>
            </div>

            <div
              className="px-4 mt-4 py-2 rounded-full flex items-center justify-center tracking-widest w-max"
              style={{ backgroundColor: skin.rarity.color }}
            >
              <p className="text-sm font-medium text-white">{skin.rarity.name}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between flex-col gap-4">
          <div>
            <h1 className="font-medium text-sm text-gray-400">CATEGORY</h1>
            <h3 className="font-semibold text-2xl text-gray-50">{skin.category}</h3>
          </div>
          <div>
            <h1 className="font-medium text-sm text-gray-400">COLLECTIONS</h1>
            <h3 className="font-semibold text-2xl text-gray-50">{skin.collections}</h3>
          </div>
          <div>
            <h1 className="font-medium text-sm text-gray-400">FLOAT RANGE</h1>
            <h3 className="font-semibold text-2xl text-gray-50">
              {skin.min_float} - {skin.max_float}
            </h3>
          </div>
        </div>
      </div>

      <div className="h-full w-full flex flex-col p-8 mt-8 border-2 border-gray-800 rounded-3xl gap-8">
        <h2 className="text-2xl font-semibold text-gray-50">Available in:</h2>
        <div className="flex flex-wrap gap-4">
          {skin.crates.length > 0 ? (
            skin.crates.map((crate, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg p-4 flex items-center gap-4 border-2 border-gray-800"
              >
                <div className="w-16 h-16 relative items-center justify-center flex">
                  <Image
                    src={crate.image}
                    alt={crate.name}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-50">{crate.name}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No crates available for this skin.</p>
          )}
        </div>
      </div>
    </div>
  );
}
