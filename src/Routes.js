import React from 'react';
import { HashRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Logout from './pages/Logout';
import Admin from './pages/admin/Admin';
import User from './pages/User';
import Welcome from './pages/Welcome';
import Registration from './pages/Registration';
import SocialRegistration from './pages/SocialRegistration';
import AccountVerification from './pages/AccountVerification';

const Routes = () => {

  return(
    <Router>
      <Switch>
        <Route path='/' element={<Welcome />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/account_completion' element={<SocialRegistration />} />
        <Route path='/user/*' element={<User />} />
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/account_verification' element={<AccountVerification />} />
      </Switch>
    </Router>
  )
}

export default Routes;