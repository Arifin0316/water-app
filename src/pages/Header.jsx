import React, { useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import NavLink from '../componenes/NavLink';

function Header() {
    const [open, setOpen] = useState(false)
    
    return (
        <header className="z-20 sticky top-0 flex justify-between items-center px-12 py-4">
            <div className="flex gap-6">
                <button onClick={() => setOpen(true)} className="text-4xl text-white">
                    <IoMenuOutline />
                </button>
                <a href="#" className="text-2xl text-white font-semibold">
                    logo
                </a>
                < NavLink open={open} setOpen={setOpen} />
            </div>
            <div className="flex gap-6">
                <button className="bg-purple-500 text-base px-6 py-2 font-bold text-slate-700 rounded-xl hidden md:block">login</button>
                <button className="bg-purple-500 text-base px-6 py-2 font-bold text-slate-700 rounded-xl hidden md:block">signup</button>
            </div>
        </header>
    );
}

export default Header;