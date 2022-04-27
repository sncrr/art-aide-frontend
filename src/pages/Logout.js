import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helper } from '../controller/Controller';
import LoadingPage from './LoadingPage';

const Logout = () => {

  let navigate = useNavigate();

  useEffect(() => {
    Helper.logout();
    navigate("/", {replace: true});
  }, [navigate])

  return <LoadingPage max />;
}

export default Logout;