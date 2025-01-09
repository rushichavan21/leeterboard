import { useState, useCallback, useRef } from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";
import axios from "axios";
import { toJpeg } from "html-to-image";
import "./SnapPage.css";
import { useSetRecoilState, useRecoilValue} from "recoil";
import { loadingAtom } from "../../Atoms/Atoms";
import { Toaster } from "@/Components/ui/toaster"
import NewNav from "@/Components/Navbar/Navbar";
import Slider from "@/Components/Slider/Slider";
import SnapComponent from "@/Components/SnapComponent/SnapComponent";
const Loader=()=>{
  return(
    <div className="loaderDiv">
    <div className="loader"></div>
    <h3>Loading...</h3>
    </div>

  )
}

const SnapPage = () => {
  const { user } = useAuthContext();
  const token = user.token;
  const [profileStatsData, setProfileStatsData] = useState("");
  const [username, setUsername] = useState("");
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const setIsLoading=useSetRecoilState(loadingAtom);
  const isLoading=useRecoilValue(loadingAtom);
  const snapDivRef = useRef(null);

  const QuestionStats = async () => {
    const trimmedUsername = username.trim();
    if (trimmedUsername === "") {
      console.warn("Username cannot be empty.");
      return;
    }
setIsLoading(1);
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

      console.log("Fetched data:", response.data);

      if (response.data) {
        const Data = {
          username: trimmedUsername,
          stats: response.data,
        };
        console.log(response.data)
        setProfileStatsData(Data);
        setShowDownloadButton(true)
      }
      setIsLoading(0);
    } catch (error) {
      setIsLoading(0);
      toast.error("Please Enter a Valid Leetcode Username",
        { style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontFamily:'poppins',
          fontWeight:'500'
        },}
      )
      console.error("Error fetching stats:", error);
      if (error.response) {
        if (error.response.status === 401) {
          console.error("Unauthorized: Invalid token or session expired.");
        } else if (error.response.status === 404) {
          console.error("User not found. Please check the username.");
        } else {
          console.error(
            `Error ${error.response.status}: ${
              error.response.data.message || "An error occurred."
            }`
          );
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
    setShowDownloadButton(false);
    setProfileStatsData("");
  };
  const handleOnClick = async () => {
    console.log("started with onClick");
    await QuestionStats();
    console.log("done with fetching Questions stats");
    console.log(profileStatsData);
  };

  const handleDownload = useCallback(() => {
    if (!snapDivRef.current) return;
    setIsLoading(1);
    snapDivRef.current.classList.remove("hidden");
    
    toJpeg(snapDivRef.current, { quality: 0.95, cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "leeterboard-snap.jpg";
        link.href = dataUrl;
        link.click();
        snapDivRef.current.classList.add("hidden");
        setIsLoading(0);
      })
      .catch((error) => {
        setIsLoading(0);
        console.error("Failed to capture image:", error);
      });
  }, []);

  return (
    <>
     <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <NewNav/>
      <div className="sidebar--div"> 
    <Slider/>
    </div>
      <div className="snapPage--main--div">
      <div className="snapPage--info container">
        <div>
          {" "}
       <p>Welcome to the LeeterBoard Profile Snapshot Generator! Here, you can
          instantly create a personalized snapshot of any LeetCode user's
          progress and performance.</p>
        </div>
        <div>
          {" "}
       <p>   Simply enter a LeetCode username, and our tool will generate a
          detailed profile analysis, showcasing statistics like problem-solving
          skills, recent achievements, ranking, and more.</p>
        </div>
       
      </div>
      <div className="inputBox  utilityInput container">
        <input
          type="text"
          className="snapPageInput"
          placeholder="Enter the Leetcode Username"
          value={username}
          onChange={handleUsernameChange}
        />
        {showDownloadButton?<div className="downloadButton" >
        <button className="Buttons" onClick={handleDownload}>
        Download
      </button>
        </div>: <button className="Buttons" onClick={handleOnClick}>
          {" "}
          Generate
        </button>}
      </div>
      {profileStatsData && profileStatsData.stats ? (
        <SnapComponent
          username={username}
          easyNumerator={profileStatsData.stats.easySolved}
          mediumNumerator={profileStatsData.stats.mediumSolved}
          hardNumerator={profileStatsData.stats.hardSolved}
          snapDivRef={snapDivRef}
          totalEasy={profileStatsData.stats.totalEasy}
          totalMedium={profileStatsData.stats.totalMedium}
          totalHard={profileStatsData.stats.totalHard}
          attendedContests={profileStatsData.stats.attendedContests}
          rating={profileStatsData.stats.attendedContests===0?0:profileStatsData.stats.rating}
        />
      ) : null}
    </div>
    {isLoading?<Loader/>:null}
    <Toaster/>
    </>
    );};
     

export default SnapPage;
