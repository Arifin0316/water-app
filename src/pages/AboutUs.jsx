import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-300 to-purple-400 p-6">
      <div className="bg-white backdrop-blur-xl p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">About Us</h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          Welcome to our weather app! We are a dedicated team passionate about bringing you accurate, real-time weather information. Our mission is to help you plan your day with the most reliable weather forecasts available.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          Our team works tirelessly to ensure that our data is up-to-date and accessible. We believe in the power of technology to make your life easier, and we aim to deliver a smooth, intuitive user experience through our app.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Thank you for trusting us with your weather needs. If you have any questions or feedback, feel free to reach out!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
