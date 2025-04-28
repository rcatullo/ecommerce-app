/**
 * Footer.tsx
 *
 * This component renders the footer section of the application, including branding,
 * a call-to-action for new users, and contact information.
 * It uses Next.js Link and Image components and consumes authentication context.
 */

import Link from 'next/link';
import Image from 'next/image';

/**
 * Footer Component
 *
 * Displays a visually styled footer with:
 * - A call-to-action for graduating students to list items.
 * - Branding and logo.
 * - Copyright.
 * - Contact information.
 */
const Footer: React.FC = () => {
  return (
    <footer>
      <div className="relative bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] sm:bg-linear-145">
        <div className="absolute inset-2 rounded-4xl bg-white/80"></div>
        <div className="px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-7xl">
                <div className="relative pt-20 pb-16 text-center sm:py-24">
                <hgroup>
                    <h2 className="font-mono text-xs/5 font-semibold tracking-widest text-gray-500 uppercase data-dark:text-gray-400">Get started.</h2>
                    <p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl">
                        Graduating?
                        <br/>
                        Pass your treasures to the saplings.
                    </p>
                </hgroup>
                <p className="mx-auto mt-6 max-w-xs text-sm/6 text-gray-500">
                { "Make an account to start listing what you can't take with you." }
                </p>
                <div className="mt-6">
                    <Link href="/signup" className="transition-transform ease-in-out duration-500 hover:scale-105 w-full sm:w-auto inline-flex items-center justify-center px-4 py-[calc(--spacing(2)-1px)] rounded-full border border-transparent bg-gray-950 shadow-md text-base font-medium whitespace-nowrap text-white data-disabled:bg-gray-950 data-disabled:opacity-40 data-hover:bg-gray-800">
                        Get started</Link>
                </div>
                </div>
                <div className="pb-16">
                <div className="group/row relative isolate pt-[calc(--spacing(2)+1px)] last:pb-[calc(--spacing(2)+1px)]">
                <div className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2"></div>
                <div className="grid grid-cols-2 gap-y-10 pb-6 lg:grid-cols-6 lg:gap-4">
                    <div className="col-span-2 relative flex">
                    <div className="relative flex gap-6 items-center">
                        <div className="py-3 group/item relative">
                        <Link href="/" className="h-9 overflow-visible flex items-center">
                            <Image src="/logo.svg" alt="FarmSale Logo" width={32} height={32} className="rounded-xl"/>
                            <span className="ml-4 text-xl font-unifraktur text-black">
                            treesail</span>
                        </Link>
                        </div>
                        
                        </div>
                    </div>
                    <div className="col-span-2 relative flex justify-center">
                    <div className="relative flex gap-6 items-center">
                        <div className="py-3 group/item relative">
                        <div className="pt-6 lg:pb-6 flex relative text-gray-400">
                            @ 2025 treesail | All Rights Reserved
                        </div>
                        </div>
                        
                        </div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                    <div className="relative flex gap-6 items-center">
                        <div className="py-3 group/item relative">
                        <div className="pt-6 lg:pb-6 flex relative text-gray-600">
                            Questions? <br/>
                            e: rcatullo@stanford.edu
                        </div>
                        </div>
                        
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;