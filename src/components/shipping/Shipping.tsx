import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Heart, ArrowRight, ShoppingBag, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Shipping = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24\" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT",
      price: 1499,
      quantity: 2,
      image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
      imageDark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
    },
    {
      id: 2,
      name: "APPLE iPhone 15 5G phone, 256GB, Gold",
      price: 999,
      quantity: 3,
      image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg",
      imageDark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg"
    }
  ]);

  const [voucherCode, setVoucherCode] = useState("");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const addToWishlist = (id: number) => {
    // Add to wishlist logic here
    console.log(`Added item ${id} to wishlist`);
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const savings = 299;
  const storePickup = 99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal - savings + storePickup + tax;

  const applyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    // Voucher application logic here
    console.log("Applying voucher:", voucherCode);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="mx-auto px-4 max-w-5xl">
        <div className="flex items-center mb-8">
          <ShoppingBag className="h-8 w-8 text-cyan-600 mr-3 dark:text-cyan-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
          <Badge variant="outline" className="ml-4 bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900 dark:text-cyan-100 dark:border-cyan-700">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </Badge>
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">Your cart is empty</h2>
              <p className="text-gray-500 mb-6 dark:text-gray-400">Looks like you haven't added any items to your cart yet.</p>
              <Button className="text-white">
                <ArrowRight className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="lg:flex lg:items-start lg:gap gap-4">
            {/* Cart Items */}
            <div className="lg:flex-1">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden border border-gray-200 dark:border-gray-700 -py-6">
                    <CardContent className="">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-lg object-contain border border-gray-200 dark:border-gray-700 dark:hidden"
                          />
                          <img
                            src={item.imageDark}
                            alt={item.name}
                            className="h-28 w-28 rounded-lg object-contain border border-gray-200 dark:border-gray-700 hidden dark:block"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-sm mt-3 text-gray-900 truncate dark:text-white">
                            {item.name.slice(0, 60)}
                          </h3>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                              <div className="flex items-center border-2 rounded-md border-cyan-800 dark:border-gray-600">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-white"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-4 w-4  text-cyan-800" />
                                </Button>
                                <Input
                                  type="text"
                                  value={item.quantity}
                                  readOnly
                                  className="h-8 w-12 text-center border-0 rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-white"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4 text-cyan-800" />
                                </Button>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900 dark:text-white">
                                ${(item.price * item.quantity).toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                ${item.price} each
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-4 mt-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400"
                              onClick={() => addToWishlist(item.id)}
                            >
                              <Heart className="h-4 w-4 mr-1" />
                              Save for later
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-6 lg:mt-0 lg:w-96">
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader className="bg-cyan-50 dark:bg-cyan-900/20">
                  <CardTitle className="text-xl text-cyan-800 dark:text-cyan-200">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium text-gray-900 dark:text-white">${subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Savings</span>
                      <span className="font-medium text-green-600">-${savings.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Store Pickup</span>
                      <span className="font-medium text-gray-900 dark:text-white">${storePickup.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tax</span>
                      <span className="font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-cyan-700 dark:text-cyan-400">${total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-4">
                  <Button className="w-full text-white">
                    Proceed to Checkout
                  </Button>

                  <div className="text-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">or</span>
                    <Link
                      to="/products"
                      className="text-sm font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </CardFooter>
              </Card>

              {/* Voucher Code */}
              {/* <Card className="mt-6 border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-cyan-600 dark:text-cyan-400" />
                    Apply Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={applyVoucher} className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Enter voucher code"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        variant="outline"
                        className="border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-gray-900"
                      >
                        Apply
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shipping;