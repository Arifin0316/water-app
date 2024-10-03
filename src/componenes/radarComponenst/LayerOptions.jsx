import React from 'react';

const LayerOptions = ({ layers, activeLayer, handleLayerChange, showLayerOptions, setShowLayerOptions }) => {
  return (
    <div className="absolute top-52 md:left-32 left-20 z-20">
      <button 
        className="bg-white text-slate-700 px-4 py-2 rounded-lg shadow-md backdrop-blur-sm hover:bg-purple-200 active:scale-95" 
        onClick={() => setShowLayerOptions(!showLayerOptions)}
      >
        Pilih Layer Peta
      </button>

      {showLayerOptions && (
        <div className="bg-white p-4 mt-2 rounded-lg shadow-lg backdrop-blur-sm  md:w-64 w-40">
          {Object.keys(layers).map((layer) => (
            <button
              key={layer}
              onClick={() => handleLayerChange(layer)}
              className={`w-full hover:bg-purple-100 hover:text-black active:scale-95 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeLayer === layer
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {layers[layer].name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LayerOptions;
