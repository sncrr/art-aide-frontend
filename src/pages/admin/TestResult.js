import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { FiInfo } from 'react-icons/fi';
import { AiFillMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import LoadingPage from '../LoadingPage';
import { TestController } from '../../controller/Controller';
import moment from 'moment';

const TestResult = () => {

  let [loading, setLoading] = useState(true);
  let [users, setUsers] = useState([]);
  let [results, setResults] = useState([]);
  let [selected, setSelected] = useState();
  let [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    getResults();
  }, [])

  useEffect(() => {
    search();
  }, [searchInput])

  const getResults = async () => {
    let results = await TestController.getAllTestResults();
    setUsers(results);
    setSelected(null);
    setLoading(false);
  }

  const selectUser = async (user) => {
    setLoading(true);
    
    let res = await TestController.getUserTestResults({user: user.user});
    setResults(res);
    setSelected(user);

    setLoading(false)
  }

  const search = () => {

    if(loading) return;

    let filter, table, tr, td, i, txtValue;

    filter = searchInput.toUpperCase();
    table = document.getElementById("tbl_users");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      let found = false;

      //Search by Name
      td = tr[i].getElementsByTagName("td")[0];
      if(td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          found = true;
        } else {
          tr[i].style.display = "none";
        }
      }

      //Search by email
      if(!found) {
        td = tr[i].getElementsByTagName("td")[1];

        if(td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            found = true;
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }

  if(loading) return <LoadingPage />

  if(selected) {
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

        <div>
          <button
            className='underline text-blue-500 text-lg'
            onClick={ () => {
              setLoading(true);
              getResults();
            }}
          >
            {'<<'} Back
          </button>

          <div className='mt-2 flex'>
            <h2>Name:</h2>
            <h2 className='font-bold ml-2'>{selected.fname + " " + selected.lname}</h2>
          </div>
          <div className='mb-2 flex'>
            <h2>Email:</h2>
            <h2 className='font-bold ml-2'>{selected.email}</h2>
          </div>
        </div>
        {
          results.map((item, index) => {
  
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

      <div className='flex items-center mt-4'>
        <label className='mr-4'>
          Search: 
        </label>
        <input
          className='outline-none px-2 py-2 flex-1 rounded border'
          placeholder='Search name or email here'
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
      </div>

      <Table id='tbl_users'>
        <thead className='bg-slate-500'>
          <Row>
            <Head>NAME</Head>
            <Head>EMAIL</Head>
            <Head>POSITIVE TEST</Head>
            <Head>TOTAL TEST</Head>
            <Head></Head>
          </Row>
        </thead>
        <tbody>
          {
            users.map((item, index) => {
              
              let name = item[0].fname + " " + item[0].lname;
              let positive = 0;
              for(let test of item) {
                if(test.result === 1) {
                  positive++;
                }
              }
              
              return(
                <Row key={index.toString()}>
                  <Data>{name}</Data>
                  <Data>{item[0].email}</Data>
                  <Data>{positive}</Data>
                  <Data>{item.length}</Data>
                  <Data className='text-center'>
                    <button 
                      className='underline text-blue-500'
                      onClick={ () => selectUser(item[0])}
                    >
                      View Results
                    </button>
                  </Data>
                </Row>
              )
            })
          }
        </tbody>
      </Table>
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

const Table = styled.table`
  background-color: #FFFFFF;
  margin-top: 1rem;
`;

const Row = styled.tr`

  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const Head = styled.th`
  background-color: #ffffffaa;
  text-align: left;
  border: 1px solid #CBD1D8;
  padding: 0.5rem;
`;

const Data = styled.td`
  border: 1px solid #CBD1D8;
  padding: 0.5rem;
`;


export default TestResult;