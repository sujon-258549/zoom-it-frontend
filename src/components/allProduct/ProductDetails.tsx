import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { useGetAllProductQuery, useGetSingleProductQuery } from "@/redux/fetures/auth/authApi";
import { Input } from "../ui/input";
import LoadingPage from "../common/loding/LoadingPage";
import RelevantProduct from "./RelevantProduct";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetSingleProductQuery(id);
  const [quantity, setQuantity] = useState()
  const [selected, setSelected] = useState(0);
  const { data: products } = useGetAllProductQuery('')

  console.log(products?.data)
  console.log("product", product?.data.categories[0].name)
  // @ts-expect-error
  const allCategories = products.data
    .flatMap((p: any) => p.categories.map((c: any) => c.name))
    .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i);

  console.log(allCategories)
  // ✅ Step 2: Filter products by selected category
  // @ts-expect-error
  const filteredProducts = products.data.filter((p: any) =>
    p.categories.some((c: any) => c.name === product?.data.categories[0].name)
  )

  console.log(filteredProducts)


  const handleQuantity = (e: any) => {
    setQuantity(e.target.value);
  };

  if (isLoading) return <LoadingPage />;
  if (error) return <p className="text-center mt-10 text-red-500">Failed to load product</p>;
  if (!product?.data) return <p className="text-center mt-10">No product found</p>;

  const p = product.data;

  // Use product photos if available, otherwise fallback to placeholder
  const thumbs: string[] = p.photos?.length ? p.photos : [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  ];

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

                <div className="mt-4 flex items-center gap-3 w-[240px]">
                  <label className="text-sm">Quantity</label>
                  <Input style={{ boxShadow: '1px 1px 10px' }} name="quantity" className="border shadow-2xl border-cyan-800" onChange={handleQuantity} type="number" placeholder="Enter your quantity" />
                </div>

                <Button className="w-full mt-5 text-white">
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
                  Add to cart
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
