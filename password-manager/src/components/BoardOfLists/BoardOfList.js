import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './boardoflist.scss'
import { logOutFunc } from '../../actions/loginAction';
import { deleteListById, getLists, getUserInfo } from '../../actions/listAction';
const BoardOfList = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const [hide, setHide] = useState()  
  const [data, setData] = useState();
  const name = useSelector((state) => state.list.user.name);
  const list = useSelector((state) => state.list.lists.list);


  useEffect(() => {
    dispatch(getUserInfo())
    dispatch(getLists())
  }, [list])
    
  const logOut = () => {
    dispatch(logOutFunc());
   return naviagate('/login')
  }

  const deleteList = (id) => {
    dispatch(deleteListById(id))
  }
  return (
<div className="centered-content">
  <div className="task-manager-container">
      <div className="sidebar has-background-white">
        <div className="navBlock">
          <div className="loginNameBlock">
            <h2>Welcome, {name}</h2>
            <button className="button" style={{fontSize: "1rem", marginLeft: "10px"}} onClick={logOut}>
              <span className="iconList">
                <i style={{color: "#000"}} className="fa-solid fa-right-from-bracket"></i>
              </span>
            </button>
          </div>
        </div>
          <h1 className="title">
              Password Manager
          </h1>
          <div style={{ overflowY: 'scroll', height: "75%"}}>

          {list?.map((item, index) => { 
          return (
          <div className="task" key={index}>
                  <div className="task-text">
                    <h3>{item.name}</h3>
                    <div className='passwordBlock'>
                    Password: 
                     <p className={hide === index ? '' : 'security'} style={{marginLeft: '10px'}}>{item.password}</p>
                    <button className='buttonHideBlock' onClick={() => setHide(index)}><i className="fas fa-lock"></i></button>
                    </div>
                    <small>Created: {item.createDate.substring(0,10)}</small>
                  </div>
                  <div className="task-buttons">
                    <Link to={`/edit-list/${item._id}`} className="button" style={{ fontSize: '1rem'}}>
                      <div className="iconList">
                        <i style={{color: "#000"}} className="fas fa-edit"></i>
                      </div>
                    </Link>
                    <button className="button is-danger" style={{marginLeft: "10px", fontSize: '1rem'}} onClick={() => deleteList(item._id)}>
                      <div className="iconList">
                        <i className="fas fa-trash"></i>
                      </div>
                    </button>
                  </div>
          </div>
          )})}
</div>
         
          <Link className="buttonLink is-primary" to='/new-list'>+ New List</Link>
      </div>
  </div>
</div>
  )
}

export default BoardOfList