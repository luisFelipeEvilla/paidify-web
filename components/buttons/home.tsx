import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';


interface HomeProps {
  children: React.ReactNode;
}
// eslint-disable-next-line react-hooks/rules-of-hooks
const navigate = useNavigate();

const navigateHome = () => {
 
  navigate('/');
};
const  Button= (props: HomeProps) => { 
  
  return (
    <button 
    onClick={navigateHome}
      style={{
         backgroundColor: "#22C55E",
         color: "#ffffff",
         height: "52px",
         width:"251px" 
      }}
    >
      {props.children}
    </button>
    
  );
  
}

export default Button;
