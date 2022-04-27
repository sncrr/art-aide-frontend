import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {ImGoogle, ImFacebook} from "react-icons/im";
import { AuthController, Helper, UserController } from "../controller/Controller";
import { clearLoading, showLoadingMessage } from "../components/MessageBox";
import { useGoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

const GOOGLE_CLIENT_ID = "914970345162-iqffgrbbm2mcjhj418c01g4606s51l67.apps.googleusercontent.com";

const Welcome = () => {
  
  let navigate = useNavigate();
  let [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getUser = async () => {
      let session = Helper.getCurrentUser();
      if(session) {
        if(session.type === 1) {
          navigate("/admin", {replace: true});
        }
        else {
          navigate("/user", {replace: true});
        }
      }
    }

    getUser();
  }, [navigate])

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    showLoadingMessage({content: ''});

    let email = e.target.email.value;
    let password = e.target.password.value;

    let result = await UserController.login({email: email, password: password});

    if(result.success) {
      Helper.setCurrentUser(result);
      if(result.type === 1) {
        navigate("/admin", {replace: true});
      }
      else {
        navigate("/user", {replace: true});
      }
    }
    else {
      setErrorMsg(result.error);
    }

    clearLoading();
  }
  
  const handleSignWithGoogle = async (e) => {
    let result = await AuthController.signWithGoogle({
      google_id: e.googleId
    });
    
    if(result.details === "Registered") {
      Helper.setCurrentUser(result);
      navigate("/user", {replace: true});
    }
    else if(result.details === "Not verified"){
      setErrorMsg("Your account is not verified. Please verify it using the link that we sent to your email.");
    }
    else {
      navigate('/account_completion', {
        state: {
          type: "google",
          profile: e.profileObj
        }
      })
    }
  }

  const { signIn } = useGoogleLogin({
    autoLoad: false,
    onSuccess : handleSignWithGoogle,
    onFailure: e => console.log("Failure", e),
    clientId: GOOGLE_CLIENT_ID,
    cookiePolicy: 'single_host_origin'
  });

  const responseFacebook = async (response) => {

    if(response.id) {
      let result = await AuthController.signWithFacebook({
        facebook_id: response.id
      });

      if(result.details === "Registered") {
        Helper.setCurrentUser(result);
        navigate("/user", {replace: true});
      }
      else if(result.details === "Not verified"){
        setErrorMsg("Your account is not verified. Please verify it using the link that we sent to your email.");
      }
      else {
        let name = response.name.split(" ");
        navigate('/account_completion', {
          state: {
            type: "facebook",
            profile: {
              familyName: name.length > 1 ? name[1] : '',
              givenName: name.length > 0 ? name[0] : '',
              facebookId: response.id,
              email: response.email
            }
          }
        })
      }
    }
    
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
            src={require('../assets/images/welcome.jpg')}
          />
        </InnerRight>
      </RightContainer>


      <LeftContainer>
        <div style={{ maxWidth: "30rem" }}>
          <h1 className="text-xl font-bold mb-6">Log in</h1>
          <h2 className="text-sm mb-6" style={{ color: "#5B5675" }}>
          Integrated assessment and management system of Antigen Rapide Test (ART) self-test for CoVID-19
          </h2>
          <div className="flex flex-col items-center">
            <FacebookButton>
              <ImFacebook 
                className="text-blue-500 text-xl absolute mr-32"
              />
              {
                Helper.getCurrentUser() ? null : (
                  <FacebookLogin
                    appId="507378701044834"
                    textButton="Sign with Facebook"
                    autoLoad={false}
                    fields="name,email"
                    scope="public_profile,user_friends"
                    callback={responseFacebook}
                    containerStyle={{ width: "100%", display: "flex" }}
                    buttonStyle={{ width: "100%", display: "flex", paddingLeft: "1rem" }}
                    cssClass='flex h-full items-center justify-center'
                  />
                )
              }
            </FacebookButton>
            <Button onClick={signIn}>
              <ImGoogle
                className="text-red-500 mr-2 text-xl"
              />
              Sign with Google
            </Button>
          </div>
          <div className="flex items-center my-4">
            <BreakLine />
            <span className="mx-8 text-sm" style={{ color: "#E1DFEC" }}>or</span>
            <BreakLine />
          </div>
          
          <Form onSubmit={handleSubmit}>
            {errorMsg ? <h2 className="text-red-500 text-center">{errorMsg}</h2> : null}
            <div className="flex flex-col">
              <Label>Email</Label>
              <Input 
                type="text" 
                name="email" 
                placeholder="mail@website.com"
                required 
              />
            </div>

            <div className="flex flex-col">
              <Label>Password</Label>
              <Input 
                type="password" 
                name="password" 
                minLength={8}
                maxLength={16}
                placeholder="Min. 8 characters"
                required 
              />
            </div>
            <div className="flex justify-end mb-8">
              <Link 
                to="/"
                className="text-blue-500 font-semibold"
              >
                Forgot Password?
              </Link>
            </div>
            <Button 
              type="submit"
              className="bg-blue-600 text-white font-semibold"
            >
              LOG IN
            </Button>
          </Form>

          <p className="mt-8 font-semibold text-sm">
            Not registered yet? 
            <Link 
              to="/register"
              className="text-blue-500"
            > Create an Account</Link>
          </p>
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

  @media only screen and (max-width: 1024px) {
    margin-left: 20rem;
    width: 20rem;
  }


  @media only screen and (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;


const Form = styled.form`
  margin-top: 1rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  border: 1px solid #E1DFEC;
  height: 2.5rem;
  border-radius: 2.5rem;
  padding: 0 1rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  outline: none;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0.25rem 0;
  border: 1px solid #E1DFEC;
  border-radius: 2rem;
  height: 2.5rem;
`;

const FacebookButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0.25rem 0;
  border: 1px solid #E1DFEC;
  border-radius: 2rem;
  height: 2.5rem;
`;

const BreakLine = styled.div`
  height: 1px;
  flex: 1;
  background-color: #E1DFEC;
`;

export default Welcome;