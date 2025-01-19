"use client";
import { HamburgerMenu } from "@/app/components/HamburgerMenu";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Skin = {
  weapon: string;
  pattern: string; 
  image: string;
};

export default function SkinDetails() {
  const { weapon, pattern } = useParams();
  const [skin, setSkin] = useState<Skin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);

    fetch("https://bymykel.github.io/CSGO-API/api/en/skins.json")
      .then((res) => res.json())
      .then((data) => {
        const transformedData = Object.entries(data).map(([_, value]: [string, any]) => ({
          weapon: value.weapon?.name?.toString() || "",
          image: value.image,
          pattern: value.pattern?.name?.toString() || "",
        }));

        const foundSkin = transformedData.find(
          (item) => 
            item.weapon.toLowerCase() === decodeURIComponent(weapon as string).toLowerCase() &&
            item.pattern.toLowerCase() === decodeURIComponent(pattern as string).toLowerCase()
        );

        setSkin(foundSkin || null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setSkin(null);
        setIsLoading(false);
      });
  }, [weapon, pattern]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center mx-auto px-48">
        <div className="w-32 h-32 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Loading skin details...</p>
      </div>
    );
  }


  if (!skin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center mx-auto px-48 gap-2">
        <h1 className="text-5xl font-bold">Error!</h1>
        <p className="text-gray-500 text-2xl text-center">
          It seems like the skin you tried to search doesn't exist.
        </p>
        <button 
          onClick={() => router.push('/')}
          className="text-white text-center font-medium hover:text-primary-700 duration-200 ease-in-out"
        >
          Go back
        </button>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-48 py-6">
      <HamburgerMenu />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">
          {skin.weapon} | {skin.pattern}
        </h1>
        <img 
          src={skin.image} 
          alt={`${skin.weapon} ${skin.pattern}`} 
          className="w-128 h-auto mb-4"
        />
      </div>
    </div>
  );
}