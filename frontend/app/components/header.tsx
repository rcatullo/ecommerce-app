import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="pt-4 sm:pt-8">
      <div className="relative flex justify-between group/row relative isolate pt-[calc(--spacing(2)+1px)] last:pb-[calc(--spacing(2)+1px)]">
        <div className="relative flex gap-6">
          <div className="py-3 group/item relative">
            <Link href="/" className="h-9 overflow-visible flex items-center">
              <Image
                src="/logo.svg"
                alt="FarmSale Logo"
                width={32}
                height={32}
                className="rounded-xl"
              />
              <span className="ml-4 text-xl font-unifraktur text-black">
                treesail
              </span>
            </Link>
          </div>
        </div>
        <nav className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="text-sm font-medium bg-brand text-white px-3 py-1 rounded-md hover:bg-brand-dark transition-colors"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
