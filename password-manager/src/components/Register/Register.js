import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { userRegister } from '../../actions/loginAction';
import './register.scss'
const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [validateEmail, setValidateEmail] = useState(false);
  const [validateName, setValidateName] = useState(false);
  const [validatePass, setValidatePass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.login.registerError)
  const successReg = useSelector((state => state.login.registerSuccess))


  useEffect(() => {
    if(successReg){
      navigate('/login')
    }
  }, [successReg, navigate, error])

  const onSubmit = (e) => {
    e.preventDefault();
    if(!email.toLocaleLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
      setValidateEmail(true)
   }
   if(name.split('').length < 3){
      setValidateName(true)
   }
   if(password.split('').length < 3){
      setValidatePass(true)
   } else {
      dispatch(userRegister(email, name, password))
   }
  }

  return (
    <div className="centered-content">
    <div className="white-box">
        <h1 className="title">Sign up</h1>
    <div className="field">
        <p className="control">
          <input  className="inputLogin" type="email" placeholder="Email" style={{ fontSize: '1.25rem'}} onChange={(e) => setEmail(e.target.value)}/>
          <span className="icon">
            <i className="fas fa-envelope"></i>
          </span>
        </p>
        {validateEmail ? <span style={{color: "red"}}>*Email is required</span> : null}
      </div>
    <div className="field">
        <p className="control">
          <input className="inputLogin" type="name" placeholder="Name" style={{ fontSize: '1.25rem'}} onChange={(e) => setName(e.target.value)}/>
          <span className="icon">
            <i className="fa-solid fa-user"></i>
          </span>
        </p>
        {validateName ? <span style={{color: "red"}}>*Username is required</span> : null}
      </div>
      <div className="field">
        <p className="control has-icons-left">
          <input className="inputLogin" type="password" placeholder="Password"  style={{ fontSize: '1.25rem'}} onChange ={e => setPassword(e.target.value)}/>
          <span className="icon">
            <i className="fas fa-lock"></i>
          </span>
        </p>
        {validatePass ? <span style={{color: "red"}}>*Password is required</span> : null}
      </div>
            {error !== '' ? <small style={{color: "red", fontSize: '12px'}}>Invalid Email or Password. Please try again!</small> : null}
      <div className="field" style={{display: "flex", justifyContent: "flex-end"}}>
        <p className="control">
          <button className="button is-success" style={{ fontSize: '1.25rem'}} onClick={onSubmit}>
            Sign up
          </button>
        </p>
      </div>
      <br/>
      <p className="text-grey">Already got an account?<Link to="/login"> Login </Link>now!</p>
    </div>
</div>
  )
}

export default Register