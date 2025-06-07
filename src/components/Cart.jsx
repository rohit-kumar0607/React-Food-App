import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import Button from "./UI/Button";
import Userprogresscontext from "../store/Userprogresscontext";
import Cartitem from "./Cartitems";
export default function Cart() {
    const crtcontx = useContext(CartContext);
    const userprogressctx=useContext(Userprogresscontext);
    const carttotal=crtcontx.items.reduce(
        (totalprice,item)=>totalprice+item.quantity*item.price,0
    )
    function handleclosecart(){
        userprogressctx.hidecart();
        
    }
    function gotocart(){
        userprogressctx.showcheckout();
    }

    return (
        <Modal className="cart" open={userprogressctx.progress==='cart' } 
        onClose={userprogressctx.progress==='cart'?handleclosecart:null}>
            <h2>Your Cart</h2>
            <ul>
                {crtcontx.items.map(
                    item=><Cartitem 
                    key={item.id} 
                    name={item.name} 
                    quantity={item.quantity} 
                    price={item.price}
                    ondecrease={()=>crtcontx.removeitem(item.id)}
                    onincrease={()=>crtcontx.additem(item)}
                    />
                    )}
            </ul>
            <p className="cart-total">
                {carttotal}
            </p>
            <p className="modal-actions">
                <Button textonly onClick={handleclosecart}>Close</Button>
                {crtcontx.items.length > 0 ? (<Button onClick={gotocart}>Go to checkout</Button>):null}
                
            </p>
        </Modal>
    )

}