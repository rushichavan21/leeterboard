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
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useTheme} from "@/Context/theme-provider";
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
  const {theme}=useTheme();
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
    <div className={`${theme=="light"?"":"snap-page-container-dark"}`}>

 
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
          <h1 className={`text-4xl font-bold text-center ${theme=="light"?"text-slate-950":""} `}>
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
    Discover
    {" "}
  </span>
  , 
  {" "}
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
    Analyze
    {" "}
  </span>
  , and 
  {" "}
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">
    Share
    {" "}
  </span>
  LeetCode Progress Instantly!
</h1>

        </div>
        <div>
          {" "}
       <p  className={` ${theme=="light"?"text-slate-950":""}`}>   Simply enter a LeetCode username, and our tool will generate a
          detailed profile analysis, showcasing statistics like problem-solving
          skills, recent achievements, ranking, and more.</p>
        </div>
       
      </div>
      <div className="inputBox  utilityInput container">
        <Input   type="text" placeholder="Enter the Leetcode Username" id="snapPageInput" className={`${theme=='light'?"border-slate-950":"border-neutral-100"}`}  value={username}    onChange={handleUsernameChange}>
        </Input>
        {showDownloadButton?<div className="downloadButton" >
          <Button onClick={handleDownload}>Download </Button>
        </div>: <Button onClick={handleOnClick}>Generate</Button>}
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
    </div>
    );};
     

export default SnapPage;
