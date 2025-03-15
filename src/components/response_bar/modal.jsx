// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import './modal.css';
// import ImageComponent from '../ImageComponent/image';
// import { assets } from '../../assets/assets';
// import { photo } from '../interface/setting';

// function FormModal({ name }) {
//   const [displayModal, setDisplayModal] = useState(true);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [rating, setRating] = useState(0);

//   const modalDisplay = () => {
//     setDisplayModal(false);
//   };

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   const handleStarClick = (star) => {
//     setRating(star);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (selectedOption && rating > 0) {
//       modalDisplay();
//     } else {
//       alert('Please select an option and provide a rating before submitting.');
//     }
//   };

//   return (
//     <div className="modal-container modal show">
//       {displayModal && (
//         <Modal.Dialog>
//           <Modal.Header closeButton>
//             <Modal.Title>
//               <span className="modal-title-highlight">Hello, {name}!</span>
//             </Modal.Title>
//           </Modal.Header>

//           <Modal.Body>
//             <Form className="form-container" onSubmit={handleSubmit}>
//               <div  className="user-icon">
//                 <ImageComponent  src={photo && photo.length > 0 ? photo[photo.length - 1] : assets.user_icon}  />
//               </div>

//               <Form.Group className="mb-3">
//                 <Form.Label className="custom-label">
//                   How would you rate our service?
//                 </Form.Label>
//                 <div className="radio-options">
//                   <Form.Check
//                     type="radio"
//                     label="Good"
//                     name="pollOptions"
//                     value="Good"
//                     onChange={handleOptionChange}
//                   />
//                   <Form.Check
//                     type="radio"
//                     label="Excellent"
//                     name="pollOptions"
//                     value="Excellent"
//                     onChange={handleOptionChange}
//                   />
//                   <Form.Check
//                     type="radio"
//                     label="Poor"
//                     name="pollOptions"
//                     value="Poor"
//                     onChange={handleOptionChange}
//                   />
//                 </div>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="custom-label">Rate Us:</Form.Label>
//                 <div className="rating-stars">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <span
//                       key={star}
//                       className={`star ${star <= rating ? 'selected' : ''}`}
//                       onClick={() => handleStarClick(star)}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>
//               </Form.Group>
//             </Form>
//           </Modal.Body>

//           <Modal.Footer>
//             <Button variant="secondary" onClick={modalDisplay} className="custom-button">
//               Cancel
//             </Button>
//             <Button variant="primary" type="submit" onClick={handleSubmit} className="custom-button">
//               Submit
//             </Button>
//           </Modal.Footer>
//         </Modal.Dialog>
//       )}
//     </div>
//   );
// }

// export default FormModal;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Typography, Button, Card } from '@mui/material';
import "./modal.css";

function LogoutModal({setUserModalBody}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Delay state update to avoid rendering issues
    const timer = setTimeout(() => {
      setOpen(true);
    }, 0);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const handleClose = () => setOpen(false);
  const handleLogout = () => {
    localStorage.removeItem('token');  
    navigate('/');  
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="logout-modal">
      <Box sx={modalStyle}>
        <Card sx={cardStyle}>
          <Typography variant="h6" fontWeight="bold">
            Are you sure you want to logout?
          </Typography>
          <Box mt={2} display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth 
              onClick={()=>setUserModalBody(prev => !prev)}
            >
              Stay In
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              fullWidth 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Card>
      </Box>
    </Modal>
  );
}

// 🔹 Responsive Styles
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: { xs: 2, sm: 3 },
  width: { xs: '90%', sm: '60%', md: '400px' },
};

const cardStyle = {
  p: 3, 
  textAlign: 'center', 
  boxShadow: 3, 
  width: "100%", 
  maxWidth: "400px",
};

export default LogoutModal;
