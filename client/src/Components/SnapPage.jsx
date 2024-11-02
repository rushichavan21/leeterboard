import React, { useState ,useCallback, useRef } from 'react'
import { useAuthContext } from "../Hooks/useAuthContext";
import axios from 'axios';
import { toJpeg } from 'html-to-image';
import '../Styles/SnapPage.css'
import Navbar from './Navbar'


// This component is used inside the ProfileSnap
const ProgressBar = ({ progress, styles,numerator,denominator}) => {
    return (
      <div className="progress-bar-container snapChange ">
        <div
          className={`progress-bar-fill ${styles}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
        <span className="progress-percentage">{progress}%</span>
        <span className='solvedData'>{numerator} / {denominator}</span>
      </div>
    );
  };
  

// main component of the snap div
const ProfileSnap=({username ,easyNumerator,mediumNumerator,hardNumerator,snapDivRef,totalSolved})=>{

  const easyPercentage = parseFloat(((easyNumerator / 831) * 100).toFixed(2));
  const mediumPercentage = parseFloat(((mediumNumerator / 1748) * 100).toFixed(2));
  const hardPercentage = parseFloat(((hardNumerator / 760) * 100).toFixed(2));
  
    return(
        <div className="profileSnapMainDiv" ref={snapDivRef}> 
         <div className="snap--start">
            <div className="usernameDiv">
                <img src="./leetcode_logo.svg" alt="logo" className='snap--logos' />
                <h3>{username}</h3>
            </div>
            <div className="snap--LeeterBoard">
                <img src="./logo.svg" alt="logo" className='snap--logos' />
                <h3>LeeterBoard</h3>
                </div>
         </div>
         <div className="snap--stats">
          
            <div className="snap--easy"><ProgressBar progress={easyPercentage} styles={"easybar"} numerator={easyNumerator} denominator={831}/></div>
            <div className="snap--medium"><ProgressBar progress={mediumPercentage} styles={"mediumbar"} numerator={mediumNumerator} denominator={1748}/></div>
            <div className="snap--hard"><ProgressBar progress={hardPercentage} styles={"hardbar"} numerator={hardNumerator} denominator={760}/></div>
            <div className="total"><h3>{`Total Solved = ${easyNumerator+mediumNumerator+hardNumerator}`}</h3></div>

         </div>
         <div className="snap--streak">
            <h3>Total Active Days : 90</h3>
            <h3>Max Streak : 40</h3>
         </div>
         <div className="snap--badges">
            <img src="https://assets.leetcode.com/static_assets/marketing/2024-50-lg.png" alt="" />
            <img src="https://assets.leetcode.com/static_assets/marketing/2024-200-lg.png" alt="" />
            <img src="https://assets.leetcode.com/static_assets/marketing/2024-100-lg.png" alt="" />
         </div>
         <div className="snap--contest">
            <h4>Total Contests Attended : 9</h4>
            <h4>Max Rating : 1900</h4>
         </div>
         <div className="snap--visit">
            <button className='Buttons' >Visit</button>
         </div>
        </div>
    )
}

const SnapPage = () => {
  const { user } = useAuthContext();
  const token = user.token;
  const [profileStatsData,setProfileStatsData]=useState("");
  const [username , setUsername]=useState("");
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const snapDivRef=useRef(null);

  const QuestionStats = async () => {
    const trimmedUsername = username.trim();
    if (trimmedUsername === "") { 
      console.warn("Username cannot be empty.");
      return;
    }
  
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/data/${trimmedUsername}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  

      console.log("Fetched data:", response.data);
  
      if (response.data) {
        const Data = {
          username: trimmedUsername,
          stats: response.data,
        };
        setProfileStatsData(Data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      if (error.response) {
        if (error.response.status === 401) {
          console.error("Unauthorized: Invalid token or session expired.");
        } else if (error.response.status === 404) {
          console.error("User not found. Please check the username.");
        } else {
          console.error(`Error ${error.response.status}: ${error.response.data.message || "An error occurred."}`);
        }
      } else if (error.request) {
        console.error("No response received from the server.");
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value.trimStart());
    console.log(username);
  };
const handleOnClick=async()=>{
console.log("started with onClick")
await QuestionStats();
console.log("done with fetching Questions stats");
console.log(profileStatsData);
}

const handleDownload = useCallback(() => {
  if (!snapDivRef.current) return;
  toJpeg(snapDivRef.current, { quality: 0.95, cacheBust: true })
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'leeterboard-snap.jpg';
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
      console.error('Failed to capture image:', error);
    });
}, []);

  return (
    <div className='snapPage--main--div'>  
    <Navbar/> 
   <div className="snapPage--info container">
    <div>   Welcome to the LeeterBoard Profile Snapshot Generator! Here, you can instantly create a personalized snapshot of any LeetCode user's progress and performance.</div>
    <div> Simply enter a LeetCode username, and our tool will generate a detailed profile analysis, showcasing statistics like problem-solving skills, recent achievements, ranking, and more.</div>
    <div> With one click, download a ready-to-share image of the analysis to track your journey or share your progress with friends.</div>
    <div>Perfect for those who love to monitor and celebrate their coding accomplishments!</div>
   </div>
   <div className="inputBox container">
    <input type="text"  className="snapPageInput" placeholder='Enter the Leetcode Username'    value={username}
    onChange={handleUsernameChange} />
    <button className='Buttons' onClick={handleOnClick}> Generate</button>
   </div> 
   <div className="generatedDiv container">
   {profileStatsData && profileStatsData.stats ? (
                <ProfileSnap
                    username={username}
                    easyNumerator={profileStatsData.stats.easySolved}
                    mediumNumerator={profileStatsData.stats.mediumSolved}
                    hardNumerator={profileStatsData.stats.hardSolved}
                    snapDivRef={snapDivRef}
                    totalSolve={profileStatsData.stats.totalSolved}
                />
            ) : (
                <p>Please enter a username and click Generate to view the profile snapshot.</p>
            )}
            <button className='Buttons' onClick={handleDownload}>Download</button>
   </div>
    </div>
  ) 
}

export default SnapPage
