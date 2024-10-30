import React from 'react'
import '../Styles/Card.css'
import axios from "axios";
import { useAuthContext } from "../Hooks/useAuthContext";


const ProgressBar = ({ progress, styles,numerator,denominator}) => {
    return (
      <div className="progress-bar-container ">
        <div
          className={`progress-bar-fill ${styles}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
        <span className="progress-percentage">{progress}%</span>
        <span className='solvedData'>{numerator} / {denominator}</span>
      </div>
    );
  };
  

const Card = ({username,rank,totalQuestions,easySolved,mediumSolved,hardSolved,totalEasy,totalMedium,totalHard,arrayData,setArrayData,leetcodeData,setLeetcodeData,setIsLoading}) => {
  const { user } = useAuthContext();
  const token = user.token;

  const handleVisit = () => {
    const link = `https://leetcode.com/u/${username}`;
    window.open(link, '_blank'); 
  };

// This function removes the user Card from the frontend only

  const removeSingleUsername = async (usernameToRemove) => {
    setIsLoading(true);

    const updatedLeetcodeData = leetcodeData.filter((element) => element.username !== usernameToRemove);
    setLeetcodeData(updatedLeetcodeData);

    setIsLoading(false);
}

// This function removes the Username from the Database

const removeFromDatabase=async (usernameToRemove)=>{
  const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/removeUsername`, {
          data: { username: usernameToRemove }, 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log("Username removed:", response.data.leetcodeUsernames);
}
  const handleRemove=async(usernameToRemove)=>{
   await removeSingleUsername(usernameToRemove)
   await removeFromDatabase(usernameToRemove);
   

  }

  const easyPercentage = parseFloat(((easySolved / totalEasy) * 100).toFixed(2));
  const mediumPercentage = parseFloat(((mediumSolved / totalMedium) * 100).toFixed(2));
  const hardPercentage = parseFloat(((hardSolved / totalHard) * 100).toFixed(2));
  

  return (
    <div className='CardWrapper container'>
      <div className="info">
        <div className="infoInfo">
        <h3>{`${username}`}</h3>
        <h3>{`LeeterBoard Rank:  ${rank}`}</h3>
        <h3>Total Questions: {totalQuestions}</h3>
        </div>
       
        <div className="buttonsDiv">
        <button className='Buttons visit' onClick={handleVisit}>Visit</button>
        <button className='Buttons remove' onClick={()=>{handleRemove(username)}}>Remove</button>
        </div>
    
      </div>
      <div className="stats">
        <div className="easy"><span>Easy : </span><ProgressBar progress={easyPercentage} styles={"easybar"} numerator={easySolved} denominator={totalEasy}/></div>
        <div className="medium"><span>Medium : </span><ProgressBar progress={mediumPercentage} styles={"mediumbar"} numerator={mediumSolved} denominator={totalMedium}/></div>
        <div className="hard"><span>Hard : </span><ProgressBar progress={hardPercentage} styles={"hardbar"} numerator={hardSolved} denominator={totalHard}/></div>
      </div>
    </div>
  )
}

export default Card
