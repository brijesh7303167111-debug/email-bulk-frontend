import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import Box from '@mui/material/Box';

import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Link from '@mui/material/Link';
import { Box, Typography, IconButton, Divider } from "@mui/material";
import Button from '@mui/material/Button';
import { useEmail } from "../../Context/EmailProvider";
import TextField from '@mui/material/TextField';
import { toast } from "react-toastify";
import api from "../../api/axios";
import axios from "axios";

const LeftSide = () => {
  const {
    recipients,
    addRecipient,
    removeRecipient,
    loading,
    setLoading,
    clearRecipients,
    setCsvFile
  } = useEmail();
  const [fileName, setFileName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !company) {
      toast.error("Both fields email and comapny name  are required.");
      return;
    } 
    
     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!regex.test(email)) {
        toast.error("Invalid email format.");
        return;
      }
    addRecipient(email, company);
    setEmail("");
    setCompany("");
  };
  
 

const handleCSVUpload = async (e) => {
  let file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    setLoading(true);
    const backend = import.meta.env.VITE_BACKEND_URL;
    const res = await axios.post(`${backend}/upload-csv`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const data = res.data;

    if (!data.success) {
      throw new Error(data.message);
    }
  console.log("CSV Upload Response:", data.recipients);
    setCsvFile(data.recipients);
    setFileName(file.name);
    toast.success(`File "${file.name}" uploaded successfully with ${data.totalValid} valid recipients.`);
    file = null;
    
  } catch (err) {
    console.error(err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
    <div className=" " >
        <h2 className="text-xl pl-3   text-[#22446C] font-semibold ">Recipients  
      </h2> 
         <div className="pl-8 pt-2" >
           <Box sx={{ mb: 3 }}>
      
              {/* Buttons Row */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  mb: 1
                }}
              >
              <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                px: 3,
                py: 0.8,
                borderRadius: "8px",
              }}
            >
  {loading
    ? "Uploading..."
    : fileName
      ? <span className="text-green-600">{fileName} Uploaded</span>
      : "Upload CSV File"
  }
  <input
    type="file"
    hidden
    accept=".csv"
    onChange={handleCSVUpload}
  />
</Button>

            </Box>

            {/* Links Row */}
              <Link
                href="https://drive.google.com/file/d/1IX-s7ovsqQu2tfp-uNkCwmaqQbvvd1s3/view?usp=sharing"
                underline="hover"
                sx={{ fontSize: "14px", fontWeight: 500 ,color: "#6b7280" }}
              >
                Download Sample CSV Format  <span className="text-[11px] text-gray-400 pl-1 ">*company name is optional</span> 
      
              </Link>

             
          </Box>
         </div>

         <div className="flex items-center my-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500 font-medium">  OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
         </div>

         <div  className="pl-5 pt-2 ">
               <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }} noValidate autoComplete="off"
              >
              <TextField
                label="HR Email"
                type="email"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                   minWidth: "250px",
                   maxWidth: "600px",
                }}
              />

              <TextField
                label="Company Name"
                value={company}
                  size="small"
                onChange={(e) => setCompany(e.target.value)}
                 sx={{
                   minWidth: "250px",
                   maxWidth: "600px",
                }}
              />
              <div className="flex justify-center" >
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{
                    mt: 1,
                    py: 1.2,
                    fontWeight: 600,
                    minWidth: "150px",
                    maxWidth: "200px",
                    justifyContent: "center",
                    textTransform: "none"
                  }}
                >
                  + Add Email
                </Button>
                </div>
              </Box>
              <Box sx={{ mt: 3 }}>
      
                  {/* Title */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Recipient List
                  </Typography>

                  {/* Scrollable Container */}
                  <Box
                    sx={{
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      minHeight: "120px",
                      maxHeight: "120px",
                      overflowY: "auto",
                      backgroundColor: "#fff"
                    }}
                  >
                    {recipients.length === 0 ? (
                      <Typography
                        sx={{ p: 2, color: "#9ca3af", fontSize: "14px" }}
                      >
                        No recipients added
                      </Typography>
                    ) : (
                      recipients.map((recipient, index) => (
                        <Box key={recipient.id}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              px: 3,
                              py: 0.3
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", color: "#374151" }}
                            >
                              {recipient.email}
                            </Typography>

                            <IconButton
                              size="small"
                              onClick={() => removeRecipient(recipient.id)}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </Box>

                          {index !== recipients.length - 1 && <Divider />}
                        </Box>
                      ))
                    )}
                  </Box>
              </Box>
         </div>
    </div>
    </>
  );
};

export default LeftSide;
