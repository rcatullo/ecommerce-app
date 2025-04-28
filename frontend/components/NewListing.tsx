import { useState, useEffect } from 'react';
import Image from 'next/image';
import { User } from './User';

const NewListing: React.FC<User> = (user) => {
    const [expanded, setExpanded] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    // Disable scrolling when form is open
    useEffect(() => {
        if (expanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [expanded]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Submit logic here
        setExpanded(false);
    };

    return (
      <div>
        <div
          className="block rounded-2xl group border hover:scale-105 transition-transform duration-700 ease-in-out border-zinc-800 min-h-full bg-white/80 px-8 h-36 flex flex-col justify-center"
          onClick={() => setExpanded(true)}
          tabIndex={0}
          role="button"
          aria-label="Add new listing"
        >
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg mb-4"></div>
          <div className="flex flex-col items-center justify-center">
            <Image src="/logo.svg" alt="List Item" width={48} height={48} className="opacity-80 group-hover:opacity-100 transition flex-none" />
            <span className="mt-2 text-gray-500 font-medium">Add New Listing</span>
          </div>
        </div>

        <div
          className={`
            fixed absolute inset-0 rounded-4xl bg-white/80 z-40
            transition-opacity duration-700 ease-in-out
            ${expanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
          aria-hidden={!expanded}
        ></div>

        <div
          className={`
            fixed inset-0 flex items-center justify-center z-50
            transition-all duration-700 ease-in-out
            ${expanded ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-100 pointer-events-none'}
          `}
          style={{ transitionProperty: 'opacity, transform' }}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-700 ease-in-out scale-100 opacity-100">
            <h1 className="text-3xl font-bold text-black text-center mb-4">
              <span className="font-unifraktur">New Listing</span>
            </h1>
            <p className="text-center text-gray-600 mb-6">List an item for sale.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name</label>
                  <input
                      id="name"
                      type="text"
                      placeholder="Bike"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-[#8C1515] focus:border-[#8C1515]"
                  />
              </div>
              <div className="mb-4">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Price</label>
                  <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none pointer-events-none">$</span>
                      <input
                          id="price"
                          type="text"
                          placeholder="120"
                          value={price}
                          onChange={e => setPrice(e.target.value)}
                          required
                          className="w-full pl-5 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-[#8C1515] focus:border-[#8C1515]"
                      />
                  </div>
              </div>
              <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Description</label>
                  <input
                      id="description"
                      type="text"
                      placeholder="Optional"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-[#8C1515] focus:border-[#8C1515]"
                  />
              </div>
              <div className="flex gap-2 mt-2">
                  <button
                      type="submit"
                      className="flex-1 bg-black hover:bg-gradient-to-r hover:from-[#fff1be] hover:from-28% hover:via-[#ee87cb] hover:via-70% hover:to-[#b060ff] text-white font-semibold py-2 rounded-lg transition duration-500 ease-in-out"
                  >
                      Post
                  </button>
                  <button
                      type="button"
                      onClick={() => setExpanded(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-100 font-semibold py-2 rounded-lg transition"
                  >
                      Cancel
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default NewListing;