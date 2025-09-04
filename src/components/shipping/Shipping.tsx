import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/fetures/hooks";
import { clearCart, decrementProductQuantity, deliveryAmount, deliveryAmountValue, incrementProductQuantity, orderSelector } from "@/redux/fetures/card/shippingSlice";
import type { TProduct } from "../allProduct/type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { districts } from "./district";
import { toast } from "sonner";
import { useCreateOrderMutation } from "@/redux/fetures/auth/authApi";
import { userCurrentUser } from "@/redux/fetures/auth/authSlice";

const Shipping = () => {

  const dispatch = useAppDispatch()
  const products = useAppSelector(orderSelector)
  const [district, setDistrict] = useState('')
  dispatch(deliveryAmount(district))
  const [address, setAddress] = useState("");
  const incrementQuantity = (product: TProduct) => {
    dispatch(incrementProductQuantity(product))
  };
  const decrementQuantity = (product: TProduct) => {
    dispatch(decrementProductQuantity(product))
  };
  const user = useAppSelector(userCurrentUser) as any
  const role = user?.userInfo?.role
  const removeItem = (product: TProduct) => {
    dispatch(clearCart(product))
  };

  // Total Price

  const discountPrice = products.reduce(
    (total, item) => total + (Number(item.discount) * Number(item.orderQuantity)),
    0
  );
  const subtotal = products.reduce(
    (total, item) => total + (Number(item.price) * Number(item.orderQuantity)),
    0
  );

  const [createOrder] = useCreateOrderMutation()

  const deliveryCost = useAppSelector(deliveryAmountValue)
  const savings = (subtotal - discountPrice).toFixed()
  const totalPrice = (subtotal - Number(savings) + deliveryCost)

  const handleOrder = async () => {
    // Show loading toast
    if (!role) {
      return toast.error("Please login");
    }
    const toastId = toast.loading("Processing order...", { duration: 2000 });

    // Validate required fields
    if (!address || !district) {
      toast.error("Please add both address and district", { id: toastId });
      return;
    }

    // Prepare order payload
    const orderPayload = {
      product: products.map((product) => ({
        id: product._id,
        orderQuantity: product.orderQuantity,
      })),
      address: {
        address,
        district,
      },
      totalAmount: totalPrice,
    };

    try {
      const res = await createOrder(orderPayload);

      if (res?.data?.success) {
        toast.success(res.data.message || "Order placed successfully", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error(res?.data?.message || "Failed to place order", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Order Error:", error);
      toast.error("Something went wrong. Please try again.", { id: toastId });
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="mx-auto px-4 max-w-5xl">
        <div className="flex items-center mb-8">
          <ShoppingBag className="h-8 w-8 text-cyan-600 mr-3 dark:text-cyan-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
          <Badge variant="outline" className="ml-4 bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900 dark:text-cyan-100 dark:border-cyan-700">
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </Badge>
        </div>

        {products.length === 0 ? (
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
                {products?.map((item: TProduct) => (
                  <Card key={item._id} className="overflow-hidden border border-gray-200 dark:border-gray-700 -py-6">
                    <CardContent className="">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.photos[0]}
                            alt={item.name}
                            className="h-16 w-16 rounded-lg object-contain border border-gray-200 dark:border-gray-700 dark:hidden"
                          />
                          <img
                            src={item.photos[0]}
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
                                  onClick={() => decrementQuantity(item)}
                                >
                                  <Minus className="h-4 w-4  text-cyan-800" />
                                </Button>
                                <Input
                                  type="text"
                                  value={item?.orderQuantity}
                                  readOnly
                                  className="h-8 w-12 text-center border-0 rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-white"
                                  onClick={() => incrementQuantity(item)}

                                >
                                  <Plus className="h-4 w-4 text-cyan-800" />
                                </Button>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900 dark:text-white">
                                {/* ${(item.price * item.quantity).toLocaleString()} */}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {Number(item.discount) * item.orderQuantity} each
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-4 mt-1 mb-3">
                            <Badge className="text-white">Remove This Cart <MoveRight /></Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              onClick={() => removeItem(item)}
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
                      <span className="font-medium text-gray-900 dark:text-white">{subtotal} Take</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Savings</span>
                      <span className="font-medium text-green-600">  {savings} Take</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Delivery  Cost
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">{deliveryCost} Take</span>
                    </div>


                    <div className="p-6 bg-gray-50  flex flex-col ">
                      <p className="text-lg font-medium mb-2 text-cyan-900">Select District</p>

                      <Select onValueChange={setDistrict}>
                        <SelectTrigger className="w-full border border-cyan-900 rounded-md bg-cyan-50 hover:bg-cyan-100 focus:ring-2 focus:ring-cyan-400">
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>

                        <SelectContent className="bg-cyan-50 border border-cyan-400 rounded-md">
                          {districts.map((d) => (
                            <SelectItem
                              key={d}
                              value={d}
                              className="hover:bg-cyan-200 focus:bg-cyan-300"
                            >
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {district && (
                        <p className="mt-4 text-cyan-800 font-semibold">
                          Selected: {district}
                        </p>
                      )}

                      <p className="mt-4">Inter your Address</p>
                      <Input
                        type="email"
                        placeholder="Enter your address"                  // input value bind
                        onChange={(e) => setAddress(e.target.value)}  // update state on change
                        className="border mt-4 border-cyan-800 rounded-md p-2"
                      />
                      <p>Typed Email: {address}</p>
                    </div>
                    <Separator className="my-4" />

                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-cyan-700 dark:text-cyan-400">{totalPrice.toFixed()} Take</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-4">
                  <Button onClick={handleOrder} className="w-full cursor-pointer text-white">
                    Proceed to Checkout
                  </Button>

                  {/* <div className="text-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">or</span>
                    <Link
                      to="/products"
                      className="text-sm font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                    >
                      Continue Shopping
                    </Link>
                  </div> */}
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