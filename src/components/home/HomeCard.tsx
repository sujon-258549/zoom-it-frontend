import React, { useState } from "react";
import { Button } from "../ui/button";

const ProductManagementCards = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      slug: "wireless-bluetooth-headphones",
      photos: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500",
      ],
      description:
        "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
      price: 129.99,
      discount: 15,
      stockStatus: true,
      status: "active",
      categories: ["Electronics", "Audio"],
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      slug: "organic-cotton-tshirt",
      photos: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500",
      ],
      description:
        "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
      price: 29.99,
      discount: 0,
      stockStatus: true,
      status: "active",
      categories: ["Clothing", "Eco-Friendly"],
    },
    {
      id: 3,
      name: "Smart Watch Series 5",
      slug: "smart-watch-series-5",
      photos: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500",
      ],
      description:
        "Track your fitness goals and receive notifications right on your wrist.",
      price: 199.99,
      discount: 25,
      stockStatus: true,
      status: "active",
      categories: ["Electronics", "Wearables"],
    },
    {
      id: 4,
      name: "Smart Watch Series 5",
      slug: "smart-watch-series-5",
      photos: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500",
      ],
      description:
        "Track your fitness goals and receive notifications right on your wrist.",
      price: 199.99,
      discount: 25,
      stockStatus: true,
      status: "active",
      categories: ["Electronics", "Wearables"],
    },
    // {
    //   id: 5,
    //   name: "Smart Watch Series 5",
    //   slug: "smart-watch-series-5",
    //   photos: [
    //     "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    //     "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500",
    //   ],
    //   description:
    //     "Track your fitness goals and receive notifications right on your wrist.",
    //   price: 199.99,
    //   discount: 25,
    //   stockStatus: true,
    //   status: "active",
    //   categories: ["Electronics", "Wearables"],
    // },
  ]);

  const [currentPhotoIndexes, setCurrentPhotoIndexes] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {} as Record<number, number>)
  );

  const nextPhoto = (id: number) => {
    setCurrentPhotoIndexes((prev) => {
      const product = products.find((p) => p.id === id)!;
      return {
        ...prev,
        [id]: (prev[id] + 1) % product.photos.length,
      };
    });
  };

  const prevPhoto = (id: number) => {
    setCurrentPhotoIndexes((prev) => {
      const product = products.find((p) => p.id === id)!;
      return {
        ...prev,
        [id]:
          (prev[id] - 1 + product.photos.length) % product.photos.length,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Product Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our products with interactive cards showcasing details,
            pricing, and availability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 group overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-64 object-contain overflow-hidden">
                <img
                  src={product.photos[currentPhotoIndexes[product.id]]}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                {/* Arrows */}
                {product.photos.length > 1 && (
                  <>
                    <button
                      onClick={() => prevPhoto(product.id)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => nextPhoto(product.id)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-1 px-3 rounded-full text-sm shadow-lg">
                    {product.discount}% OFF
                  </div>
                )}

                {/* Status */}
                {/* <div
                  className={`absolute top-4 left-4 text-white font-semibold py-1 px-3 rounded-full text-sm shadow-md ${
                    product.status === "active"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  {product.status.toUpperCase()}
                </div> */}
              </div>

              {/* Details */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name.slice(0, 20)}
                </h2>
                {/* <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p> */}

                <div className="flex justify-between items-center mb-4">
                  {/* Price */}
                  {product.discount > 0 ? (
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        $
                        {(
                          product.price *
                          (1 - product.discount / 100)
                        ).toFixed(2)}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                  )}

                  {/* Stock */}
                  {product.stockStatus ? (
                    <span className="text-sm text-green-600 font-medium">
                      ✅ In Stock
                    </span>
                  ) : (
                    <span className="text-sm text-red-600 font-medium">
                      ❌ Out of Stock
                    </span>
                  )}
                </div>

                {/* Categories */}
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

                {/* Action */}
                <Button className="w-full">
                  🛒 Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagementCards;
