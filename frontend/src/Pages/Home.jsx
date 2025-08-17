import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
        src="/home.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">
          Discover Your Next Career Move
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl animate-fade-in-up">
          LankanJobs is the leading platform in Sri Lanka, connecting top talent with the best companies. Your future starts here.
        </p>
        <div className="space-x-4 animate-fade-in-up">
          <Link 
            to="/jobs" 
            className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-transform transform hover:scale-105"
          >
            Find a Job
          </Link>
          <Link 
            to="/register" 
            className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
}