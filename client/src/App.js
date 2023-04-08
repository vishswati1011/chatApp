import * as React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Friend from './Component/Friend/Friend';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import SignInForm from './Component/LoginSignup/SignInForm';
import SignUpForm from './Component/LoginSignup/SignUpForm';
import SideBar from './Component/Navigation/SideBar';
import Chatroom from './Component/Chatroom/Chatroom'
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
 const  MiniDrawer=()=> {
  return (
    <div className='App'>
  {localStorage.getItem('chatAppuserid') ? (
    <Router>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
        <Routes>
          <Route exact path='/' element={<Friend/>} />
          <Route exact path='/chat/:friendId' element={<Chatroom/>}/>
      </Routes>
      </Box>
    </Box>
    </Router>
       ):(
      <Router>
        <Routes>
          <Route exact path='/' element={<SignInForm/>} />
          <Route exact path='/register' element={<SignUpForm/>} />
        </Routes>
      </Router>
       )}
         </div>
  );
}
export default MiniDrawer;
