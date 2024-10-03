import React, { useState } from 'react';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validasi sederhana
    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }

    // Lakukan proses login (misalnya panggil API di sini)
    console.log('Logging in with:', { email, password });

    // Reset form dan error
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400  p-6">
      <div className="bg-white/50 backdrop-blur-xl p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-slate-700 mb-6">Login</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-400"
              placeholder="Masukkan email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-400"
              placeholder="Masukkan password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button 
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>

            <a href="#" className="text-sm text-blue-500 hover:underline">Lupa Password?</a>
          </div>
        </form>

        <p className="text-sm text-center text-slate-600 mt-6">
          Belum punya akun? <a href="#" className="text-blue-500 hover:underline">Daftar di sini</a>
        </p>
      </div>
    </div>
  );
};

export default FormLogin;
