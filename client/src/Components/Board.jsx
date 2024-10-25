import React, { useEffect, useState } from "react";
import "../Styles/Board.css";
import Card from "./Card";
import axios from "axios";
import { useAuthContext } from "../Hooks/useAuthContext";


const Board = ({setIsLoading,isLoading}) => {
  const { user } = useAuthContext();
  const token = user.token;
  const [leetcodeData, setLeetcodeData] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [arrayData, setArrayData] = useState([]);
  const [usernameError,setUsernameError]=useState(0);

  const fetchLeetcodeData = async () => {
    const data = [];
    setIsLoading(1);
    try {
      console.log(`Inside the function ${arrayData}`);

      for (const username of arrayData) {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/data/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        data.push({
          username: username,
          leetcodeData: response.data,
        });
      }

      const sortedData = data.sort(
        (a, b) => b.leetcodeData.totalSolved - a.leetcodeData.totalSolved
      );

      setLeetcodeData(sortedData);
      console.log("Sorted LeetCode Data:", sortedData);
      setIsLoading(0);
    } catch (error) {
      console.error(
        "Error fetching LeetCode data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchUsernamesArray = async () => {
    try {
      setIsLoading(1);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/getArray`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArrayData(response.data.leetcodeUsernames);
      setIsLoading(0);
    } catch (error) {
      console.error(
        "Error fetching LeeterBoard:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value.trimStart());
  };

  useEffect(() => {
    const fetchUsername = async () => {
      await fetchUsernamesArray();
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    console.log(arrayData);
  }, [arrayData]);

  useEffect(() => {
    if (newUsername === "") {
      fetchUsernamesArray();
      console.log(arrayData);
    }
  }, [newUsername]);

  useEffect(() => {
    if (arrayData.length >= 0) {
      fetchLeetcodeData();
    }
  }, [arrayData]);


  useEffect(() => {
    let timer;
    if (usernameError === 1) {
    
      timer = setTimeout(() => {
        setUsernameError(0);
      }, 7000);
    }
    

    return () => clearTimeout(timer);
  }, [usernameError]);




  const handleAddUsername = async () => {
  
    setIsLoading(1);
    const trimmedUsername = newUsername.trim();
    if(trimmedUsername===""){
      setIsLoading(0)
     return;
    }
    setNewUsername("");
    if (trimmedUsername) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/addUsername`,
          { username: trimmedUsername },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.leetcodeUsernames) {
          console.log(
            "Username successfully added:",
            response.data.leetcodeUsernames
          );
          fetchUsernamesArray();
        } else {
          console.log("Error adding username:", response.data.message);
        }
        setIsLoading(0);
      } catch (error) {
        setUsernameError(1);
        console.error(
          "Error adding username:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      console.log("Username is empty");
    }
  };

  return (
    <div className="BoardWrapper container">
      {arrayData.length===0 ? (
        <div className="AddUserNameMessage">
          <h1>Your LeeterBoard seems Empty !!</h1>
        </div>
      ) : null}
      {leetcodeData.map((userData, index) => (
        <Card 
          key={index} 
          username={userData.username} 
          rank={index+1} 
          totalQuestions={userData.leetcodeData.totalSolved} 
          easySolved={userData.leetcodeData.easySolved}
          mediumSolved={userData.leetcodeData.mediumSolved}
          hardSolved={userData.leetcodeData.hardSolved}
          totalEasy={userData.leetcodeData.totalEasy}
          totalMedium={userData.leetcodeData.totalHard}
          totalHard={userData.leetcodeData.totalHard}
          arrayData={arrayData}
          setArrayData={setArrayData}
        />
      ))}

      
      {arrayData.length<10? <div className="AddUserNameFunction">
        <input
          type="text"
          placeholder="Enter the username"
          value={newUsername}
          onChange={handleUsernameChange}
          className="addUsernameInput"
        /> 
        <button className="Buttons AdduserNameButtons" onClick={handleAddUsername}>
          Add
        </button>
        </div>:null}
        {usernameError?<div className="usernameError container">enter a valid Leetcode username</div>:null}
    </div>
  );
};

export default Board;
