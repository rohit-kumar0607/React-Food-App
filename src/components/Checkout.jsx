import { useContext } from "react";
import { useActionState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Userprogresscontext from "../store/Userprogresscontext";
import useHttp from "./hooks/usehttp";
import Error from "./Error";
const reqconfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};
export default function Checkout() {

    const crtcontx = useContext(CartContext);
    const usercntx = useContext(Userprogresscontext);

    const { data, error, sendRequest,cleardata } = useHttp('http://localhost:3000/orders', reqconfig)
    const carttotal = crtcontx.items.reduce(
        (totalprice, item) => totalprice + item.quantity * item.price, 0
    )

    function handleclose() {
        usercntx.hidecheckout();
    }
    function handleFinish(){
        usercntx.hidecheckout();
        crtcontx.clearcart();
        cleardata();
    }

    async function checkoutaction(prevstate,fd) {
        
        const customerdata = Object.fromEntries(fd.entries());
        await sendRequest(

            JSON.stringify({
                order: {
                    items: crtcontx.items,
                    customer: customerdata
                }

            })



        );
        // fetch("http://localhost:3000/orders", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         order: {
        //             items: crtcontx.items,
        //             customer: customerdata
        //         }

        //     })
        // })
        
    }

    const [formstate,formAction,issending]=useActionState(checkoutaction,null)
    let actions = (
        <>
            <Button type="button" textonly onClick={handleclose}>Close</Button>
            <Button >Submit Order</Button>
        </>
    );
    if (issending) {
        actions = <span>sending order data...</span>
    }

    if(data&&!error){
        return <Modal open={usercntx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Sucess!!</h2>
            <p>Your order was submitted successfuly</p>
            <p>soon, we will assign you a delivery partner!!</p>
            <p>We will get back to you with more details via email</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>okay!</Button>
            </p>

        </Modal>
    }
    return <Modal open={usercntx.progress === 'checkout'} onClose={handleclose}>
        <form action={formAction} >
            <h2>Checkout</h2>
            <p>Total amount:{carttotal}</p>

            <Input label="Full name" type="text" id="name" />
            <Input label="email-address" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="City" type="text" id="city" />
            </div>
            {error&&<Error message={message} title="failed to submit order"/>}
            <p className="modal-actions">{actions}</p>
        </form>
    </Modal>
}