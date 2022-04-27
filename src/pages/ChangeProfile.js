import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserController } from "../controller/Controller";
import { BiImageAdd } from 'react-icons/bi';
import { clearLoading, showErrorMessage, showLoadingMessage, showSuccessMessage } from "../components/MessageBox";

const ChangeProfile = ({user}) => {

  let navigate = useNavigate();
  let [preview, setPreview] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();

    let image = e.target.image.files[0];

    showLoadingMessage({
      content: "Updating"
    })

    let result = await UserController.updateImage({
      id: user.id,
      image: image
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
        <h1 className="text-xl font-bold mb-6">Change Profile Picture</h1>
      </div>
      <Form onSubmit={handleSubmit} className='bg-white px-16 py-20 rounded-lg'>
      <Row>
        <InputContainer>
          <Label>Profile Image</Label>
          <ImageContainer>
            {
              preview ? 
                <img
                  alt="Profile Preview"
                  style={{ width: "20rem", height: "20rem" }}
                  src={preview}
                />
              : 
                <div className="flex justify-center items-center" style={{ width: "20rem", height: "20rem" }}>
                  <BiImageAdd size={100} color='#E1DFEC' />
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

        <div className="flex flex-col my-4 w-full space-y-4" style={{ maxWidth: "20rem" }}>
          <Button 
            type="submit"
            className="bg-blue-600 text-white font-semibold"
          >
            SAVE CHANGES
          </Button>
          <Button 
            type="button"
            className="bg-gray-400 text-white font-semibold"
            onClick={() => navigate('/user')}
          >
            CANCEL
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

const ImageContainer = styled.div`
  border: 1px solid #E1DFEC;
  width: 20rem;
  height: 20rem;
  position: relative;
  margin-top: 1rem;
`;

const ImageInput = styled.input`
  outline: none;
  position: absolute;
  top: 0;
  height: 20rem;
  width: 20rem;
  position: absolute;
  flex-direction: col;
  opacity: 0;
  cursor: pointer;
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
  align-items: center;
`;

export default ChangeProfile;