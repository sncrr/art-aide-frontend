import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Helper, UserController } from "../controller/Controller";
import { BsCheck2Circle, BsExclamationCircle } from 'react-icons/bs';
import LoadingPage from "./LoadingPage";

const AccountVerification = () => {
  
  let navigate = useNavigate();
  let [result, setResult] = useState();

  useEffect(() => {

    const verifyAccount = async (id) => {
      let res = await UserController.verifyAccount({id: id});
      setResult(res);
    }

    let user = Helper.getCurrentUser();
    if(user) {
      if(user.type === 1) {
        navigate('/admin', {replace: true});
      }
      else {
        navigate('/user', {replace: true});
      }
    }
    else {
      let key = window.location.hash.substring(23);
      if(key) {
        verifyAccount(key);
      }
      else {
        navigate('/', {replace: true});
        return;
      }
    }
  }, [navigate])

  
  if(!result) {
    return <LoadingPage max />
  }

  return(
    <Body>
      <RightContainer>
        <InnerRight>
          <img
            className="m-4 w-32 sm:w-full"
            style={{ maxWidth: "16rem" }}
            alt="Art Aide Logo"
            src={require('../assets/images/logo.png')}
          />

          <img
            className="hidden md:block"
            alt="Welcome"
            src={require('../assets/images/verify.png')}
          />
        </InnerRight>
      </RightContainer>


      <LeftContainer>
        <div className="flex flex-col h-full items-center justify-center" style={{ maxWidth: "30rem" }}>
          {
            result.success ? 
              <BsCheck2Circle size={64} className="text-green-500"/>
            :
              <BsExclamationCircle size={64} className="text-red-500"/>
          }
          <h1 className="text-xl font-bold mt-6 ">
            {
              result.success ? result.success : result.error
            }
          </h1>

          <Link 
              to="/"
              className="text-blue-500 mt-8 underline text-lg"
          >
            Proceed to Login
          </Link>
        </div>
      </LeftContainer>

      <img
        className="block md:hidden"
        alt="Welcome"
        src={require('../assets/images/welcome.jpg')}
      />
    </Body>
  )
}

const Body = styled.div`
  display: flex;

  @media only screen and (max-width: 768px) {
    align-items: center;
    flex-direction: column;
  }
`;

const RightContainer = styled.div`
  display: flex;
  height: 100%;
  position: fixed;
  width: 30rem;

  @media only screen and (max-width: 1024px) {
    width: 20rem;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    position: relative;
  }
`;

const InnerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  margin: 2rem 0;
  padding: 0 2rem;
  border-right: 2px solid #276BD3;
  align-items: center;

  @media only screen and (max-width: 1024px) {
    //border-bottom: 2px solid #276BD3;
  }

  @media only screen and (max-width: 768px) {
    border-bottom: 2px solid #276BD3;
    border-right: none;
    width: 100%;
    margin: 1rem;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  width: 30rem;
  padding: 1rem;
  padding-top: 4rem;
  flex: 1;
  margin-left: 30rem;
  justify-content: center;
  height: 100vh;

  @media only screen and (max-width: 1024px) {
    margin-left: 20rem;
    width: 20rem;
  }


  @media only screen and (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    height: auto;
  }
`;

export default AccountVerification;