import { useContext } from "react"
import { CartContext } from "./context/CartContext"

export default function Product({
    id,
    thumbnail,
    title,
    price,
    description
}) {
    const { addItemToCart} = useContext(CartContext);


return (
    <article className="products">
        <img src={thumbnail} alt={title} />
        <div className="product-content">
        
        <div>
            <h3>{title}</h3>
            <p className="product-price">$ {price}</p>
            <p>{description}</p>

        </div>
        <p className="product-actions">
            <button onClick={() => addItemToCart(id)}>Add to cart</button>
        </p>
        </div>
      </article>
    )
}