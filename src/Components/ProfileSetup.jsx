// import React, { useState } from "react";
// import {
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   TextField,
//   Typography,
//   Box,
// } from "@mui/material";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import PersonIcon from "@mui/icons-material/Person";

// function ProfileSetup() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [avatarPreview, setAvatarPreview] = useState(""); // Avatar preview
//   const [coverPreview, setCoverPreview] = useState(""); // Cover image preview
//   const [formData, setFormData] = useState({
//     fullName: "",
//     bio: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({}); // Error state for validation

//   const steps = ["Avatar & Full Name", "Cover & Bio", "Username & Password"];

//   const handleNext = () => {
//     if (!validateStep()) return;

//     if (activeStep === steps.length - 1) {
//       alert("Profile submitted successfully!");
//       console.log("Form Data:", formData);
//       return;
//     }
//     setActiveStep((prev) => prev + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => prev - 1);
//   };

//   const handleFileChange = (e, setPreview) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewURL = URL.createObjectURL(file);
//       setPreview(previewURL);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field
//   };

//   const validateStep = () => {
//     let isValid = true;
//     const newErrors = {};

//     if (activeStep === 0) {
//       if (!formData.fullName.trim()) {
//         newErrors.fullName = "Full Name is required";
//         isValid = false;
//       }
//     } else if (activeStep === 1) {
//       if (!formData.bio.trim()) {
//         newErrors.bio = "Bio is required";
//         isValid = false;
//       }
//     } else if (activeStep === 2) {
//       if (!formData.username.trim()) {
//         newErrors.username = "Username is required";
//         isValid = false;
//       }
//       if (!formData.password) {
//         newErrors.password = "Password is required";
//         isValid = false;
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";
//         isValid = false;
//       }
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
//         margin: "auto",
//         marginTop: "10rem",
//         padding: 4,
//         backgroundColor: "#1e293b",
//         color: "white",
//         borderRadius: 2,
//         boxShadow: 3,
//       }}
//     >
//       <Typography variant="h4" align="center" marginBottom={4}>
//         Profile Setup
//       </Typography>

//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label, index) => (
//           <Step key={index} completed={activeStep > index}>
//             <StepLabel
//               sx={{
//                 "& .MuiStepLabel-label": {
//                   color: activeStep > index ? "green" : "white",
//                 },
//                 "& .MuiStepLabel-iconContainer .MuiStepIcon-root": {
//                   color: activeStep > index ? "green" : "white",
//                 },
//               }}
//             >
//               {label}
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       <Box marginTop={4}>
//         {activeStep === 0 && (
//           <Box>
//             <Box textAlign="center" marginBottom={3}>
//               {/* Avatar Section */}
//               <div className="relative w-32 h-32 mx-auto">
//                 {avatarPreview ? (
//                   <img
//                     src={avatarPreview}
//                     alt="Avatar Preview"
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
//                     <PersonIcon style={{ fontSize: "3rem", color: "gray" }} />
//                   </div>
//                 )}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   id="avatar-input"
//                   className="hidden"
//                   onChange={(e) => handleFileChange(e, setAvatarPreview)}
//                 />
//                 <label
//                   htmlFor="avatar-input"
//                   style={{
//                     position: "absolute",
//                     bottom: 0,
//                     right: 0,
//                     backgroundColor: "#1e88e5",
//                     color: "white",
//                     padding: "8px",
//                     borderRadius: "50%",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <AddAPhotoIcon />
//                 </label>
//               </div>
//             </Box>

//             {/* Full Name */}
//             <TextField
//               label="Full Name"
//               name="fullName"
//               variant="outlined"
//               fullWidth
//               InputProps={{
//                 style: { color: "white" },
//               }}
//               InputLabelProps={{
//                 style: { color: "white" },
//               }}
//               value={formData.fullName}
//               onChange={handleChange}
//               margin="normal"
//               error={!!errors.fullName}
//               helperText={errors.fullName}
//             />
//           </Box>
//         )}

//         {activeStep === 1 && (
//           <Box>
//             {/* Cover Image Section */}
//             <Box textAlign="center" marginBottom={3}>
//               {coverPreview ? (
//                 <img
//                   src={coverPreview}
//                   alt="Cover Preview"
//                   className="w-full h-32 rounded-lg object-cover"
//                 />
//               ) : (
//                 <div
//                   style={{
//                     width: "100%",
//                     height: "8rem",
//                     backgroundColor: "#e0e0e0",
//                     borderRadius: "8px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Typography style={{ color: "gray" }}>
//                     Cover Preview
//                   </Typography>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 id="cover-input"
//                 className="hidden"
//                 onChange={(e) => handleFileChange(e, setCoverPreview)}
//               />
//               <label
//                 htmlFor="cover-input"
//                 style={{
//                   marginTop: "8px",
//                   display: "inline-block",
//                   backgroundColor: "#1e88e5",
//                   color: "white",
//                   padding: "10px 20px",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Add Cover Image
//               </label>
//             </Box>

//             {/* Bio */}
//             <TextField
//               label="Bio"
//               name="bio"
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={3}
//               InputProps={{
//                 style: { color: "white" },
//               }}
//               InputLabelProps={{
//                 style: { color: "white" },
//               }}
//               value={formData.bio}
//               onChange={handleChange}
//               margin="normal"
//               error={!!errors.bio}
//               helperText={errors.bio}
//             />
//           </Box>
//         )}

//         {activeStep === 2 && (
//           <Box>
//             {/* Username */}
//             <TextField
//               label="Username"
//               name="username"
//               variant="outlined"
//               fullWidth
//               InputProps={{
//                 style: { color: "white" },
//               }}
//               InputLabelProps={{
//                 style: { color: "white" },
//               }}
//               value={formData.username}
//               onChange={handleChange}
//               margin="normal"
//               error={!!errors.username}
//               helperText={errors.username}
//             />

//             {/* Password */}
//             <TextField
//               label="Password"
//               name="password"
//               type="password"
//               variant="outlined"
//               fullWidth
//               InputProps={{
//                 style: { color: "white" },
//               }}
//               InputLabelProps={{
//                 style: { color: "white" },
//               }}
//               value={formData.password}
//               onChange={handleChange}
//               margin="normal"
//               error={!!errors.password}
//               helperText={errors.password}
//             />

//             {/* Confirm Password */}
//             <TextField
//               label="Confirm Password"
//               name="confirmPassword"
//               type="password"
//               variant="outlined"
//               fullWidth
//               InputProps={{
//                 style: { color: "white" },
//               }}
//               InputLabelProps={{
//                 style: { color: "white" },
//               }}
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               margin="normal"
//               error={!!errors.confirmPassword}
//               helperText={errors.confirmPassword}
//             />
//           </Box>
//         )}
//       </Box>

//       {/* Buttons */}
//       <Box marginTop={4} display="flex" justifyContent="space-between">
//         <Button
//           disabled={activeStep === 0}
//           onClick={handleBack}
//           variant="contained"
//           color="primary"
//         >
//           Back
//         </Button>
//         <Button onClick={handleNext} variant="contained" color="primary">
//           {activeStep === steps.length - 1 ? "Submit" : "Next"}
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// export default ProfileSetup;
