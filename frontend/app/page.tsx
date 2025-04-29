import React from "react";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center text-center p-4 max-w-2xl mx-auto">
        <h1 className="text-6xl font-extrabold text-white mb-6 drop-shadow-lg animate-pulse">
          Welcome to Our Store
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-prose mx-auto">
          Discover amazing products that transform your everyday life. Shop now and experience the difference!
        </p>
        <div className="space-x-4">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition duration-300 ease-in-out transform hover:scale-105">
            Shop Now
          </button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition duration-300 ease-in-out transform hover:scale-105">
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
}
