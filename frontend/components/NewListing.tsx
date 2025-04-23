import { useState } from 'react';
import Image from 'next/image';
import { User } from './User';

const NewListing: React.FC<User> = (user) => {
    const [expanded, setExpanded] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Submit logic here
        setExpanded(false); // Optionally collapse after submit
    };

    return (
      <div>
        <div
            className={`
                bg-white dark:bg-gray-700 rounded-xl p-6 transition-all duration-1200 ease-in-out shadow
                ${expanded ? 'max-h-[500px] py-6' : 'max-h-[180px] cursor-pointer hover:shadow-lg'}
                overflow-hidden flex flex-col items-center w-full sm:w-96 mx-auto
            `}
            style={{ minHeight: expanded ? 350 : 180 }}
        >
            {!expanded ? (
                <div
                    className="flex flex-col items-center w-full justify-center h-full"
                    onClick={() => setExpanded(true)}
                    tabIndex={0}
                    role="button"
                    aria-label="Add new listing"
                >
                    <Image src="/logo.svg" alt="List Item" width={48} height={48} className="opacity-80 group-hover:opacity-100 transition" />
                    <span className="mt-2 text-gray-500 dark:text-gray-300 font-medium">Add New Listing</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 animate-fade-in">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Item Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Bike"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Price</label>
                        <input
                            id="price"
                            type="number"
                            placeholder="120"
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Description</label>
                        <input
                            id="description"
                            type="text"
                            placeholder="Optional"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
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
            )}
        </div>
        </div>
    );
};

export default NewListing;