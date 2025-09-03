
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function ProductDetails() {
  const [selected, setSelected] = useState(0);
  const [qty, setQty] = useState("1");

  const thumbs = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  ];

  return (
    <div className="min-h-screen  text-gray-200 p-6">
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
                  className={`h-[80px] w-[80px] p-2  rounded-lg ${
                    selected === i ? "border-blue-500 ring-2 ring-blue-500" : "border-transparent"
                  }`}
                >
                  <img src={src} alt={`thumb-${i}`} className="object-contain h-full" />
                </Button>
              ))}
            </div>

            {/* Main image */}
            <Card className=" rounded-lg p-4 w-full border-none">
              <CardContent className="flex items-center justify-center">
                <img src={thumbs[selected]} alt="product" className="object-contain w-full rounded-md" />
              </CardContent>
            </Card>
          </div>

          {/* Product card */}
          <aside className="lg:col-span-5">
            <Card className=" border-[#17212b] rounded-xl sticky top-6">
              <CardContent className="p-5">
                <h1 className="text-xl font-semibold leading-snug">
                  Apple iMac 24&quot; All-In-One Computer, Apple M1, 8GB RAM
                </h1>

                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="secondary" className="bg-[#2b3a47] text-xs">
                    the last 2 products
                  </Badge>
                  <div className="flex items-center text-yellow-400 text-sm">★★★★★</div>
                  <a href="#" className="text-sm text-blue-400 underline ml-auto">
                    345 Reviews
                  </a>
                </div>

                <div className="mt-4 text-2xl font-bold">$1,249.99</div>

                <div className="mt-4 flex items-center gap-3">
                  <label className="text-sm">Quantity</label>
                  <Select value={qty} onValueChange={setQty}>
                    <SelectTrigger className="w-24 bg-[#0b1220] border-[#21303a]">
                      <SelectValue placeholder="Qty" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full mt-5 bg-[#2563eb] hover:bg-[#1e4fc1]">
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

                <p className="text-sm mt-4 text-[#9aa6b0]">
                  Also available at competitive prices from{" "}
                  <a href="#" className="text-blue-400 underline">
                    authorized retailers
                  </a>
                  , with optional Premium delivery for expedited shipping.
                </p>

                {/* Options */}
                <div className="mt-5">
                  <div className="text-sm mb-2">Colour</div>
                  <div className="flex gap-2">
                    {["Green", "Pink", "Silver", "Blue"].map((c) => (
                      <Button
                        key={c}
                        variant="outline"
                        className="px-3 py-1.5 text-sm border-[#21303a]"
                      >
                        {c}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
