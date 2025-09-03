import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { RxCross2, RxChevronLeft, RxChevronRight } from "react-icons/rx";
import type { TProduct } from "../sidebar/ProductCreate";


import { Link } from "react-router-dom";

const RelevantProduct = ({product}:{product: TProduct[]}) => {
  const products: TProduct[] = product || [];

  // State to track current photo index for each product
  const [currentPhotoIndexes, setCurrentPhotoIndexes] = useState<Record<string, number>>({});

  // Initialize photo indexes when products are loaded
  useEffect(() => {
    if (products.length > 0) {
      const initialIndexes: Record<string, number> = {};
      products.forEach(product => {
        initialIndexes[product._id] = 0;
      });
      setCurrentPhotoIndexes(initialIndexes);
    }
  }, [products]);

  // Function to navigate to next photo
  const nextPhoto = (productId: string) => {
    setCurrentPhotoIndexes(prev => {
      const currentIndex = prev[productId];
      const product = products.find(p => p._id === productId);
      if (!product) return prev;

      const nextIndex = (currentIndex + 1) % product.photos.length;
      return { ...prev, [productId]: nextIndex };
    });
  };

  // Function to navigate to previous photo
  const prevPhoto = (productId: string) => {
    setCurrentPhotoIndexes(prev => {
      const currentIndex = prev[productId];
      const product = products.find(p => p._id === productId);
      if (!product) return prev;

      const prevIndex = (currentIndex - 1 + product.photos.length) % product.photos.length;
      return { ...prev, [productId]: prevIndex };
    });
  };
  console.log(products)

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-cyan-800 mb-3 tracking-tight">
            Relevant Product
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore relevant products with interactive cards showcasing details, pricing, and availability.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => {
              const currentIndex = currentPhotoIndexes[product._id] || 0;
              const currentPhoto = product.photos?.[currentIndex] || "";

              return (
                <div
                  key={product._id}
                  className="relative bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 group overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden">
                    {product.photos && product.photos.length > 0 ? (
                      <>
                        <img
                          src={currentPhoto}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Photo navigation arrows */}
                        {product.photos.length > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                prevPhoto(product._id);
                              }}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
                            >
                              <RxChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                nextPhoto(product._id);
                              }}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
                            >
                              <RxChevronRight className="w-5 h-5" />
                            </button>
                          </>
                        )}

                        {/* Photo indicators */}
                        {product.photos.length > 1 && (
                          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                            {product.photos.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === currentIndex
                                  ? 'bg-white'
                                  : 'bg-white/50'
                                  }`}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}

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
                      className={`absolute top-4 left-4 text-white font-semibold py-1 px-3 rounded-full text-sm shadow-md ${product.status === "active" ? "bg-green-500" : "bg-gray-500"
                        }`}
                    >
                      {product.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate" title={product.name}>
                      {product.name}
                    </h2>


                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-cyan-700">
                        ${((product.discount || 0)).toFixed(2)}
                      </span>
                      {product.discount > 0 && (
                        <>
                          <span className="text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.categories && product.categories.length > 0 ? (
                        product.categories.slice(0, 2).map((cat: any) => (
                          <div key={cat._id}>
                            <span

                              className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
                            >
                              {cat.name}
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">No categories</span>
                      )}
                    </div>

                    <Link to={`/product/${product._id}`}> <Button className="w-full text-white cursor-pointer">
                      🛒 Add to Cart
                    </Button></Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* {products.length >= 8 &&

        <div className="flex justify-center  mt-16">
          <Link to={'/all-product'}><Button className="text-white cursor-pointer
       text-center"><AlignLeft className="mr-4" /> View All</Button></Link>
        </div>
      } */}
    </div>
  );
};

export default RelevantProduct;