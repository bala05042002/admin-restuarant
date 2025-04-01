import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { details } from '../Exports.jsx';
import { Link, useNavigate } from 'react-router-dom';

const AddItems = () => {
  const [items, setItems] = useState([]);
  const [toggleActive, setToggleActive] = useState([]);
  const navigate = useNavigate();

  function handleToggle(index, id, available){
    setToggleActive(prev => [...prev, index]);

    axios.put('https://admin-backend-jlqm.onrender.com/view/'+id, { avail: available ? false : true })
    .then(result => {
      console.log(result);
      navigate('https://admin-backend-jlqm.onrender.com/view/');
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get('https://admin-backend-jlqm.onrender.com/view')
    .then(result => {
      console.log(result);
      setItems(result.data);
    }).catch(err => console.log(err));
  }, []);

  const itemEl = items.map((ele, index) => {
    return (
      <li key={ele._id} className='each-item'>
        <p className='ele-name'>{ele.name}</p>
        <Link to={'/view/edit/'+ele._id}>
          <p>₹ {ele.price}</p>
        </Link>
        <div onClick={() => {
          handleToggle(index, ele._id, ele.available);
        }} className={ele.available ? 'toggle toggle-available' : 'toggle toggle-not-available'}>
          <div className={ele.available ? 'round available' : 'round not-available'}></div>
        </div>
      </li>
    )
  })

  return (
    <section className='item-list'>
      <div className='itemlist-header'>
        <Link to={'/'}>
          <img src={details.left} alt="" width={"20px"} />
        </Link>
        <h1>ALL ITEMS</h1>
        <Link to={'/add'}>
          <img src={details.plus} alt="" width={"20px"} />
        </Link>
      </div>
      <ul>
        <li className='each-item'>
          <p style={{fontWeight: "600", width:"40%"}}>ITEM NAME</p>
          <p style={{fontWeight:"600"}}>ITEM PRICE</p>
          <div>
            <p style={{fontWeight: "600"}}>AVAILABLE</p>
          </div>
        </li>
        {itemEl}
      </ul>
    </section>
  )
}

export default AddItems
