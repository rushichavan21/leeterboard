import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../../Hooks/use-toast";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useAuthContext } from "../../Hooks/useAuthContext";
import Card from "../../Components/Card/Card";
import "../../Components/Board/Board.css";
import { useSetRecoilState, useRecoilState } from "recoil";
import { useTheme } from "@/Context/theme-provider";
import { useNavigate, useLocation } from "react-router-dom";
import {
  loadingAtom,
} from "../../Atoms/Atoms";
import NewCard from "./NewCard";


const NewBoard = () => {
  const {theme}=useTheme();
  const { toast } = useToast();
  const { user } = useAuthContext();
  const token = user.token;
  const setIsLoading = useSetRecoilState(loadingAtom);
  const [leetcodeData,setLeetcodeData]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(1);
        const response = await axios.get(`${ import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-users`);
      const sortedData = response.data.sort((a, b) => b.totalSolved - a.totalSolved);

    setLeetcodeData(sortedData);
    console.log(leetcodeData);
      } catch (error) {
        setIsLoading(0);
        console.error("Error fetching LeetCode data:", error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div
      className={`BoardWrapper container ${
        theme==="light"?"lightBoard":"darkBoard"
      }`}
    >
      {leetcodeData.length === 0 ? (
        <div className="AddUserNameMessage">
          <h1>
           Welcome to leaderboard of our vjti peeps!
           if you are not able to see the leaderboard
           try after some time , our server may be down.
          </h1>
        </div>
      ) : null}
      {leetcodeData.map((u,index) => (
        <NewCard
          key={u.id}
          username={u.Username}
          rank={index + 1}
          totalQuestions={u.totalSolved}
          easySolved={u.easy}
          mediumSolved={u.medium}
          hardSolved={u.hard}
          totalEasy={871}
          totalMedium={1821}
          totalHard={819}
        />
      ))}
    </div>
  );
};

export default NewBoard;
