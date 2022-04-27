import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { FiInfo } from 'react-icons/fi';
import { AiFillMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import LoadingPage from './LoadingPage';
import { TestController } from '../controller/Controller';
import moment from 'moment';

// const sampleData = [
//   {
//     date: "16 Jan 2022, 10:20 PM",
//     place: "MOM_FWMOMCARE",
//     type: "SELF-ADMINISTERED (UNDER SUPERVISION)",
//     result: 0
//   },
//   {
//     date: "15 Jan 2022, 10:20 PM",
//     place: "MOM_FWMOMCARE",
//     type: "SELF-ADMINISTERED (UNDER SUPERVISION)",
//     result: 1
//   },
//   {
//     date: "14 Jan 2022, 10:20 PM",
//     place: "MOM_FWMOMCARE",
//     type: "SELF-ADMINISTERED (UNDER SUPERVISION)",
//     result: 0
//   },
//   {
//     date: "13 Jan 2022, 10:20 PM",
//     place: "MOM_FWMOMCARE",
//     type: "SELF-ADMINISTERED (UNDER SUPERVISION)",
//     result: 0
//   },
//   {
//     date: "12 Jan 2022, 10:20 PM",
//     place: "MOM_FWMOMCARE",
//     type: "SELF-ADMINISTERED (UNDER SUPERVISION)",
//     result: 1
//   },
//   {
//     date: "11 Jan 2022, 10:20 PM",
//     place: "MOM_FWMOMCARE",
//     type: "SELF-ADMINISTERED (UNDER SUPERVISION)",
//     result: 0
//   },
// ]

const Results = ({user}) => {

  let [loading, setLoading] = useState(true);
  let [testResults, setTestResults] = useState([]);

  useEffect(() => {

    const getResults = async () => {
      let results = await TestController.getUserTestResults({user: user.id});
      setTestResults(results);
      setLoading(false);
    }

    getResults();
  }, [user])



  if(loading) return <LoadingPage />

  return(
    <div className="flex flex-col flex-1 p-8">

      <h1 className="text-xl font-bold mb-6">Antigen Rapid Test Results</h1>

      <div className='p-4 rounded-lg flex items-center mb-2' style={{ border: "2px solid #00C6FF" }}>
        <div>
          <FiInfo size={40} color="#00C6FF"/>
        </div>
        <p className='ml-4 text-justify'>
          Antigen Rapid Test negative results is only valid for 24 hours from test date and time. A negative results do not preclude SARS-CoV-2 infection and should not be used as the sole basis for treatment or other patient management decisions. Negative results must be combined with clinical observations, patient history, and epidemiological information.
        </p>
      </div>

      {
        testResults.map((item, index) => {

          if(item.result) {
            return(
              <div className='bg-red-500 p-4 rounded-lg flex text-white my-1' key={index.toString()}>
                <div className='flex-1'>
                  <h2 className='text-md font-bold'>{item.date}</h2>
                  <Detail className='negative'>{item.place}</Detail>
                  <Detail className='negative'>{item.type}</Detail>
                </div>
                <div className='flex flex-col items-center mx-4'>
                  <AiOutlinePlus size={24} color="#FFF"/>
                  <h3 className='font-semibold mt-2' style={{ color: "#FFF" }}>
                    Positive
                  </h3>
                </div>
              </div>
            )
          }
          else {
            return(
              <div className='bg-white p-4 rounded-lg flex my-1' key={index.toString()}>
                <div className='flex-1'>
                  <h2 className='text-md font-bold'>{moment(item.date).format("DD MMM yyyy ddd, h:mm:ss A")}</h2>
                  <Detail>{item.location}</Detail>
                  <Detail>{item.type}</Detail>
                </div>
                <div className='flex flex-col items-center mx-4'>
                  <AiFillMinusCircle size={24} color="#00AF17"/>
                  <h3 className='font-semibold mt-2' style={{ color: "#00AF17" }}>
                    Negative
                  </h3>
                </div>
              </div>
            )
          }
        })
      }
    </div>
  )
}

const Detail = styled.div`
  font-size: 0.75rem;
  color: #707070;

  &.negative {
    color: #ffffffaa;
  }
`;


export default Results;