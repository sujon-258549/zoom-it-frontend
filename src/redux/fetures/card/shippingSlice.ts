import type { TProduct } from "@/components/allProduct/type";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface TCartProduct extends TProduct {
    orderQuantity: number
}

interface TInitialState {
    products: TCartProduct[],
    deliveryAmount: number, // শুরুতে ০ সেট করুন
}

const initialState: TInitialState = {
    products: [],
    deliveryAmount: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const matchProduct = state.products.find(
                (product) => product._id === action.payload._id
            );

            if (matchProduct) {
                matchProduct.orderQuantity += 1;
                return
            } else {
                state.products.push({ ...action.payload, orderQuantity: 1 });
            }
        },

        incrementProductQuantity: (state, action) => {
            const matchProduct = state.products.find(
                (product) => product._id === action.payload._id
            );
            if (matchProduct) {
                matchProduct.orderQuantity += 1;
                return
            }
        },
        decrementProductQuantity: (state, action) => {
            const matchProduct = state.products.find(
                (product) => product._id === action.payload._id
            );

            if (matchProduct) {
                if (matchProduct.orderQuantity > 1) {
                    matchProduct.orderQuantity -= 1;
                }
            };

        },
        clearCart: (state, action) => {
            state.products = state.products.filter(
                (product) => product._id !== action.payload._id
            );
        },

        deliveryAmount: (state, action) => {
            const totalDelivery = state.products.reduce((total, item) => {
                const deliveryPerItem = action.payload === "Dhaka" ? 100 : 120;
                return total + deliveryPerItem * Number(item.orderQuantity);
            }, 0);

            state.deliveryAmount = totalDelivery;
        }




    }
})

export const orderSelector = (state: RootState) => {
    return state.cart.products
}
export const deliveryAmountValue = ((state: RootState) => {
    return state.cart.deliveryAmount
});
export const { addProduct, incrementProductQuantity, decrementProductQuantity, clearCart, deliveryAmount } = cartSlice.actions

export default cartSlice.reducer