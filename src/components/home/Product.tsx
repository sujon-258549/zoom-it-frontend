import  { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { RxCross2 } from "react-icons/rx";
import { useGetAllProductQuery } from "@/redux/fetures/auth/authApi";
import type { TProduct } from "../sidebar/ProductCreate";
import LoadingPage from "../common/loding/LoadingPage";

const ProductManagementCards = () => {
  const { data: product, isLoading } = useGetAllProductQuery('');
  const products: TProduct[] = product?.data || [];
  console.log(products)
  if(isLoading){
    return <LoadingPage/>
  }

  // Safe: initialize empty object, fill later with useEffect
  // const [currentPhotoIndexes, setCurrentPhotoIndexes] = useState<Record<string, number>>({});

  // Fill the currentPhotoIndexes once products data is loaded



  if (isLoading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-cyan-800 mb-3 tracking-tight">
            Product Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our products with interactive cards showcasing details, pricing, and availability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 group overflow-hidden"
            >
              <div className="relative h-64 object-contain overflow-hidden">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />


                <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-1 px-3 rounded-full text-sm shadow-lg">
                  {product.stockStatus ? (
                    <span className="text-sm text-white font-medium">✅ In Stock</span>
                  ) : (
                    <span className="text-sm flex gap-1 items-center text-white font-medium">
                      <RxCross2 /> Out of Stock
                    </span>
                  )}
                </div>

                <div
                  className={`absolute top-4 left-4 text-white font-semibold py-1 px-3 rounded-full text-sm shadow-md ${
                    product.status === "active" ? "bg-green-500" : "bg-gray-500"
                  }`}
                >
                  {product.status.toUpperCase()}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name.slice(0, 20)}</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories.map((cat) => (
                    <span
                      key={cat}
                      className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <Button className="w-full">🛒 Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagementCards;
