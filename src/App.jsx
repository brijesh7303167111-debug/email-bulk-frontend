import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import Header from "./components/Header";
import LeftSide from "./components/leftContanier/leftside";
import RightSide from "./components/rightContanier/RightSide";
import { useEmail  } from "./Context/EmailProvider";

function App() {
  const { handleSentEmail ,loading } = useEmail();
  return (
    <>
      <div className="p-5 h-full w-full bg-[#DEE8F6] ">
        <div className="h-full w-full bg-[#F0F5FE] shadow-lg shadow-white/50">
      
       
            <Header />
          

        <div className="flex flex-col md:flex-row  p-4 md:p-2" >
           <div className="flex-1   "><LeftSide /></div>
            <div className="flex-1  "><RightSide /></div>
         </div>

       <div className="flex justify-center p-2" >
            <Button onClick={handleSentEmail} variant="contained" disableElevation disabled={loading}> 
             {loading ? "sending..." : "Send Emails"} 
            </Button>
       </div>  
        </div>
      </div>
    </>
  );
}

export default App;
