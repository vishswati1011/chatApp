import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { API_URL } from "../Services/url";

const Friend = ({ handleFriendId }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const userId = localStorage.getItem("chatAppuserid");
    const response = await axios.get(
      `${API_URL}users/getFriendByUserId/${userId}`
    );
    if (response.data.success) {
      setUsers(response.data.users);
    }
  };

  return (
    <Paper>
      <Table>
        <TableHead style={{ backgroundColor: "#839DD8" }}>
          <TableRow>
            <TableCell>Chats</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => handleFriendId(user.userId._id)}
                >
                  {user.userId.username}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default Friend;
