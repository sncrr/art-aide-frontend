import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserController } from "../controller/Controller";
import { clearLoading, showErrorMessage, showLoadingMessage, showSuccessMessage, showWarningMessage } from "../components/MessageBox";

const ChangePassword = ({user}) => {

  let navigate = useNavigate();

  useEffect(() => {
    if(user.login_type !== 'email') {
      navigate('/user');
    }
  }, [user, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    let current = e.target.current.value;
    let updated = e.target.updated.value;
    let retype = e.target.retype.value;

    if(updated !== retype) {
      showWarningMessage({
        title: "Warning",
        content: "Password didn't match"
      })

      return;
    }

    showLoadingMessage({
      content: "Updating"
    })

    let result = await UserController.updatePassword({
      id: user.id,
      current: current,
      updated: updated
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
        <h1 className="text-xl font-bold mb-6">Change Password</h1>
      </div>
      <Form onSubmit={handleSubmit} className='bg-white px-16 py-20 rounded-lg'>
        <Row>
          <InputContainer>
            <Label>Current Password</Label>
            <Input 
              type="password" 
              name="current" 
              required
              minLength={8}
              maxLength={16}
            />
          </InputContainer>
        </Row>

        <Row>
          <InputContainer>
            <Label>New Password</Label>
            <Input 
              type="password" 
              name="updated"
              required
              minLength={8}
              maxLength={16}
            />
          </InputContainer>
        </Row>

        <Row>
          <InputContainer>
            <Label>Retype Password</Label>
            <Input 
              type="password" 
              name="retype"
              required
              minLength={8}
              maxLength={16}
            />
          </InputContainer>
        </Row>

        <div className="flex justify-end items-end my-4 w-full" style={{ maxWidth: "32rem" }}>
          <Button 
            type="button"
            className="bg-gray-400 text-white font-semibold mr-4"
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
  max-width: 32rem;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0.5rem 0;
`;

export default ChangePassword;