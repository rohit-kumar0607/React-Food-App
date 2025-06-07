import { use, useCallback, useEffect } from "react";
import { useState } from "react";

async function sendhttprequest(url, config) {
    const response = await fetch(url, config);
    const redata = await response.json();
    if (!response.ok) {
        throw new Error(
            redata.message || 'something went wrong ,failed to send request'
        );
        
    }
    return redata
}
export default function useHttp(url,config,initialdata) {
    const[data,setdata]=useState(initialdata);
    const[isloading,setisloading]=useState(false);
    const[error,seterror]=useState();

function cleardata(){
    setdata(initialdata);
}

    const sendRequest=useCallback(async function sendRequest(data) {
        setisloading(true);
        try {
            const redata = await sendhttprequest(url,{...config,body:data})
            setdata(redata);
        } catch (error){
            seterror(error.message||'Something went wrong!!')

        }
        setisloading(false)
        
    },[url,config])

    useEffect(()=>{
        if(config&&(config.method==='GET'||!config.method)||!config){
            sendRequest();

        }
    },[sendRequest,config])
return{
    data,
    isloading,
    error,sendRequest,cleardata
}
}