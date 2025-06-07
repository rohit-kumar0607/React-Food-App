import { useContext } from 'react';
import logoimg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import Userprogresscontext from '../store/Userprogresscontext';
export default function Header() {
    const userprogressctx = useContext(Userprogresscontext)
    const crtctx = useContext(CartContext)
    const totalcartitems = crtctx.items.reduce((totalnoofitems, item) => {
        return totalnoofitems + item.quantity;
    }, 0)

    function handleshowcart() {
        userprogressctx.showcart();
    }
    return (<header id='main-header'>

        <div id="title">
            <img src={logoimg} alt="logopic" />
            <h1 >World Tadka</h1>
        </div>
        <nav>
            <Button textonly={true} onClick={handleshowcart}>🛒 Cart [{totalcartitems}]</Button>
        </nav>

    </header>
    )
}