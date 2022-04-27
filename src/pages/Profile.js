import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import LoadingPage from './LoadingPage';

const Profile = ({user}) => {

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [])

  if(loading) return <LoadingPage />

  return(
    <div className="flex flex-col flex-1 p-8">
      <div className='flex justify-between w-full'>
        <h1 className="text-xl font-bold mb-6">Personal Details</h1>
      </div>

      <div className='bg-white px-16 py-20 rounded-lg'>
        <Row>
          <Detail>
            <Label>First Name</Label>
            <Value>{user.fname}</Value>
          </Detail>
          <Detail>
            <Label>Last Name</Label>
            <Value>{user.lname}</Value>
          </Detail>
        </Row>
        <Row>
          <Detail>
            <Label>Date of Birth</Label>
            <Value>{moment(user.birthday).format("MMMM DD, yyyy")}</Value>
          </Detail>
          <Detail>
            <Label>Gender</Label>
            <Value>{user.gender}</Value>
          </Detail>
        </Row>
        <Row>
          <Detail>
            <Label>Mobile No</Label>
            <Value>{user.mobile_no}</Value>
          </Detail>
          <Detail>
            <Label>Email</Label>
            <Value>{user.email}</Value>
          </Detail>
        </Row>
        <Row>
          <Detail>
            <Label>Goverment ID</Label>
            <Value>{user.government_id}</Value>
          </Detail>
          <Detail>
            <Label>ID No</Label>
            <Value>{user.id_no}</Value>
          </Detail>
        </Row>
        <Row>
          <Detail>
            <Label>Address</Label>
            <Value>
              {
                `${user.street}, ${user.city}, ${user.state}, ${user.country}, ${user.postal_code}`
              }
            </Value>
          </Detail>
        </Row>
      </div>
    </div>
  )
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  
  & > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;

    & > :not([hidden]) ~ :not([hidden]) {
      margin-right: 0;
      margin-left: 0;
    }
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0.5rem 0;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
`;

const Value = styled.p`
  display: flex;
  font-size: 1rem;
  font-weight: 600;
`;


export default Profile;