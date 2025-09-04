import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { useGetAllProductQuery, useGetSingleProductQuery } from "@/redux/fetures/auth/authApi";
import LoadingPage from "../common/loding/LoadingPage";
import RelevantProduct from "./RelevantProduct";
import type { TProduct } from "./type";
import { useAppDispatch } from "@/redux/fetures/hooks";
import { addProduct } from "@/redux/fetures/card/shippingSlice";
import { toast } from "sonner";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetSingleProductQuery(id);
  const [selected, setSelected] = useState(0);
  const { data: products } = useGetAllProductQuery('')
console.log(product)
  // redux work slice
  const dispatch = useAppDispatch()
  const handelAddToCart = (product: TProduct) => {
    dispatch(addProduct(product))
    return toast.success("Product Add to Cart Successfully", { duration: 2000 })
  }
  console.log(products?.data)
  console.log("product", product?.data.categories[0].name)
  const allCategories = products?.data
    .flatMap((p: any) => p.categories.map((c: any) => c.name))
    .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i);

  console.log(allCategories)
  // ✅ Step 2: Filter products by selected category
  const filteredProducts = products?.data?.filter((p: any) =>
    p.categories.some((c: any) => c.name === product?.data.categories[0].name)
  )



  if (isLoading) return <LoadingPage />;
  if (error) return <p className="text-center mt-10 text-red-500">Failed to load product</p>;
  if (!product?.data) return <p className="text-center mt-10">No product found</p>;

  const p = product.data;

  // Use product photos if available, otherwise fallback to placeholder
  const thumbs: string[] = p.photos?.length ? p.photos : [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  ];



  // ad to cart

  return (
    <div className="min-h-screen text-gray-200 p-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Gallery */}
          <div className="lg:col-span-7 flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 w-24">
              {thumbs.map((src, i) => (
                <Button
                  key={i}
                  variant="outline"
                  onClick={() => setSelected(i)}
                  className={`h-[80px] w-[80px] p-2 rounded-lg ${selected === i ? "border-cyan-700 ring-2 ring-cyan-900" : "border-transparent"
                    }`}
                >
                  <img src={src} alt={`thumb-${i}`} className="object-contain h-full" />
                </Button>
              ))}
            </div>

            {/* Main image */}
            <Card className="rounded-lg p-4 w-full border-none">
              <CardContent className="flex items-center justify-center">
                <img
                  src={thumbs[selected]}
                  alt={p.name}
                  className="object-cover h-full lg:h-[300px] w-full rounded-md"
                />
              </CardContent>
            </Card>
          </div>

          {/* Product card */}
          <aside className="lg:col-span-5">
            <Card className="border-cyan-800 border-4 rounded-xl sticky top-6">
              <CardContent className="p-5">
                <h1 className="text-xl font-semibold leading-snug">{p.name}</h1>

                <div className="flex items-center gap-2 mt-3">
                  {p.stockStatus ? (
                    <Badge variant="secondary" className="bg-cyan-700 text-white text-xs">
                      In stock
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-red-600 text-xs">
                      Out of stock
                    </Badge>
                  )}

                  {/* Example static stars – replace with dynamic rating if available */}
                  <div className="flex items-center text-yellow-400 text-sm">★★★★★</div>
                  <a href="#" className="text-sm text-blue-400 underline ml-auto">
                    {p.reviewsCount || 0} Reviews
                  </a>
                </div>

                <div className="mt-4 text-2xl font-bold">
                  ${p.price}
                  {p.discount ? (
                    <span className="ml-2 text-sm text-gray-400 line-through">
                      ${p.price + p.discount}
                    </span>
                  ) : null}
                </div>


                <Button
                  onClick={() => handelAddToCart(product.data)}
                  disabled={product.stockStatus} // stockStatus === false হলে disable হবে
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
                 {product.stockStatus !== true ? "Add to cart" : "Out Of Stock"}
                </Button>


                <p className="text-sm mt-4 text-[#111415]">{p.description}</p>

                {/* Options */}
                {p.colors?.length > 0 && (
                  <div className="mt-5">
                    <div className="text-sm mb-2">Colour</div>
                    <div className="flex gap-2">
                      {p.colors.map((c: string) => (
                        <Button
                          key={c}
                          variant="outline"
                          className="px-3 py-1.5 text-sm border-[#07395a]"
                        >
                          {c}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
      <div>
        {/* @ts-expect-error */}
        <RelevantProduct product={filteredProducts} />
      </div>

    </div>
  );
}
