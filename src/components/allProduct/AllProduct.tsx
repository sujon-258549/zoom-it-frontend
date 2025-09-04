import { useState, useEffect, useMemo, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { RxCross2, RxChevronLeft, RxChevronRight } from "react-icons/rx";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";

import { useGetAllProductQuery } from "@/redux/fetures/auth/authApi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import LoadingPage from "../common/loding/LoadingPage";

const AllProduct = () => {
  // State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  // Build query params with useMemo (best practice to avoid rebuilding on every render)
  const queryParams = useMemo(() => {
    const params: { name: string; value: string | number }[] = [
      { name: "limit", value: 4 },
      { name: "page", value: currentPage },
    ];
    if (search) {
      params.push({ name: "search", value: search });
    }
    return params;
  }, [currentPage, search]);

  // API call
  const { data: product, isLoading } = useGetAllProductQuery(queryParams);
  const products = product?.data || [];
  const totalPages = product?.meta?.totalPage || 1;

  // Track current photo index per product
  const [currentPhotoIndexes, setCurrentPhotoIndexes] = useState<Record<string, number>>({});

  // Reset photo indexes whenever products change
  useEffect(() => {
    if (products.length > 0) {
      const initialIndexes: Record<string, number> = {};
      products.forEach((p) => {
        initialIndexes[p._id] = 0;
      });
      setCurrentPhotoIndexes(initialIndexes);
    }
  }, [products]);

  // Navigation for photos
  const nextPhoto = (productId: string, length: number) => {
    setCurrentPhotoIndexes((prev) => ({
      ...prev,
      [productId]: (prev[productId] + 1) % length,
    }));
  };

  const prevPhoto = (productId: string, length: number) => {
    setCurrentPhotoIndexes((prev) => ({
      ...prev,
      [productId]: (prev[productId] - 1 + length) % length,
    }));
  };

  // Search handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // reset to page 1 when searching
  };

  // Loading state
  if (isLoading) return <LoadingPage />;

  return (
    <div className="py-12 px-4  max-w-6xl mx-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-cyan-800 mb-3 tracking-tight">
            All Product
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our products with interactive cards showcasing details, pricing, and availability.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>

              <Input
                type="search"
                id="default-search"
                placeholder="Search Mockups, Logos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-[45px] ps-10 pr-24"
              />

              <Button
                type="submit"
                className="absolute end-2.5 bottom-1 text-white bg-blue-700 hover:bg-blue-800"
              >
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2">
            {products.map((product) => {
              const currentIndex = currentPhotoIndexes[product._id] || 0;
              const currentPhoto = product.photos?.[currentIndex] || "";

              return (
                <div
                  key={product._id}
                  className="relative bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 group overflow-hidden"
                >
                  {/* Product image */}
                  <div className="relative h-64 overflow-hidden">
                    {product.photos?.length > 0 ? (
                      <>
                        <img
                          src={currentPhoto}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Photo navigation */}
                        {product.photos.length > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                prevPhoto(product._id, product.photos.length);
                              }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                            >
                              <RxChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                nextPhoto(product._id, product.photos.length);
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
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
                                className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"
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

                    {/* Stock status */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-1 px-3 rounded-full text-sm shadow-lg">
                      {product.stockStatus ? (
                        <span className="text-sm">✅ In Stock</span>
                      ) : (
                        <span className="text-sm flex gap-1 items-center">
                          <RxCross2 /> Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Product status */}
                    <div
                      className={`absolute top-4 left-4 text-white font-semibold py-1 px-3 rounded-full text-sm shadow-md ${product.status === "active" ? "bg-green-500" : "bg-gray-500"
                        }`}
                    >
                      {product.status.toUpperCase()}
                    </div>
                  </div>

                  {/* Product details */}
                  <div className="p-6">
                    <h2
                      className="text-xl font-semibold text-gray-900 mb-2 truncate"
                      title={product.name}
                    >
                      {product.name}
                    </h2>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-cyan-700">
                        ${(product.discount || 0).toFixed(2)}
                      </span>
                      <span className="text-gray-400 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.categories?.length > 0 ? (
                        product.categories.slice(0, 2).map((cat: any) => (
                          <span
                            key={cat._id}
                            className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
                          >
                            {cat.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">No categories</span>
                      )}
                    </div>

                    <Link to={`/product/${product._id}`}>
                      <Button
                        disabled={!product.stockStatus} // stockStatus === false হলে disable হবে
                        className="w-full cursor-pointer mt-5 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="mr-2"
                        >
                          <path
                            d="M3 3h2l.4 2M7 13h10l3-8H6.4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {product.stockStatus === true ? "Add to cart" : "Out Of Stock"}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-16">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default AllProduct;
