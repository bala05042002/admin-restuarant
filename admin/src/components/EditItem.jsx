import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { details } from '../Exports';

const EditItem = () => {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    console.log(useParams());
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(itemPrice);

    useEffect(() => {
        axios('http://localhost:5000/view/edit/'+id)
        .then(result => {
            console.log(result);
            setItemName(result.data.name);
            setItemPrice(result.data.price);
        })
        .catch(err => console.log(err));
    }, [])

    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put('http://localhost:5000/view/edit/'+id, { price: Number(itemPrice), name:itemName })
        .then(result => {
            console.log(result);
            setItemName(result.data.name);
            setItemPrice(result.data.price);

            navigate('/view')
        })
        .catch(err => console.log(err));
    }

  return (
    <>
        <div className='edit-item'>
            <Link to={'/view'}>
                <img className='edit-back' src={details.left} alt="" width={"20px"} />
            </Link>
            <h1>EDIT ITEM</h1>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="foodname" className='name'>NAME</label>
                    <input type="text" id='foodname' value={itemName} onChange={(e) => setItemName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="foodprice">PRICE</label>
                    <input type="number" id='foodprice' value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                </div>
                <button>Submit</button>
            </form>
        </div>
    </>
  )
}

export default EditItem