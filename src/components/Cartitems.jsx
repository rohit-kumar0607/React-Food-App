export default function Cartitem({name,quantity,price,onincrease,ondecrease}){


    return(
        <li className="cart-item">
            <p>
                {name} - {price} × {quantity}
            </p>
            <p className="cart-item-actions">
                <button onClick={ondecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onincrease} >+</button>
            </p>
        </li>
    )
}