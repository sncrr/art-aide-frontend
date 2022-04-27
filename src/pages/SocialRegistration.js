import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthController, Helper } from "../controller/Controller";
import { BiImageAdd } from 'react-icons/bi';
import { clearLoading, showErrorMessage, showLoadingMessage, showSuccessMessage } from "../components/MessageBox";
import LoadingPage from "./LoadingPage";

const SocialRegistration = () => {

  let navigate = useNavigate();
  let location = useLocation();
  
  let [loading, setLoading] = useState(true);
  let [countries, setCountries] = useState([]);
  let [states, setStates] = useState([]);
  let [cities, setCities] = useState([]);

  let [country, setCountry] = useState('');
  let [state, setState] = useState('');
  let [city, setCity] = useState('');

  let [preview, setPreview] = useState();

  useEffect(() => {
    if(location.state && location.state.type && (location.state.type === 'google' || location.state.type === 'facebook') && location.state.profile) {
      setLoading(false)
    }
    else {
      navigate('/')
    }
  }, [location, navigate])

  useEffect(() => {

    const getUser = async () => {
      let session = Helper.getCurrentUser();
      if(session) {
        if(session.type) {
          navigate("/admin", {replace: true});
        }
        else {
          navigate("/user", {replace: true});
        }
      }
      else {
        
      }
    }

    getUser();


    let ctrs = Helper.getAllCountries();
    setCountries(ctrs);
    setCountry(ctrs[0].name)
  }, [navigate]);

  useEffect(() => {
    if(country) {
      let cnt = Helper.getCountry(country);
      let sta = Helper.getStatesOfCountry(cnt.isoCode);
      setStates(sta)
      if(sta.length > 0) {
        setState(sta[0].name)
      }
      else {
        setState('');
      }
    }
  }, [country])

  useEffect(() => {
    if(state && country) {
      let cnt = Helper.getCountry(country);
      let sta = Helper.getState(state, cnt.isoCode);
      let cty = Helper.getCitiesOfStates(cnt.isoCode, sta.isoCode);
      setCities(cty);
      if(cty.length > 0) {
        setCity(cty[0].name)
      }
      else {
        setCity('')
      }
    }
    else {
      setCities([]);
      setCity('')
    }
  }, [state])

  const handleSubmit = async (e) => {
    e.preventDefault();

    let email = e.target.email.value;
    let lname = e.target.lname.value;
    let fname = e.target.fname.value;
    let birthday = e.target.birthday.value;
    let gender = e.target.gender.value;
    let gov_id = e.target.gov_id.value;
    let id_no = e.target.id_no.value;
    let postal_code = e.target.postal_code.value;
    let street = e.target.street.value;
    let mobile_no = e.target.mobile_no.value;
    let image = e.target.image.files[0];

    showLoadingMessage({content: "Submitting Details..."})

    let result;
    if(location.state.type === 'google') {
      result = await AuthController.registerWithGoogle({
        google_id: location.state.profile.googleId,
        email: email,
        lname: lname,
        fname: fname,
        mobile_no: mobile_no,
        birthday: birthday,
        gender: gender,
        government_id: gov_id,
        id_no: id_no,
        country: country,
        state: state,
        city: city,
        street: street,
        postal_code: postal_code,
        image: image,
      });
    }
    else if(location.state.type === 'facebook') {
      result = await AuthController.registerWithFacebook({
        facebook_id: location.state.profile.facebookId,
        email: email,
        lname: lname,
        fname: fname,
        mobile_no: mobile_no,
        birthday: birthday,
        gender: gender,
        government_id: gov_id,
        id_no: id_no,
        country: country,
        state: state,
        city: city,
        street: street,
        postal_code: postal_code,
        image: image,
      });
    }

    if(result.success) {
      showSuccessMessage({
        title: "Success",
        content: result.success
      });

      navigate('/', {replace: true});
    }
    else {
      showErrorMessage({
        title: "Error",
        content: result.error
      })
    }

    clearLoading();
  }

  if(loading) return <LoadingPage max />

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
            alt="Register"
            src={require('../assets/images/register.png')}
          />
        </InnerRight>
      </RightContainer>

      <LeftContainer className="flex flex-1 py-8 px-32" style={{ marginLeft: "30rem" }}>
        <div>
          <p className="font-semibold text-sm text-right mb-8">
            Already have an account? 
            <Link 
              to="/"
              className="text-blue-500"
            > Log in </Link>
          </p>

          <h1 className="text-xl font-bold mb-6">Register</h1>
          <h2 className="text-sm mb-6" style={{ color: "#5B5675" }}>
            Let's get you all set up so you can verify your personal account and begin setting up your profile.
          </h2>

          
          <Form onSubmit={handleSubmit}>
            <h3 className="font-semibold mb-2">
              PERSONAL INFORMATION
            </h3>
            <Row>
              <InputContainer>
                <Label>First Name</Label>
                <Input 
                  className={location.state.type === 'google' ? 'readOnly' : ''}
                  type="text" 
                  name="fname" 
                  required
                  readOnly={location.state.type === 'google'}
                  defaultValue={location.state.profile.givenName}
                />
              </InputContainer>
              <InputContainer>
                <Label>Last Name</Label>
                <Input 
                  className={location.state.type === 'google' ? 'readOnly' : ''}
                  type="text" 
                  name="lname" 
                  required
                  readOnly={location.state.type === 'google'}
                  defaultValue={location.state.profile.familyName}
                />
              </InputContainer>
            </Row>

            <Row>
              <InputContainer>
                <Label>Date of Birth</Label>
                <Input 
                  type="date" 
                  name="birthday" 
                  required
                />
              </InputContainer>
              <InputContainer>
                <Label>Gender</Label>
                <div className="flex items-center h-10">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="male" 
                    className="mb-1 mx-2"
                    required
                  />
                  <Label>Male</Label>

                  <input 
                    type="radio" 
                    name="gender" 
                    value="female" 
                    className="mb-1 mr-2 ml-8"
                    required
                  />
                  <Label>Female</Label>
                </div>
              </InputContainer>
            </Row>
            <Row>
              <InputContainer>
                <Label>Government ID</Label>
                <Select name="gov_id" required>
                  <option value="BIR (TIN)">BIR (TIN)</option>
                  <option value="Driver's License">Driver's License</option>
                  <option value="Government Service Insurance System (GSIS)">Government Service Insurance System (GSIS)</option>
                  <option value="NBI Clearance">NBI Clearance</option>
                  <option value="Pag-ibig ID">Pag-ibig ID</option>
                  <option value="Passport ">Passport </option>
                  <option value="Person’s With Disability (PWD)">Person’s With Disability (PWD)</option>
                  <option value="Philippine Postal ID">Philippine Postal ID</option>
                  <option value="Phil-health ID">Phil-health ID</option>
                  <option value="Senior Citizen ID">Senior Citizen ID</option>
                  <option value="Social Security System (SSS)">Social Security System (SSS)</option>
                  <option value="Unified Multi-Purpose Identification (UMID)">Unified Multi-Purpose Identification (UMID)</option>
                </Select>
              </InputContainer>
              <InputContainer>
                <Label>ID Number</Label>
                <Input 
                  type="text" 
                  name="id_no" 
                  required
                />
              </InputContainer>
            </Row>

            <h3 className="font-semibold mb-2 mt-8">
              ADDRESS
            </h3>
            <Row>
              <InputContainer>
                <Label>Country</Label>
                <Select 
                  name="country" 
                  required
                  onChange={ e => setCountry(e.target.value)}
                >
                  {
                    countries.map((item, index) => (
                      <option 
                        key={index.toString()} 
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))
                  }
                </Select>
              </InputContainer>
              <InputContainer>
                <Label>State/Province</Label>
                <Select 
                  name="state"
                  onChange={ e => setState(e.target.value)}
                >
                  {
                    states.map((item, index) => (
                      <option 
                        key={index.toString()} 
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))
                  }
                </Select>
              </InputContainer>
            </Row>

            <Row>
              <InputContainer>
                <Label>City/Municipality</Label>
                <Select 
                  name="city"
                  onChange={ e => setCity(e.target.value)}
                >
                {
                    cities.map((item, index) => (
                      <option 
                        key={index.toString()} 
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))
                  }
                </Select>
              </InputContainer>
              <InputContainer>
                <Label>Postal Code</Label>
                <Input type="text" name="postal_code" required/>
              </InputContainer>
            </Row>

            <Row>
              <InputContainer>
                <Label>Brgy, Apartment, Blk & Lot, House No. etc</Label>
                <Input 
                  type="text" 
                  name="street" 
                  required
                />
              </InputContainer>
            </Row>
            
            <h3 className="font-semibold mb-2 mt-8">
              CONTACTS AND ACCOUNT
            </h3>
            <Row>
              <InputContainer>
                <Label>Profile Image</Label>
                <ImageContainer>
                  {
                    preview ? 
                      <img
                        alt="Profile Preview"
                        style={{ width: "12rem", height: "12rem" }}
                        src={preview}
                      />
                    : 
                      <div className="flex justify-center items-center" style={{ width: "12rem", height: "12rem" }}>
                        <BiImageAdd size={48} color='#E1DFEC' />
                      </div>
                  }
                  <ImageInput 
                    type="file" 
                    name="image"
                    accept="image/png, image/gif, image/jpeg"
                    required
                    onChange={e => {
                      if(e.target.files.length > 0) {
                        let src = URL.createObjectURL(e.target.files[0]);
                        setPreview(src);
                      }
                      else {
                        setPreview(null);
                      }
                    }}
                  />
                </ImageContainer>
              </InputContainer>
            </Row>
            <Row>
              <InputContainer>
                <Label>Mobile Number</Label>
                <Input 
                  type="number" 
                  name="mobile_no" 
                  required
                />
              </InputContainer>
              <InputContainer>
                <Label>Email</Label>
                <Input 
                  className={location.state.type === 'google' ? 'readOnly' : ''}
                  type="email" 
                  name="email" 
                  required
                  readOnly={location.state.type === 'google'}
                  defaultValue={location.state.profile.email}
                />
              </InputContainer>
            </Row>

            <div className="flex flex-col items-center lg:items-end my-4">
              <Button 
                type="submit"
                className="bg-blue-600 text-white font-semibold"
              >
                CREATE ACCOUNT
              </Button>
            </div>
          </Form>
        </div>
      </LeftContainer>

      <img
        className="block md:hidden"
        alt="Register"
        src={require('../assets/images/register.png')}
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
  padding: 2rem 8rem;
  flex: 1;
  margin-left: 30rem;

  @media only screen and (max-width: 1024px) {
    margin-left: 20rem;
    padding: 2rem;
  }

  @media only screen and (max-width: 768px) {
    
    justify-content: center;
    margin-left: 0;
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  
  & > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: column;

    & > :not([hidden]) ~ :not([hidden]) {
      margin-right: 0;
      margin-left: 0;
    }
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
  outline: none;

  &.readOnly {
    background-color: #E1DFEC;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 0.25rem;
  margin: 0.25rem 0;
  border: 1px solid #E1DFEC;
  border-radius: 2rem;
  height: 3rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0.5rem 0;
`;

const Select = styled.select`
  border: 1px solid #E1DFEC;
  height: 2.5rem;
  padding: 0 0.5rem;
  font-size: 1rem;
  border-radius: 2.5rem;
`;

const ImageContainer = styled.div`
  border: 1px solid #E1DFEC;
  width: 12rem;
  position: relative;
`;

const ImageInput = styled.input`
  outline: none;
  position: absolute;
  top: 0;
  height: 12rem;
  width: 12rem;
  position: absolute;
  flex-direction: col;
  opacity: 0;
  cursor: pointer;
`;

export default SocialRegistration;