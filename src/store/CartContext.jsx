import { createContext, useReducer } from "react";

// Create context with default values
const CartContext = createContext({
    items: [],
    additem: (item) => { },
    removeitem: (id) => { },
    clearcart:()=>{},
    getitemquantity:()=>{}
});

// Reducer function
function CartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingcartitemindex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items];

        if (existingcartitemindex > -1) {
            const existingItem = state.items[existingcartitemindex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingcartitemindex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return {
            ...state,
            items: updatedItems
        };
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingcartitemindex = state.items.findIndex(
            (item) => item.id === action.id
        );

        // Safety check
        if (existingcartitemindex === -1) {
            return state;
        }

        const existingItem = state.items[existingcartitemindex];
        const updatedItems = [...state.items];

        if (existingItem.quantity === 1) {
            updatedItems.splice(existingcartitemindex, 1); // Remove item
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1
            };
            updatedItems[existingcartitemindex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems
        };
    }
if(action.type==='Clear-cart'){
    return{...state,items:[]}
}
    return state;
}

// Context provider
export function CartContextProvider({ children }) {
    const [cart, dispatchaction] = useReducer(CartReducer, { items: [] });

    function additem(item) {
        dispatchaction({ type: 'ADD_ITEM', item });
    }

    function removeitem(id) {
        dispatchaction({ type: 'REMOVE_ITEM', id });
    }
    function clearcart(){
        dispatchaction({type:'Clear-cart'})
    }
    function getitemquantity(id){
        const item=cart.items.find((item)=>item.id===id);
        return item?item.quantity:0;

    }

    const cartContext = {
        items: cart.items,
        additem,
        removeitem,
        clearcart,
        getitemquantity
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
