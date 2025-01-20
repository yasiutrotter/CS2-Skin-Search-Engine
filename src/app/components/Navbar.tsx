import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../../../public/assets/Logo';
import DropdownMenu from './DropdownMenu';

type Item = {
  name: string;
  image: string;
};

export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const router = useRouter();

  const pistols: Item[] = [
    { name: 'Glock-18', image: 'https://www.csgodatabase.com/images/weapons/webp/Glock-18.webp' },
    { name: 'USP-S', image: 'https://www.csgodatabase.com/images/weapons/webp/USP-S.webp' },
    { name: 'P2000', image: 'https://www.csgodatabase.com/images/weapons/webp/P2000.webp' },
    { name: 'P250', image: 'https://www.csgodatabase.com/images/weapons/webp/P250.webp' },
    { name: 'Five-Seven', image: 'https://www.csgodatabase.com/images/weapons/webp/Five-SeveN.webp' },
    { name: 'Tec-9', image: 'https://www.csgodatabase.com/images/weapons/webp/Tec-9.webp' },
    { name: 'Dual Berretas', image: 'https://www.csgodatabase.com/images/weapons/webp/Dual_Berettas.webp' },
    { name: 'Desert Eagle', image: 'https://www.csgodatabase.com/images/weapons/webp/Desert_Eagle.webp' },
    { name: 'R8 Revolver', image: 'https://www.csgodatabase.com/images/weapons/webp/R8_Revolver.webp' },
  ];

  const rifles: Item[] = [
    { name: 'AK-47', image: 'https://www.csgodatabase.com/images/weapons/webp/AK-47.webp' },
    { name: 'M4A1-S', image: 'https://www.csgodatabase.com/images/weapons/webp/M4A1-S.webp' },
    { name: 'M4A4', image: 'https://www.csgodatabase.com/images/weapons/webp/M4A4.webp' },
    { name: 'FAMAS', image: 'https://www.csgodatabase.com/images/weapons/webp/FAMAS.webp' },
    { name: 'Galil AR', image: 'https://www.csgodatabase.com/images/weapons/webp/Galil_AR.webp' },
    { name: 'AUG', image: 'https://www.csgodatabase.com/images/weapons/webp/AUG.webp' },
    { name: 'SG 553', image: 'https://www.csgodatabase.com/images/weapons/webp/SG_553.webp' },
    { name: 'AWP', image: 'https://www.csgodatabase.com/images/weapons/webp/AWP.webp' },
    { name: 'SSG 08', image: 'https://www.csgodatabase.com/images/weapons/webp/SSG_08.webp' },
    { name: 'G3SG1', image: 'https://www.csgodatabase.com/images/weapons/webp/G3SG1.webp' },
    { name: 'SCAR-20', image: 'https://www.csgodatabase.com/images/weapons/webp/SCAR-20.webp' },
  ];

  const knives: Item[] = [
    { name: 'Bayonet', image: 'https://www.csgodatabase.com/images/knives/webp/Bayonet.webp' },
    { name: 'Bowie Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Bowie_Knife.webp' },
    { name: 'Butterfly Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Butterfly_Knife.webp' },
    { name: 'Classic Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Classic_Knife.webp' },
    { name: 'Falchion Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Falchion_Knife.webp' },
    { name: 'Flip Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Flip_Knife.webp' },
    { name: 'Gut Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Gut_Knife.webp' },
    { name: 'Huntsman Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Huntsman_Knife.webp' },
    { name: 'Karambit', image: 'https://www.csgodatabase.com/images/knives/webp/Karambit.webp' },
    { name: 'Kukri Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Kukri_Knife.webp' },
    { name: 'M9 Bayonet', image: 'https://www.csgodatabase.com/images/knives/webp/M9_Bayonet.webp' },
    { name: 'Navaja Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Navaja_Knife.webp' },
    { name: 'Nomad Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Nomad_Knife.webp' },
    { name: 'Paracord Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Paracord_Knife.webp' },
    { name: 'Shadow Daggers', image: 'https://www.csgodatabase.com/images/knives/webp/Shadow_Daggers.webp' },
    { name: 'Skeleton Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Skeleton_Knife.webp' },
    { name: 'Stiletto Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Stiletto_Knife.webp' },
    { name: 'Survival Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Survival_Knife.webp' },
    { name: 'Talon Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Talon_Knife.webp' },
    { name: 'Ursus Knife', image: 'https://www.csgodatabase.com/images/knives/webp/Ursus_Knife.webp' },
    // ale mi sie nie chce kurwa xD
  ];

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu); 
  };

  const handleMouseLeave = () => {
    setActiveMenu(null); 
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div
        onClick={() => router.push('/')}
        className="cursor-pointer border-2 border-gray-800 flex items-center w-16 h-16 justify-center rounded-full"
      >
        <Logo className="w-8 h-8" />
      </div>
      <nav className="inline-block p-2 border-2 text-base border-gray-800 rounded-full">
        <ul className="flex p-0 m-0">
          <li className="flex items-center justify-center space-x-2">
            <a
              onClick={() => router.push('/')}
              className="hover:bg-primary-700 rounded-full px-6 py-2 duration-300 ease-in-out cursor-pointer"
            >
              Home
            </a>
            <div
              onMouseEnter={() => handleMouseEnter('pistols')}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <a
                onClick={() => router.push('/pistols')}
                className="hover:bg-primary-700 rounded-full px-6 py-2 duration-300 ease-in-out cursor-pointer"
              >
                Pistols
              </a>
              {activeMenu === 'pistols' && <DropdownMenu items={pistols} />}
            </div>
            <div
              onMouseEnter={() => handleMouseEnter('rifles')}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <a
                onClick={() => router.push('/rifles')}
                className="hover:bg-primary-700 rounded-full px-6 py-2 duration-300 ease-in-out cursor-pointer"
              >
                Rifles
              </a>
              {activeMenu === 'rifles' && <DropdownMenu items={rifles} />}
            </div>
            <div
              onMouseEnter={() => handleMouseEnter('knives')}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <a
                onClick={() => router.push('/knives')}
                className="hover:bg-primary-700 rounded-full px-6 py-2 duration-300 ease-in-out cursor-pointer"
              >
                Knives
              </a>
              {activeMenu === 'knives' && <DropdownMenu items={knives} />}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
