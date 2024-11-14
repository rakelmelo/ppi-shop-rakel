import { Link } from "react-router-dom";

export default function checkout() {
    return (
        <section className="checkout">
            <h2>Checkout</h2>
<Link to="/" className="product-actions">
<button>RETURN</button>
</Link>
        </section>
    );
}