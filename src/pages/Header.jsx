import React, { useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import NavLink from '../componenes/NavLink';
import { Link } from 'react-router-dom';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className=" w-full fixed top-0 z-50">
      <header className="z-50 sticky w-full top-0 flex justify-between items-center px-12 py-4 ">
        <div className="flex gap-6">
          <button onClick={() => setOpen(true)} className="text-4xl text-white">
            <IoMenuOutline />
          </button>
          <a href="#" className="text-2xl text-white font-semibold items-center">
            Weather
          </a>
          <NavLink open={open} setOpen={setOpen} />
        </div>
        <div className="flex gap-6">
          <Link to={'/login'} className="bg-indigo-500 text-base text-white px-6 py-2 font-bold shadow-xl rounded-xl hidden md:block hover:bg-indigo-700 active:scale-95 transition-colors">
            login
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
