import { Title } from "@mui/icons-material";
import { createContext, useReducer, useState, userEffect } from "react";

export const CartContext = createContext({
    items: [],
    products: [],
    loading: false,
    errer: "",
    addItemToCart: () => { },
    updateItemQuantity: () => { },
});

export default function cartQuantityProvider({ children }) {

    const { products, setProducs } = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fechProducts() {
            const response = fetch("https://dummyjson.com/products/category/motorcycle?limit=12&select=id,thumbnail,title,price,description");

            if (response.ok) {
                const result = await response.json();
                setProducts(result.products);
            } else {
                setError("fETCH FAILE!");

            }
            setLoading(false);
        }

        fechProducts();

    }, []);

    //SHOPPING CART

    function cartReducer(state, action) {
        if (action.type === "ADD_ITEM") {
            const updatedItems = [...state.items];

            const existingCartItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payloud.id
            );
            const existingCartItem = updatedItems[existingCartItemIndex];

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                }
                updatedItems[existingCartItem] = updatedItem;
            } else {
                const product = action.payloud.products.find(
                    (product) => product.id = action.payload.id
                );
                updatedItems.push({
                    id: action.payload.id,
                    thumbnail: product.thumbnail,
                    title: product.id,
                    price: product.price,
                    quantity: 1,
                })
            }

            return { items: updatedItems };
        }

        if (action.type === "UPDATE_ITEM") {
            const updatedItems = [...state.items];
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.id
            );

            const updatedItem = { ...updatedItems[updatedItemIndex] };

            updatedItem.quantity += action.payload.amount;

            if (updatedItem.quantity < 1) {
                updatedItems.splice(updatedItemIndex, 1);

            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }

            return { ...state, items: updatedItems };
        }

        return state;
    }

    const { cartState, cartDispatch } = useReducer(
        cartReducer,
        { items: [] }
    );

    function handleAddItemToCart(id) {
        cartDispatch({
            type: "ADD_ITEM",
            payload: { id, products }
        });
    }

    function handleUpdateItemQuantity(id, amount) {
        cartDispatch({
            type: "UPDATE_ITEM",
            payload: { id, amount }
        });

    }

    const ctx = {
        items: cartState.items,
        products: products,
        loading: loading,
        error: error,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateItemQuantity
    }
    
    return <CartContext.Provider value={ctx}>
        {children}
    </CartContext.Provider>
}