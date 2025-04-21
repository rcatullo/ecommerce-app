import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';

const AddProductForm = ({ storeName }: { storeName: string }) => {
  const { addProduct } = useProducts();
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct(storeName, {
      ...newProduct,
      price: parseFloat(newProduct.price)
    });
    setNewProduct({ name: '', description: '', price: ''});
  };

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={e => setNewProduct({...newProduct, name: e.target.value})}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={e => setNewProduct({...newProduct, description: e.target.value})}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={e => setNewProduct({...newProduct, price: e.target.value})}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-[#8C1515] text-white px-4 py-2 rounded hover:bg-[#660C0C]"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const ProductList = ({ products, isOwner, storeName }: { 
  products: Product[], 
  isOwner: boolean,
  storeName: string
}) => {
  const { deleteProduct } = useProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-lg shadow p-4">
          <h3 className="text-xl font-bold mt-2">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-[#8C1515] font-bold mt-2">${product.price}</p>
          {isOwner && (
            <button
              onClick={() => deleteProduct(storeName, product.id)}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const SellerStorePage = () => {
  const router = useRouter();
  const { store_name } = router.query;
  const { user, isStorePage } = useAuth();
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    if (store_name && typeof store_name === 'string') {
      fetchProducts(store_name);
    }
  }, [store_name]);

  if (!store_name) return null;
  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center text-red-600 p-8">{error}</div>;

  const isOwner = Boolean(isStorePage(store_name as string));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#8C1515]">
          {user?.seller_profile?.store_name || store_name}
        </h1>
        {user?.seller_profile?.store_description && (
          <p className="text-gray-600 mt-2">{user.seller_profile.store_description}</p>
        )}
      </div>

      {isOwner && <AddProductForm storeName={store_name as string} />}
      
      <ProductList 
        products={products} 
        isOwner={isOwner} 
        storeName={store_name as string} 
      />
    </div>
  );
};

export default SellerStorePage;
