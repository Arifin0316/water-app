import React, { useState } from 'react';
import { TbHelpOctagon, TbHelpOff } from "react-icons/tb";

const ControlsHelp = () => {
  const [showHelper, setShowHelper] = useState(false); // State untuk mengontrol visibilitas helper

  const toggleHelper = () => {
    setShowHelper((prev) => !prev); // Toggle visibilitas helper
  };

  return (
    <>
    <div className="absolute top-52 md:right-32 right-24 z-20">
      <button 
        onClick={toggleHelper} 
        className="bg-white text-slate-700 px-4 py-2 rounded-lg shadow-md backdrop-blur-sm hover:bg-purple-200 active:scale-95"
      >
        {showHelper ? <TbHelpOff/> : <TbHelpOctagon/>}
      </button>

    </div>
      {showHelper && (
        <div className="mt-2 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-lg absolute top-28 md:right-36 right-20">
          <div className="text-sm text-slate-700 font-medium">
            <p>Zoom: Gunakan +/- atau scroll</p>
            <p>Geser: Klik dan drag</p>
          </div>
        </div>
      )}
      </>
  );
};

export default ControlsHelp;
