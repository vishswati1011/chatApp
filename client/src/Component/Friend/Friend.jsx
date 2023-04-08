import React ,{useState,useEffect} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import {API_URL} from '../Services/url'
import { useNavigate } from "react-router";

const Friend = () =>{

  const [users,setUsers] = useState([]);
  const navigate= useNavigate();
  useEffect (( )=>{
      getData();
  },[])
  const getData =async ()=>{
      const userId = localStorage.getItem("chatAppuserid")
      const response = await axios.get(`${API_URL}users/getFriendByUserId/${userId}`)
      if(response.data.success){
        setUsers(response.data.users)
      }
  }
  
  return (
    <>
     <div>
      <h1 className="title">Chat Apps</h1>
      <Paper className="container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Friend Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user,index) => (
              <TableRow key={index} onClick={()=>navigate(`chat/${user.chatroomId._id}`)}>
                <TableCell component="th" scope="row">
                  {user.userid.fName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      </div>
    </>
  )
}
export default Friend;


