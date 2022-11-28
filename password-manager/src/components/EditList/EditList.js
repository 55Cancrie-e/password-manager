import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './editlist.scss'
import { editList } from '../../actions/listAction'
const EditList = () => {
  const [show, setShow] = useState(false) // - show the button

  const [nameList, setNameList] = useState('');
  const [passwordList, setPasswordList] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [passValid, setPassValid] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const success = useSelector((state) => state.list.editListSucc)

  useEffect(() => {
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
      dispatch(editList(params.id, nameList, passwordList))
    }
  }  

  return (
    <div className="centered-content">
    <div className="modal-box">
        <h1 className="title">
            Edit a list
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

export default EditList