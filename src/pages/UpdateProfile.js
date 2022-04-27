import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Helper, UserController } from "../controller/Controller";
import { clearLoading, showConfirmDialog, showErrorMessage, showLoadingMessage, showSuccessMessage, showWarningMessage } from "../components/MessageBox";

const UpateProfile = ({user}) => {

  let navigate = useNavigate();

  let [loaded, setLoaded] = useState(false);
  let [countries, setCountries] = useState([]);
  let [states, setStates] = useState([]);
  let [cities, setCities] = useState([]);

  let [country, setCountry] = useState(user.country);
  let [state, setState] = useState(user.state);
  let [city, setCity] = useState(user.city);

  let [gender, setGender] = useState(user.gender);

  useEffect(() => {
    //Get sorted provinces
    setCountries(Helper.getAllCountries());
  }, []);

  useEffect(() => {
    if(country) {
      let cnt = Helper.getCountry(country);
      let sta = Helper.getStatesOfCountry(cnt.isoCode);
      setStates(sta)
      if(sta.length > 0) {
        if(loaded) {
          setState(sta[0].name)
        }
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
        if(loaded) {
          setCity(cty[0].name)
        }
      }
      else {
        setCity('')
      }
    }
    else {
      setCities([]);
      setCity('')
    }

    if(!loaded) {
      setLoaded(true);
    }
  }, [state])


  const handleSubmit = (e) => {
    e.preventDefault();

    let fname = e.target.fname.value;
    let lname = e.target.lname.value;
    let birthday = e.target.birthday.value;
    let gender = e.target.gender.value;
    let gov_id = e.target.gov_id.value;
    let id_no = e.target.id_no.value;
    let postal_code = e.target.postal_code.value;
    let street = e.target.street.value;
    
    let mobile_no = e.target.mobile_no.value;
    let email = e.target.email.value;

    if(
      user.fname === fname &&
      user.lname === lname &&
      user.birthday === birthday &&
      user.gender === gender &&
      user.government_id === gov_id &&
      user.id_no === id_no &&
      user.country === country &&
      user.state === state &&
      user.city === city &&
      user.postal_code === postal_code &&
      user.street === street &&
      user.mobile_no === mobile_no &&
      user.email === email
    ) {
      
      showWarningMessage({
        title: "Warning",
        content: "No changes applied"
      })
      return;
    }

    showConfirmDialog({
      title: "Confirmation",
      content: "Are you sure you want to change your details?",
      onClick: () => updateDetails(e)
    })

    
  }

  const updateDetails = async (e) => {

    showLoadingMessage({
      content: "Updating"
    })

    let fname = e.target.fname.value;
    let lname = e.target.lname.value;
    let birthday = e.target.birthday.value;
    let gender = e.target.gender.value;
    let gov_id = e.target.gov_id.value;
    let id_no = e.target.id_no.value;
    let postal_code = e.target.postal_code.value;
    let street = e.target.street.value;
    
    let mobile_no = e.target.mobile_no.value;
    let email = e.target.email.value;

    

    let result = await UserController.updateDetails({
      id: user.id,
      email: email,
      mobile_no: mobile_no,
      lname: lname,
      fname: fname,
      birthday: birthday,
      gender: gender,
      government_id: gov_id,
      id_no: id_no,
      country: country,
      state: state,
      city: city,
      street: street,
      postal_code: postal_code
    });


    if(result.success) {
      showSuccessMessage({
        title: "Success",
        content: result.success
      });

      navigate('/user', {replace: true});
    }
    else {
      showErrorMessage({
        title: "Error",
        content: result.error
      })
    }

    clearLoading();
  }

  return(
    <div className="flex flex-col flex-1 p-8">
      <div className='flex justify-between w-full'>
        <h1 className="text-xl font-bold mb-6">Update Details</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <h3 className="font-semibold mb-2">
          PERSONAL INFORMATION
        </h3>
        <Row>
          <InputContainer>
            <Label>First Name</Label>
            <Input 
              type="text" 
              name="fname" 
              defaultValue={user.fname}
              required
            />
          </InputContainer>
          <InputContainer>
            <Label>Last Name</Label>
            <Input 
              type="text" 
              name="lname"
              required
              defaultValue={user.lname}
            />
          </InputContainer>
        </Row>

        <Row>
          <InputContainer>
            <Label>Date of Birth</Label>
            <Input 
              type="date" 
              name="birthday"
              defaultValue={user.birthday}
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
                checked={gender === "male"}
                required
                onChange={e => {
                  if(e.target.checked) setGender("male")
                }}
              />
              <Label>Male</Label>

              <input 
                type="radio" 
                name="gender" 
                value="female" 
                className="mb-1 mr-2 ml-8"
                checked={gender === "female"}
                required
                onChange={e => {
                  if(e.target.checked) setGender("female")
                }}
              />
              <Label>Female</Label>
            </div>
          </InputContainer>
        </Row>
        <Row>
          <InputContainer>
            <Label>Government ID</Label>
            <Select name="gov_id" required defaultValue={user.government_id}>
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
              defaultValue={user.id_no}
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
              value={country}
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
              value={state}
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
              value={city}
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
            <Input 
              type="text" 
              name="postal_code" 
              defaultValue={user.postal_code}
              required
            />
          </InputContainer>
        </Row>

        <Row>
          <InputContainer>
            <Label>Brgy, Apartment, Blk & Lot, House No. etc</Label>
            <Input 
              type="text" 
              defaultValue={user.street}
              name="street" 
              required
            />
          </InputContainer>
        </Row>
        
        <h3 className="font-semibold mb-2 mt-8">
          CONTACTS
        </h3>
        <Row>
          <InputContainer>
            <Label>Mobile Number</Label>
            <Input 
              type="number" 
              name="mobile_no" 
              required
              defaultValue={user.mobile_no}
            />
          </InputContainer>
          <InputContainer>
            <Label>Email</Label>
            <Input 
              className={user.login_type !== 'email' ? 'readOnly' : ''}
              type="email" 
              name="email" 
              required
              defaultValue={user.email}
              readOnly = {user.login_type !== 'email'}
            />
          </InputContainer>
        </Row>

        <div className="flex my-4 justify-center flex-col-reverse md:flex-row md:justify-end md:items-end" >
          <Button
            type="button"
            className="bg-gray-400 text-white font-semibold mt-2 md:mt-0 mr-0 md:mr-2"
            onClick={() => navigate('/user')}
          >
            CANCEL
          </Button>
          <Button 
            type="submit"
            className="bg-blue-600 text-white font-semibold"
          >
            SAVE CHANGES
          </Button>
        </div>
      </Form>
    </div>
  )
}

const Form = styled.form`
  background-color: #FFF;
  padding: 4rem 5rem;
  border-radius: 1rem;
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
  padding: 0 4rem;
  border-radius: 0.25rem;
  border: 1px solid #E1DFEC;
  border-radius: 2rem;
  height: 3rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  
  & > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  @media only screen and (max-width: 1240px) {
    flex-direction: column;

    & > :not([hidden]) ~ :not([hidden]) {
      margin-right: 0;
      margin-left: 0;
    }
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: row;

    & > :not([hidden]) ~ :not([hidden]) {
      --tw-space-x-reverse: 0;
      margin-right: calc(0.5rem * var(--tw-space-x-reverse));
      margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
    }
  }

  @media only screen and (max-width: 900px) {
    flex-direction: column;

    & > :not([hidden]) ~ :not([hidden]) {
      margin-right: 0;
      margin-left: 0;
    }
  }
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
  outline: none;
`;

export default UpateProfile;