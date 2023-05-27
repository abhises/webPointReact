import {useState} from "react";

export const useToggle=(initialState = false)=>{
    const [show,setShow]=useState(false);
    const toggle =()=>setShow(!show);


    return [show,toggle,setShow];
}