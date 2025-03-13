import React, { useEffect } from 'react';
import "./notify.css"
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from 'react-toastify';

 export function Appa(props){
    const {action} = props
    console.log(action)
    const notify = (action) => {
      toast(action, {
        style: { color: 'green',  background: 'linear-gradient(to right, #e0f7fa, #b2ebf2)', },  // Inline style for text color
      });
    };
  useEffect(()=>{
    notify(action)
  },[action])

  return (
    <div className='notify-container '>

      <ToastContainer style={{color: "greenyellow"}} position="top-center" autoClose={4000}/>
    </div>
  );
}