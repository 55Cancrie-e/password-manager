import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../actions/loginAction'
import './login.scss'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.login.error);
  const successUser = useSelector((state) => state.login.loginSuccess);


  useEffect(() => {
    if(successUser){
      navigate('/lists')
    }
  }, [navigate, successUser, error])
  
  const onSubmit = (e) => {
    e.preventDefault();
    if(!email.toLocaleLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
       setValidateEmail(true)
    }
    if(password.split('').length < 3){
       setValidatePassword(true)
    } else {
      dispatch(userLogin(email, password))  
    }
  }

  return (
    <div className="centered-content">
    <div className="white-box">
        <h1 className="title">Login</h1>
    <div className="field">
        <p className="control">
          <input className='inputLogin' placeholder="Email" style={{fontSize: "1.25rem"}} onChange={(e) => setEmail(e.target.value)}/>
          <span className="icon">
            <i className="fas fa-envelope"></i>
          </span>
        </p>
        { validateEmail === true ? <span style={{color: "red", fontSize: '12px'}}>* Email required</span> : null}
      </div>
      <div className="field">
        <p className="control">
          <input className='inputLogin' type='password' placeholder="Password" style={{fontSize: "1.25rem"}} onChange={e => setPassword(e.target.value)}/>
          <span className="icon">
            <i className="fas fa-lock"></i>
          </span>
        </p>
        { validatePassword === true ? <span style={{color: "red", fontSize: '12px'}}>*Password is required</span>: null}
      </div>
      {error !== '' ? <small style={{color: "red", fontSize: '12px'}}>Invalid Email or Password. Please try again!</small> : null}
      <div className="field" style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p className="control">
          <button className="button is-success" style={{fontSize: "1.25rem"}} onClick={onSubmit}>
            Login
          </button>
        </p>
      </div>
      <br/>
      <p className="text-grey">Not got an account?<Link to="/signup"> Sign up </Link>now!</p>
    </div>
</div>
  )
}

export default Login