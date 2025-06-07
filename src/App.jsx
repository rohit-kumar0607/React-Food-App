import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { Userprogresscontextprovider } from "./store/Userprogresscontext";

function App() {
  return (
    <Userprogresscontextprovider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart/>
        <Checkout/>
      </CartContextProvider>
    </Userprogresscontextprovider>
    
  );
}

export default App;
