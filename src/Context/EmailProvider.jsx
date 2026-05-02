import { createContext, useContext, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
const createPayload = ({
  senderEmail,
  subject,
  body,
  recipients,
  source
}) => {
  return {
    sender: {
      email: senderEmail
    },
    emailContent: {
      subject,
      body
    },
    recipients,
    meta: {
      totalRecipients: recipients.length,
      source
    }
  };
};


const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [loading , setLoading] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(false);
  
  

  const addRecipient = (email, company) => {
    if (!email || !company) return;

    setRecipients(prev => [
      ...prev,
      { id: Date.now(), email, company }
    ]);
  };

  const clearRecipients = () => {
    setRecipients([]);
  };

   const removeRecipient = (id) => {
    setRecipients(prev => prev.filter(r => r.id !== id));
  };

  const handleSentEmail =async()=>{
    
    if(recipients.length === 0 && (!csvFile || csvFile.length === 0)){
      toast.error("Please add recipients or upload a CSV file.");
      return;
    }
    if(!sender || !subject || !body){
      toast.error("Please fill in all email details (sender, subject, body).");
      return;
    }

    setLoading(true);
    try{
      const payload = {
      sender,
      subject,
      body,
      recipients,   
      csvFile,
    };
    


    console.log("Payload being sent:", payload);
    const res = await api.post("/send-emails", payload);
    toast.success("Emails status send to your mail");
    console.log(res);
    setBody("");
    setSubject("");
    setSender("");
    clearRecipients();
    setCsvFile(null);
    
    }catch(err){
      console.error("Error sending emails:", err);
      toast.error(`${err.response?.data?.message || "Failed to send emails. Please try again."}`);
    }finally{
      setLoading(false);
    }

  }
  
  
  

  return (
    <EmailContext.Provider
      value={{
        loading,setLoading,
        sender, setSender,
        subject, setSubject,
        body, setBody,
        recipients,
        addRecipient,
        removeRecipient,
        clearRecipients,
        csvFile, setCsvFile,
        handleSentEmail
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => useContext(EmailContext);
