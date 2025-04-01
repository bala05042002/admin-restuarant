import React, { useEffect, useState } from 'react'
import { details } from './Exports'
import './App.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios('https://admin-backend-jlqm.onrender.com')
        .then(result => {
            setOrders(result.data);
        })
        .catch(err => console.log(err));
    }, []);

    orders.forEach(e => console.log(e.table));

    function handleClear(id){
        axios.post('https://admin-backend-jlqm.onrender.com/'+id)
        .then(result => {
            console.log(result);
            location.reload();
        })
        .catch(err => console.log(err));
    }

    function handlePaid(id){
        axios.put('https://admin-backend-jlqm.onrender.com/'+id, { paid: true })
        .then(result => {
            console.log(result);
            location.reload();
        })
        .catch(err => console.log(err));
    }

    const orderEl = orders.map((e, index) => (
        <div className='order-details' key={index}>
            <h1 className='order-h1'>
                <img src={details.table} alt="" width={"25px"} style={{marginRight: "10px"}} />
                Table No : <span>{e.table}</span>
            </h1>
            <h3>
                <img src={details.item} alt="" width={"20px"} style={{marginRight: "10px"}} />
                Items : {e.details.selected.length}
            </h3>
            <ul>
                {e.details.selected.length < 1 ? <p>No Items ☹️</p> :
                e.details.selected.map((ele, index) => (
                    <li key={index}>{ele}</li>
                ))}
            </ul>
            <h3>
                <img src={details.money} alt="" width={"20px"} style={{marginRight: "10px"}} />
                Total Amount : <span style={{color:"green"}}>₹{e.details.total}</span>
            </h3>
            <h3>
                <img src={details.payment} alt="" width={"20px"} style={{marginRight: "10px"}} />
                Payment Method : <span style={{color: "orange"}}>{e.details.method} 🧑‍💻</span>
            </h3>
            <h3 className='payment-status'>
                <img src={details.status} alt="" width={"20px"} style={{marginRight: "10px"}} />
                Payment Status : 
                <span className={e.details.paid ? 'paid' : 'not-paid'}>
                    {e.details.paid ? " PAID ✓" : " NOT PAID X"}
                </span>
            </h3>
            <div className='paid-buttons'>
                <button className='clear' onClick={() => handleClear(e._id)}>CLEAR ITEMS X</button>
                <button className='paid' onClick={() => handlePaid(e._id)}>PAID ✓</button>
            </div>
            <hr />
        </div>
    ))

  return (
    <main>
        <div className='main-header'>
            <Link to={"/view"}>
                <img src={details.view} alt="" width={"20px"} />
            </Link>
            <h1>Malathi Restuarant</h1>
            <img src={details.refresh} alt="" width={"25px"} onClick={() => {
                location.reload();
            }} />
        </div>
        <h1 className='order-header'>Current Orders</h1>

        {orderEl}
    </main>
  )
}

export default Home
