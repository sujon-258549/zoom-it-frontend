import { FaShoppingCart } from "react-icons/fa";
import { Button } from "./button";
import { useAppDispatch } from "@/redux/fetures/hooks";
import { addProduct } from "@/redux/fetures/card/shippingSlice";
import { toast } from "sonner";
import type { TProduct } from "../allProduct/type";

const AddToCart = ({ product }: { product: TProduct | any }) => {
    const dispatch = useAppDispatch()
    const handelAddToCart = () => {
        dispatch(addProduct(product))
        return toast.success("Product Add to Cart Successfully", { duration: 2000 })
    }
    return (
        <Button disabled={!product.stockStatus} onClick={handelAddToCart}
            className="flex cursor-pointer text-white"
        >
            {/* Cart Icon */}
            <FaShoppingCart className="text-lg" />
        </Button>
    );
};

export default AddToCart;
