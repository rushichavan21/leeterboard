
import './Card.css'
import axios from "axios";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { Button } from "@/Components/ui/button"
import { useToast } from "../../Hooks/use-toast";
import { useTheme} from "@/Context/theme-provider";

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
  const { toast } = useToast();
  const {theme}=useTheme();
  const handleVisit = () => {
    const link = `https://leetcode.com/u/${username}`;
    window.open(link, '_blank'); 
  };

// This function removes the user Card from the frontend only

  const removeSingleUsername = async (usernameToRemove) => {
    setIsLoading(true);

    const updatedLeetcodeData = leetcodeData.filter((element) => element.username !== usernameToRemove);
    setLeetcodeData(updatedLeetcodeData);
    toast({
      title: `${usernameToRemove} was removed`
    });
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
    <div className={`CardWrapper container ${theme==="light"?"lightCard":"darkCard"}`}>
      <div className="info-card">
        <div className="infoInfo">
        <h3>{`${username}`}</h3>
        <h3>{`LeeterBoard Rank:  ${rank}`}</h3>
        <h3>Total Questions: <span className={`${theme==="light"?"totalQuestionsLight":"totalQuestionsDark"}`}>{totalQuestions}</span></h3>
        </div>
       
        <div className="buttonsDiv">
        <Button variant="outline" id={`visit`} onClick={handleVisit}>Visit</Button>
        <Button variant="outline" id="remove"  onClick={()=>{handleRemove(username)}}>Remove</Button>
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
