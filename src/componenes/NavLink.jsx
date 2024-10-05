import React, { useState, useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

function NavLink({ open, setOpen }) {
  const location = useLocation(); // Untuk mengetahui URL yang sedang dibuka
  const [activeLink, setActiveLink] = useState(location.pathname); // Set link aktif sesuai URL

  const links = [
    { name: 'home', href: '/' },
    { name: 'radar', href: '/Radar' },
    { name: 'About us', href: '/AboutUs' }, // Ganti nama link sesuai kebutuhan
  ];

  // Update activeLink berdasarkan URL saat berubah
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLinkClick = (linkHref) => {
    setActiveLink(linkHref);
    setOpen(false); // Menutup menu saat link diklik
  };

  return (
    <nav className={`fixed z-50 top-0 left-0 bg-white w-64 h-screen px-4 pt-6 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between border-b border-slate-300 pb-4">
        <Link to="/" className="text-2xl text-indigo-800 font-semibold">
        Weather
        </Link>
        <button onClick={() => setOpen(false)} className=" active:scale-90 text-4xl text-indigo-800">
          <MdOutlineClose />
        </button>
      </div>
      <ul className="mt-6 flex flex-col gap-4">
        {links.map((link) => (
          <li
            key={link.name}
            className={`rounded-md px-4 transition-all duration-300 ${
              activeLink === link.href ? 'bg-indigo-300 scale-105' : 'hover:bg-slate-100'
            }`}
          >
            <Link
              to={link.href}
              className={`block py-2 text-sm font-medium capitalize text-indigo-800 transition-transform duration-300 ${
                activeLink === link.href ? 'font-semibold' : ''
              }`}
              onClick={() => handleLinkClick(link.href)} // Tutup menu dan set active link
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12 z-50 w-full">
        <Link to={'/Login'} onClick={() => setOpen(!open)} className="bg-indigo-500 hover:bg-indigo-700 active:scale-95 text-base px-6 py-2 font-bold text-white rounded-xl md:hidden">Login</Link>
      </div>
    </nav>
  );
}

export default NavLink;
