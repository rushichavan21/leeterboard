import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import "../Styles/Board.css";
import { useAuthContext } from "../Hooks/useAuthContext";

const Board = ({ setIsLoading, isLoading }) => {


  // Imports
  const { user } = useAuthContext();
  const token = user.token;
  const [leetcodeData, setLeetcodeData] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [arrayData, setArrayData] = useState([]);
  const [usernameError, setUsernameError] = useState(0);
  let newUsernameToUpdate = "";




  // This function will fetch the single username and will add it to the exsisting array
  const fetchSingleUsernameData = async () => {
    const trimmedUsername = newUsername.trim();
    if (trimmedUsername === "") return;
    newUsernameToUpdate = trimmedUsername;
    setNewUsername("");
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/data/${trimmedUsername}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        const newData = {
          username: trimmedUsername,
          leetcodeData: response.data,
        };
        const updatedData = [...leetcodeData, newData].sort(
          (a, b) => b.leetcodeData.totalSolved - a.leetcodeData.totalSolved
        );
        setLeetcodeData(updatedData);
      }else{
        setUsernameError(1);
      }
    } catch (err) {
      setUsernameError(1);
      console.error("Error fetching user data:", err);
    }
  };



// After adding the new username this function will add the new username to the database
  const UpdateNewUsernameToDatabase = async () => {
    if (newUsernameToUpdate === "") {
      setIsLoading(0);
      return;
    }
    if (newUsernameToUpdate) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/addUsername`,
          { username: newUsernameToUpdate },
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
        } else {
          console.log("Error adding username:", response.data.message);
        }
      } catch (error) {
        console.error(
          "Error adding username:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      console.log("Username is empty");
    }
  };




  // Main onclick function for "Add-username"
  const handleAddUsername = async () => {
    setIsLoading(1);
    await fetchSingleUsernameData();
    setIsLoading(0);
    await UpdateNewUsernameToDatabase();
    newUsernameToUpdate = "";
    console.log("username updated");
  };



 // Fetch the leetcode stats from the UserNames Array on the database 
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


  // fetches the entire array of usernames
  const fetchUsernamesArray = async () => {
    try {
      setIsLoading(1);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/getArray`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

    // UseEffecs are lined below

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
  }, []);
  
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


  return (
    <div className="BoardWrapper container">
      {arrayData.length === 0 ? (
        <div className="AddUserNameMessage">
          <h1>Your LeeterBoard seems Empty !!</h1>
        </div>
      ) : null}
      {leetcodeData.map((userData, index) => (
        <Card
          key={index}
          username={userData.username}
          rank={index + 1}
          totalQuestions={userData.leetcodeData.totalSolved}
          easySolved={userData.leetcodeData.easySolved}
          mediumSolved={userData.leetcodeData.mediumSolved}
          hardSolved={userData.leetcodeData.hardSolved}
          totalEasy={userData.leetcodeData.totalEasy}
          totalMedium={userData.leetcodeData.totalHard}
          totalHard={userData.leetcodeData.totalHard}
          arrayData={arrayData}
          setArrayData={setArrayData}
          leetcodeData={leetcodeData}
          setLeetcodeData={setLeetcodeData}
          setIsLoading={setIsLoading}
        />
      ))}

      {leetcodeData.length < 10 ? (
        <div className="AddUserNameFunction container">
          <input
            type="text"
            placeholder="Enter the username"
            value={newUsername}
            onChange={handleUsernameChange}
            className="addUsernameInput"
          />
          <button
            className="Buttons AdduserNameButtons"
            onClick={handleAddUsername}
          >
            Add
          </button>
        </div>
      ) : null}
      {usernameError ? (
        <div className="usernameError container">
          enter a valid Leetcode username
        </div>
      ) : null}
    </div>
  );
};

export default Board;
