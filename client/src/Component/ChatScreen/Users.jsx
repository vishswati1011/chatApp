import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { API_URL } from "../Services/url";
import { useNavigate } from "react-router";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import styles from './User.module.css';

const Users = ({ handleFriendId }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("chatAppuserid");
     
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get(`${API_URL}users/getAllUsers/${userId}`);
    if (response.data.success) {
      setUsers(response.data.data);
    }

  };

  const handleInvite = async (user) => {
    console.log("Invite");

    const response = await axios.post(`${API_URL}users/inviteuser/${userId}`,{
      email:user.email,
      name:user.username
    });
    if(response.data.success){
      navigate(`/chat/${userId}`)
    }  
  }

  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <Paper>
            <Table>
              <TableHead style={{ backgroundColor: "#839DD8" }}>
                <TableRow>
                  <TableCell>Users Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                      >
                    
                        <div className={styles.list}>
                          <span className={styles.username}>
                                {user.username}</span>
                          <PersonAddIcon className={styles.icon} onClick={(e)=>handleInvite(user)}/> 
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    </div>
  );
};
export default Users;
