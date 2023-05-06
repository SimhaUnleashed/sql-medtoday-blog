import React,{useState} from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useRef} from 'react';
import { FaAngleDown } from 'react-icons/fa';
import app from "../context/axiosConfig";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const data = [{id: 499, label: "Basic Pack (Rs 499)", sublabel:"Contains 11 tests"}, {id: 599, label: "Premium Pack (Rs 599)", sublabel:"Contains 15 tests"}, {id: 899, label: "Gold Pack (Rs 899)", sublabel:"Contains 21 tests"}, {id:1199, label: "Platinum Pack (Rs 1199)", sublabel:"Contains 30 tests"}];


const BloodTestForm=()=>{ 
	const [Name,setName]=useState(""); 
	const [Age,setAge]=useState(""); 
    const [BloodGroup,setBloodGroup]=useState(""); 
    const [address,setAddress]=useState(""); 
    const ref = useRef(null);

	const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const toggleDropdown = () => setOpen(!isOpen);
  const [show, setShow] = useState(false);

  const handleClose = () => navigate("/");
  const handleShow = () => setShow(true);
  
  const handleItemClick = (id) => {
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
	console.log(id)
  }
	
	const handleTestSubmit=async(e)=>{
      e.preventDefault()
	  try {
		
		  await app.post(`/posts/bloodtests`, {
			  Name,
			  Age,
			  BloodGroup,
			  address,
			  selectedItem
			  
			});
		setShow(true);
	  } catch (err) {
		console.log(err);
	  }
        
	}

    const handleTextarea = event => {
        
        setAddress(event.target.value);
        // console.log(event.target.value);
      };
	return(
	<div className='form'>
		<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Blood Test has been booked successfully</Modal.Body>
        <Modal.Footer>
          
          <Button variant="success" onClick={handleClose}>
            Go to Home
          </Button>
        </Modal.Footer>
      </Modal>
		<form > 
			<div > 
				<label htmlFor="Name">Name:</label>
				<input type="text" name="Name" id="Name" value={Name} onChange={(e)=>setName(e.target.value)}/> 
			</div> 
			<div > 
				<label htmlFor="Age">Age:</label>
			<input type="text" name="Age" id="Age" value={Age} onChange={(e)=>setAge(e.target.value)}/> 
			</div>  
            <div > 
				<label htmlFor="BloodGroup">Blood Group:</label>
			<input type="text" name="BloodGroup" id="BloodGroup" value={BloodGroup} onChange={(e)=>setBloodGroup(e.target.value)}/> 
			</div>  
            <div className='addressfield'> 
				<label htmlFor="Address">Address: </label>
                <textarea  className='area' name="Address" id="Address" value={address}
    onChange={handleTextarea}/>
	
	<div className='dropdown-header' onClick={toggleDropdown}>
        {selectedItem ? items.find(item => item.id == selectedItem).label : "Select your package"}
		<FaAngleDown/>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        {items.map(item => (
          <div className="dropdown-item" onClick={e => handleItemClick(e.target.id)} id={item.id} key={item.id}>
            <span className={`dropdown-item-dot ${item.id === selectedItem && 'selected'}`}>• </span>
            {item.label}
            <br/>
            {item.sublabel}
          </div>
        ))}
      </div>
                
                {/* <TextareaAutosize className='area'
    minRows={3}
    maxRows={6}
    value={Address}
    onChange={(e)=> setAddress(e.target.value)}
    /> */}
			</div>  
            
             
			<button className='greenbtn' type="submit" onClick={handleTestSubmit}>Confirm Blood Test</button>
		</form>

		
	</div>
)} 

export default BloodTestForm;