import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../../Hooks/use-toast";
import { useAuthContext } from "../../Hooks/useAuthContext";
import NewCard from "./NewCard";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useTheme } from "@/Context/theme-provider";
import { loadingAtom, orderbyAtom } from "../../Atoms/Atoms";
import "../../Components/Board/Board.css";

const NewBoard = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const { user } = useAuthContext();
  const token = user.token;
  const setIsLoading = useSetRecoilState(loadingAtom);
  const [leetcodeData, setLeetcodeData] = useState([]);
  const order = useRecoilValue(orderbyAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(1);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-users`);
        let sortedData = [...response.data];
        switch (order) {
          case "rating":
            sortedData.sort((a, b) => b.rating - a.rating);
            break;
          case "easy":
            sortedData.sort((a, b) => b.easy - a.easy);
            break;
          case "medium":
            sortedData.sort((a, b) => b.medium - a.medium);
            break;
          case "hard":
            sortedData.sort((a, b) => b.hard - a.hard);
            break;
          case "total-questions":
          default:
            sortedData.sort((a, b) => b.totalSolved - a.totalSolved);
        }

        setLeetcodeData(sortedData);
        setIsLoading(0);
      } catch (error) {
        setIsLoading(0);
        console.error("Error fetching LeetCode data:", error.message);
      }
    };

    fetchData();
  }, [order]); 

  return (
    <div className={`BoardWrapper container ${theme === "light" ? "lightBoard" : "darkBoard"}`}>
      {leetcodeData.length === 0 ? (
        <div className="AddUserNameMessage">
          <h1>
            Welcome to leaderboard of our VJTI peeps!
            If you are not able to see the leaderboard,
            try after some time — our server may be down.
          </h1>
        </div>
      ) : null}
      
      {leetcodeData.map((u, index) => (
        <NewCard
          key={u.id}
          username={u.Username}
          rank={index + 1}
          totalQuestions={u.totalSolved}
          easySolved={u.easy}
          mediumSolved={u.medium}
          hardSolved={u.hard}
          rating={u.rating}
          totalEasy={871}
          totalMedium={1821}
          totalHard={819}
        />
      ))}
    </div>
  );
};

export default NewBoard;
