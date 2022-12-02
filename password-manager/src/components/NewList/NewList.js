import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { newList, newListRequest } from '../../actions/listAction'

import './newlist.scss'
const NewList = () => {
  const [show, setShow] = useState(false) // - show the button

  const [nameList, setNameList] = useState('');
  const [passwordList, setPasswordList] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [passValid, setPassValid] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const success = useSelector((state) => state.list.newListSucc)

  useEffect(() => {
    dispatch(newListRequest())
    if(success) {
      navigate('/lists')
    }
  }, [success, navigate])

  const onSubmit = (e) => {
    e.preventDefault();
    if(nameList === ''){
      setNameValid(true)
    }
    if(passwordList === ''){
      setPassValid(true)
    } else {
      dispatch(newList(nameList, passwordList))
    }
  }  
  return (
    <div className="centered-content">
    <div className="modal-box">
        <h1 className="title">
            Create a new list
        </h1>

        <input type="text" className='input' placeholder="Enter list name...." onChange={(e) => setNameList(e.target.value)}/>
        {nameValid ? <span style={{color: "red", fontSize: "12px"}}>*Name is required</span> : null}
        <div className='buttonIn'>
        <input className="inputWithButton" type={show ? "text" : "password"} placeholder="Enter password...." style={{ marginTop: "20px"}}
          onChange={(e) => setPasswordList(e.target.value)}
        />
        <button className='buttonHide' onClick={() => setShow(!show)}><i className="fas fa-lock"></i></button>
        </div>
        {passValid ? <span style={{color: "red", fontSize: "12px"}}>*Password is required</span> : null}
        <div className="buttons">
            <button className="button" onClick={() => navigate('/lists')}>Cancel</button>
            <button className="button is-primary" onClick={onSubmit}>Create</button>
        </div>
    </div>
</div>
  )
}

export default NewList