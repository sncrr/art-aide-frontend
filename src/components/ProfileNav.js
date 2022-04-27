import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaList } from 'react-icons/fa';
import { GoSignOut, GoKey } from 'react-icons/go';
import { CgDetailsMore } from 'react-icons/cg'; 
import { Helper } from '../controller/Controller';
import { showConfirmDialog } from './MessageBox';
import LoadingImage from './LoadingImage';
import styled from "styled-components";
import { RiMenuFoldFill } from 'react-icons/ri';
import { AiOutlineQrcode } from 'react-icons/ai';


const ProfileNav = ({user, showMenu, setShowMenu}) => {

  let location = useLocation();
  let navigate = useNavigate();

  const MainContainer = styled.div`
    display: flex;
    height: 100%;
    position: fixed;
    padding: 0.5rem;
    width: 16rem;
    transition: left 1s ease-in-out;

    @media only screen and (max-width: 1024px) {
      left: ${props => props.showMenu ? '0' : '-20rem'};
    }
  `;

  return(
    <MainContainer showMenu={showMenu} className="flex h-full fixed p-2" style={{ width: "16rem"}}>
      <Menu>
        <MenuIcon>
          <RiMenuFoldFill 
            className='cursor-pointer'
            size={32} 
            color="#FFF" 
            onClick={() => setShowMenu(false)}
          />
        </MenuIcon>
        <div className='flex flex-col items-center'>
          <img
            src={require('../assets/images/logo.png')}
            alt="Art Aide Logo"
            className="w-20"
          />

          <div className='bg-white h-32 w-32 mt-8 mb-1 rounded-full flex items-center justify-center'>
            <LoadingImage
              src={Helper.getImageUri(user.profile_uri)}
              alt="Profile Image"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <Link
            to='/user/change_profile' 
            className='text-white mb-6 underline font-thin'
            style={{ fontSize: '0.75rem' }}
          >
            Change
          </Link>

          {/* <h2 className='text-white text-md font-bold'>GXXXXXX123M</h2> */}
          <h2 className='text-white text-md font-bold'>
            {`${user.fname} ${user.lname}`}
          </h2>
        </div>

        <div className='mt-8 flex-1 space-y-2'>
          <Link
            to="/user"
            className={'flex items-center text-white text-md py-3 ' + (location.pathname === '/user' ? 'border-r-4 border-white' : '')}
          >
            <FaUser className='mx-4 text-lg' />
            Profile
          </Link>

          <Link
            to="/user/results"
            className={'flex items-center text-white text-md py-3 ' + (location.pathname === '/user/results' ? 'border-r-4 border-white' : '')}
          >
            <FaList className='mx-4 text-lg' />
            Rapid Test
          </Link>

          <Link
            to="/user/qr_code"
            className={'flex items-center text-white text-md py-3 ' + (location.pathname === '/user/qr_code' ? 'border-r-4 border-white' : '')}
          >
            <AiOutlineQrcode className='mx-4 text-lg' />
            QR Code
          </Link>
        </div>

        <div className='mt-8 space-y-2'>
          <Link
            to="/user/update"
            className={'flex items-center text-white text-md py-3 ' + (location.pathname === '/user/update' ? 'border-r-4 border-white' : '')}
          >
            <CgDetailsMore className='mx-4 text-lg' />
            Update Details
          </Link>
          {
            user.login_type === 'email' ? (
              <Link
                to="/user/change_password"
                className={'flex items-center text-white text-md py-3 ' + (location.pathname === '/user/change_password' ? 'border-r-4 border-white' : '')}
              >
                <GoKey className='mx-4 text-lg' />
                Change Password
              </Link>
            ) : null
          }
          <div
            className='flex items-center text-white text-md cursor-pointer py-3'
            onClick={ () => {
              showConfirmDialog({
                title: "Confirmation",
                content: "Are you sure you want to logout?",
                onClick: () => {
                  navigate("/logout", {replace: true});
                }
                
              })
            }}
          >
            <GoSignOut className='mx-4 text-lg' />
            Log out
          </div>
        </div>
      </Menu>
    </MainContainer>
  )
}

const MenuIcon = styled.div`
  display: none;

  @media only screen and (max-width: 1024px) {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background-color: #276BD3;
  width: 100%;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.25rem;
    border-radius: 1rem;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background-color: slategray;
    border-radius: 1rem;
  }

  /* Handle on hover */
  /* &::-webkit-scrollbar-thumb:hover {
    background: transparent;
  } */
`;

export default ProfileNav;