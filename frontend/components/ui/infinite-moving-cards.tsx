/**
 * InfiniteMovingCards.tsx
 * 
 * This component renders a horizontally scrolling, infinitely-looping list of product cards.
 * The scroll direction, speed, and pause-on-hover behavior are configurable.
 * Used for visually engaging displays of product listings.
 */

"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Product } from "../Product";

/**
 * InfiniteMovingCards Component
 * 
 * @param items - Array of Product objects to display in the scroller.
 * @param direction - Scroll direction, either "left" or "right". Defaults to "left".
 * @param speed - Animation speed: "fast", "normal", or "slow". Defaults to "fast".
 * @param pauseOnHover - Whether to pause animation on hover. Defaults to true.
 * @param className - Additional CSS classes for the container.
 */
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: Product[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, [items]);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      const time = 10 * items.length;
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", `${time}s`);
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", `${2 * time}s`);
      } else {
        containerRef.current.style.setProperty("--animation-duration", `${4 * time}s`);
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-16 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border hover:scale-105 transition-transform duration-700 ease-in-out border-zinc-800 bg-[linear-gradient(135deg,#fff1be,#b060ff)] px-8 py-6 md:w-[350px]"
            key={item.name}
          >
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <div className="relative z-20 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-lg font-semibold leading-[1.6] font-normal text-neutral-800">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] font-normal text-neutral-800">
                    ${item.price}
                  </span>
                </span>
              </div>
              <span className="relative z-20 text-sm leading-[1.6] font-normal text-neutral-800">
                {item.description}
              </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
