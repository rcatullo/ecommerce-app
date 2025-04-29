import React from "react";
import Header from "./components/header";

export default function Home() {
  return (
    <>
      <div className="relative bg-white">
        <div className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] sm:bg-linear-145"></div>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <Header />
            <main className="">
              <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
                <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
                  <span className="font-unifraktur">Thrift</span> at Stanford
                </h1>
                <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
                  Join the campus-wide garage sale.{" "}
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
      {/*<main>
      <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
    <div className="h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <div className="pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <h2 className="max-w-3xl text-4xl font-medium tracking-tighter text-pretty text-gray-950 data-dark:text-white sm:text-6xl">Hundreds of listings by graduating seniors.</h2>
          <div className="mt-16">
      <InfiniteMovingCards
        items={products}
        direction="right"
        speed="slow"
        pauseOnHover={false}
      />
      <InfiniteMovingCards
        items={products}
        direction="left"
        speed="slow"
        pauseOnHover={false}
      />
      </div>
      </div>
      </div>
    </div>
    </div>
    </main>*/}
    </>
  );
}
