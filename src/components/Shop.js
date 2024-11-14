import { useContext, useState } from "react";
import Product from "./Products";
import { CircularProgress } from "@mui/material";

export default function Shop() {

   const {products, loading, error} = useContext(CartContext);

    return (
        <section className="shop">
            <h2>Elegant products for everymore</h2>
            <ul id="products">
                {erro && <p>{error}</p>}
                {!loading && products ? (
                    
                        products.map((product) => (
                            <li key={product.id}>
                                <Product {...product} />
                            </li>
                        ))
                        ) : (
                    <div id="loading">
                        <CircularProgress size="10rem" color="inherit" />
                        <p>Loading products...</p>
                    </div>

                )}

            </ul>
        </section>
    )
}