import React, { useEffect, useState } from 'react';
import styled from "styled-components";

import { GiTestTubes } from 'react-icons/gi';
import { HiUserAdd, HiUserGroup } from 'react-icons/hi';
import { BsFillNodePlusFill } from 'react-icons/bs';
import LoadingPage from '../LoadingPage';
import { TestController, UserController } from '../../controller/Controller';


const Dashboard = () => {

  let [loading, setLoading] = useState(true);
  let [totalTest, setTotalTest] = useState(0);
  let [newUsers, setNewUsers] = useState(0);
  let [positive, setPositive] = useState(0);
  let [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const getData = async () => {

      let tests = await TestController.getAllTestCount();
      let posRes = await TestController.getPositiveCountToday();
      let usersToday = await UserController.getNewUsersCount();
      let users = await UserController.getUsersCount();

      setTotalTest(tests);
      setPositive(posRes);
      setNewUsers(usersToday);
      setTotalUsers(users);
      
      setLoading(false);
    };

    getData();
  }, [])

  if(loading) return <LoadingPage />

  return(
    <div className="flex flex-col flex-1 py-8">
      <div className='flex justify-between w-full ml-8'>
        <h1 className="text-xl font-bold mb-6">Dashboard</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2'>
        <Card>
          <Icon>
            <GiTestTubes /> 
          </Icon>
          <Label>Total Test (Today)</Label>
          <Value>{totalTest}</Value>
        </Card>

        <Card>
          <Icon>
            <HiUserAdd />
          </Icon>
          <Label>New Users (Today)</Label>
          <Value>{newUsers}</Value>
        </Card>

        <Card>
          <Icon>
            <BsFillNodePlusFill />
          </Icon>
          <h2>Positive Test (Today)</h2>
          <Value>{positive}</Value>
        </Card>

        <Card>
          <Icon>
            <HiUserGroup />
          </Icon>
          <h2>Total Users</h2>
          <Value>{totalUsers}</Value>
        </Card>
      </div>
    </div>
  )
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 1rem;
  background-color: #FFFFFF;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 640px) {
    margin: 1rem 2rem;
  }
`;

const Label = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`;

const Value = styled.h2`
  display: flex;
  font-size: 2rem;
  font-weight: 600;
`;

const Icon = styled.div`
  font-size: 2rem;
  color: #276BD3;
  margin-bottom: 1rem;
`;


export default Dashboard;