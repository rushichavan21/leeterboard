import { useEffect} from "react";
import axios from "axios";
import { useToast } from "../../Hooks/use-toast";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useAuthContext } from "../../Hooks/useAuthContext";
import Card from "../Card/Card";
import "./Board.css";
import { useSetRecoilState, useRecoilState } from "recoil";
import { useTheme} from "@/Context/theme-provider";
import { useNavigate } from "react-router-dom";
import {
  loadingAtom,
  leetcodeDataAtom,
  usernameAtom,
  arrayDataAtom,
} from "../../Atoms/Atoms";


const Board = () => {
  const {theme}=useTheme();
  let newUsernameToUpdate = "";
  const { toast } = useToast();
  const { user } = useAuthContext();
  const token = user.token;
  const setIsLoading = useSetRecoilState(loadingAtom);
  const [arrayData, setArrayData] = useRecoilState(arrayDataAtom);
  const [newUsername, setNewUsername] = useRecoilState(usernameAtom);
  const [leetcodeData, setLeetcodeData] = useRecoilState(leetcodeDataAtom);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  // This function will fetch the single username and will add it to the existing array
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

        toast({
          title: `${trimmedUsername} was successfully Added`
        });
      }
    } catch (err) {
      setIsLoading(0);
      toast({
        variant: "destructive",
        title: "Enter a valid Leetcode Username"
      });
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
  };

  // Fetch the leetcode stats from the UserNames Array on the database

  const fetchLeetcodeData = async () => {
    setIsLoading(1);
  
    try {
      const requests = arrayData.map(username =>
        axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/data/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(response => ({
          username,
          leetcodeData: response.data,
        }))
      );
  
      const data = await Promise.all(requests);
  
      const sortedData = data.sort(
        (a, b) => b.leetcodeData.totalSolved - a.leetcodeData.totalSolved
      );
  
  
      setLeetcodeData(sortedData);
    } catch (error) {
      console.error(
        "Error fetching LeetCode data:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(0);
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
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      }
      setIsLoading(0);
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
    if (arrayData.length >= 0) {
      fetchLeetcodeData();
    }
  }, [arrayData]);

  return (
    <div
      className={`BoardWrapper container ${
        theme==="light"?"lightBoard":"darkBoard"
      }`}
    >
      {leetcodeData.length === 0 ? (
        <div className="AddUserNameMessage">
          <h1>
            Add your leetcode group here, check real-time ranks, compete, and
            climb to the top of your custom leaderboard!
          </h1>
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
          totalMedium={userData.leetcodeData.totalMedium}
          totalHard={userData.leetcodeData.totalHard}
          arrayData={arrayData}
          setArrayData={setArrayData}
          leetcodeData={leetcodeData}
          setLeetcodeData={setLeetcodeData}
          setIsLoading={setIsLoading}
        />
      ))}
      {leetcodeData.length < 15 ? (
        <div className="AddUserNameFuncion container tester ">
          <div className=" flex w-full max-w-sm items-center space-x-2">
           
            <Input
              type="text"
              placeholder="Enter the username"
              value={newUsername}
              onChange={handleUsernameChange}
              // className="addUsernameInput border-solid border-2  border-yellow-100"
              className={`addUsernameInput border-solid border-2 ${theme==="light"?"border-amber-900  ":"border-yellow-100"} `}
         
            />
            <Button
              variant="secondary"
              onClick={handleAddUsername}
              className={`border-solid border-2 ${theme==="light"?"border-amber-900  ":"border-yellow-100"}`}
            >
              Add
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Board;
