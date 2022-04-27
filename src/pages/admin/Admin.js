import React, { useEffect, useState } from 'react';
import { Routes as Switch, Route, useNavigate } from "react-router-dom";
import Profile from '../Profile';
import LoadingPage from '../LoadingPage';
import { Helper, UserController } from '../../controller/Controller';
import styled from "styled-components";
import { RiMenuUnfoldFill } from 'react-icons/ri';
import AdminNav from '../../components/AdminNav';
import Dashboard from './Dashboard';
import AdminPassword from './AdminPassword';
import TestResult from './TestResult';

const Admin = () => {

  let navigate = useNavigate();

  let [loading, setLoading] = useState(true);
  let [user, setUser] = useState(); 

  let [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      let session = Helper.getCurrentUser();
      if(session) {

        let result = await UserController.getUser({id: session.user});
        if(result) {
          if(result.type === 1) {
            setUser(result);
          }
          else {
            navigate("/user", {replace: true});
          }
        }
        else {
          Helper.logout();
          navigate("/", {replace: true});
        }
        setLoading(false);
      }
      else {
        navigate("/", {replace: true});
      }
    }

    getUser();
  }, [navigate])



  if(loading) return <LoadingPage max />

  return (
    <Body>
      <AdminNav user={user} showMenu={showMenu} setShowMenu={setShowMenu}/>
      <MenuIcon>
        <RiMenuUnfoldFill 
          className='cursor-pointer'
          size={32} 
          color="#276BD3"
          onClick={ () => setShowMenu(true)}
        />
      </MenuIcon>
      <Content>
        <Switch>
          <Route path='/' element={<Dashboard  />} />
          <Route path='/change_password' element={<AdminPassword  user={user}/>} />
          <Route path='/test_results' element={<TestResult  user={user}/>} />
        </Switch>
      </Content>
    </Body>
  );

}

const Body = styled.div`
  background-color: #F1F5F9;
  display: flex;
  height: 100%;
  min-height: 100vh;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const MenuIcon = styled.div`
  display: none;

  @media only screen and (max-width: 1024px) {
    display: block;
    margin-left: 2rem;
    margin-top: 1rem;
  }
`;

const Content = styled.div`
  flex: 1;
  margin-left: 16rem;

  @media only screen and (max-width: 1024px) {
    margin-left: 0;
  }
`;

export default Admin;