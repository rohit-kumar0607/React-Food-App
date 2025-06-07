import { createContext, useState } from "react";
const Userprogresscontext=createContext({
    progress:'',
    showcart:()=>{},
    hidecart:()=>{},
    showcheckout:()=>{},
    hidecheckout:()=>{}
})

export function Userprogresscontextprovider({children}){
    const[userprogress,setuserprogress]=useState('');
    function showcart(){
        setuserprogress('cart')
    }

    function hidecart(){
        setuserprogress('')
    }
    function showcheckout(){
        setuserprogress('checkout')
    }
    function hidecheckout(){
        setuserprogress('')
    }
    const userprogressctx={
        progress:userprogress,
        showcart,
        hidecart,
        showcheckout,
        hidecheckout
    }
    return(<Userprogresscontext.Provider value={userprogressctx}>{children}</Userprogresscontext.Provider>)

}
export default Userprogresscontext;