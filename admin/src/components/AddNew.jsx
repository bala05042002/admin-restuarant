import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { details } from '../Exports.jsx'
import axios from 'axios';

const AddNew = () => {
    const [name, setItemName] = useState("");
    const [price, setItemPrice] = useState(0);
    const [image, setImage] = useState('');
    const [des, setDes] = useState('');
    const [available, setAvailable] = useState(false);
    const [type, setType] = useState('');

    console.log(name, price, image, des, available, type);


    function handleSubmit(e){
        e.preventDefault();

        axios.post('https://admin-backend-jlqm.onrender.com/create', {name, price, image, des, available, type})
        .then(result => {
            console.log(result);
        })
        .catch(err => {console.log(err)});
    }
    
  return (
    <div className='add-new-container'>
        <div className='add-new'>
            <Link to={'/view'}>
                <img src={details.left} alt="" width={"20px"} />
            </Link>
            <h1>ADD ITEMS</h1>
        </div>

        <form onSubmit={handleSubmit}>
            <h3>NEW ITEM</h3>
            <input type="text" placeholder='Enter Item Name' onChange={(e) => setItemName(e.target.value)} />
            <input type="number" placeholder='Enter Item Price' onChange={(e) => setItemPrice(Number(e.target.value))} />
            <input type="text" placeholder='Image URL' onChange={(e) => setImage(e.target.value)} />
            <input type="text" placeholder='Add Des (Optional)' onChange={(e) => setDes(e.target.value)} />
            <div>
                <span>Available : </span>
                <button className='yes' onClick={(e) => {
                    e.preventDefault();
                    setAvailable(true);
                }}>✓</button>
                <button className='no' onClick={(e) => {
                    e.preventDefault();
                    setAvailable(false)
                }}>x</button>
            </div>
            <input type="text" placeholder='Food Type' onChange={(e) => setType(e.target.value)} />
            <p>⚠️ If Food type already exists please type the same Format.</p>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default AddNew
