import React, { useEffect, useState } from 'react';
import { Routes as Switch, Route, useNavigate } from "react-router-dom";
import ProfileNav from '../components/ProfileNav';
import Profile from './Profile';
import Results from './Results';
import LoadingPage from './LoadingPage';
import { Helper, UserController } from '../controller/Controller';
import UpateProfile from './UpdateProfile';
import ChangePassword from './ChangePassword';
import ChangeProfile from './ChangeProfile';
import styled from "styled-components";
import { RiMenuUnfoldFill } from 'react-icons/ri';
import GenerateQR from './client/GenerateQR';

const User = () => {

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
          if(result.type === 0) {
            setUser(result);
          }
          else {
            navigate("/admin", {replace: true});
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
      <ProfileNav user={user} showMenu={showMenu} setShowMenu={setShowMenu}/>
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
          <Route path='/' element={<Profile  user={user}/>} />
          <Route path='/results' element={<Results user={user} />} />
          <Route path='/update' element={<UpateProfile user={user} />} />
          <Route path='/change_password' element={<ChangePassword user={user} />} />
          <Route path='/change_profile' element={<ChangeProfile user={user} />} />
          <Route path='/qr_code' element={<GenerateQR user={user} />} />
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

export default User;