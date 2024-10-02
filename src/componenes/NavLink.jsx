import React, { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';

function NavLink({ open, setOpen }) {
  const [activeLink, setActiveLink] = useState('home');

  const links = [
    { name: 'home', href: '#' },
    { name: 'about', href: '#' },
    { name: 'contact', href: '#' },
  ];

  return (
    <nav className={`fixed top-0 left-0 bg-white w-64 h-screen px-4 pt-6 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between border-b border-slate-300">
        <a href="#" className="text-2xl text-indigo-800 font-semibold">
          logo
        </a>
        <button onClick={() => setOpen(false)} className="text-4xl text-indigo-800 pb-3 items-center">
          <MdOutlineClose />
        </button>
      </div>
      <ul className="mt-6 flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.name} className={`rounded-md px-4 transition-colors ${activeLink === link.name ? 'bg-indigo-300' : 'hover:bg-slate-100'}`}>
            <a
              href={link.href}
              className="block py-2 text-sm font-medium capitalize text-indigo-800"
              onClick={(e) => {
                e.preventDefault();
                setActiveLink(link.name);
              }}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex gap-6 absolute bottom-16 ">
        <button className="bg-purple-500 text-base px-6 py-2 font-bold text-slate-700 rounded-xl md:hidden block">login</button>
        <button className="bg-purple-500 text-base px-6 py-2 font-bold text-slate-700 rounded-xl md:hidden block">signup</button>
      </div>
    </nav>
  );
}

export default NavLink;
