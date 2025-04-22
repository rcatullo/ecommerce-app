import { useEffect, useState } from 'react';
import api from '../services/api';
import Link from 'next/link';
import { User } from './User';

const NewListing: React.FC<User> = (user) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //await login(email, password, setSuccess, setError);
    };


    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#8C1515] dark:text-red-300 text-center mb-4">Welcome Back</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Log in with your SUNet ID</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Item Name</label>
              <input
                id="name"
                type="string"
                placeholder="Bike"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#8C1515] focus:border-[#8C1515]"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Price</label>
              <input
                id="price"
                type="number"
                placeholder="120"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#8C1515] focus:border-[#8C1515]"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
              <input
                id="description"
                type="string"
                placeholder="Optional"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#8C1515] focus:border-[#8C1515]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#8C1515] dark:bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 dark:hover:bg-red-500 transition-colors"
            >
              Post
            </button>
          </form>
        </div>
    )
};

export default NewListing;