import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { useContext } from "react";
const API_URL = "https://react-food-app-3avz.onrender.com";



export default function Mealitem({meal}){
<img src={`${API_URL}/${meal.image}`} alt={meal.name} />
    const crtcntx=useContext(CartContext);
    const quantity=crtcntx.getitemquantity(meal.id);

    function handleaddbutton(){
        crtcntx.additem(meal)

    }

    function tohandleincrement(){
        crtcntx.additem(meal);
    }
    function tohandledecrement(){
        crtcntx.removeitem(meal.id);
    }
    return(<li className="meal-item">
        <article>
            <img src={`${API_URL}/${meal.image}`} alt={meal.name} />
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">₹{meal.price}</p>
                <p className="meal-item-decription">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
                {quantity === 0 ? (<Button onClick={() => handleaddbutton()}>Add to Cart</Button>)
                    : <div className="meal-item-but">
                        <button onClick={tohandledecrement}>-</button>
                        <span>{quantity}</span>
                        <button onClick={tohandleincrement}>+</button>
                    </div>
                }
                
            </p>
        </article>
    </li>)
}