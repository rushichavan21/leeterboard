import "../../Components/Card/Card.css";
import "./vjticustom.css";
import React from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useToast } from "../../Hooks/use-toast";
import { useTheme } from "@/Context/theme-provider";
import { Button } from "@/Components/ui/button";
import { useCallback } from "react";

const ProgressBar = ({ progress, styles, numerator, denominator }) => {
  return (
    <div className="progress-bar-container">
      <div
        className={`progress-bar-fill ${styles}`}
        style={{ width: `${Math.min(progress, 100)}%` }}
      ></div>
      <span className="progress-percentage">{progress}%</span>
      <span className="solvedData">{numerator} / {denominator}</span>
    </div>
  );
};

const NewCard = React.memo(({
  username,
  rank,
  totalQuestions,
  easySolved,
  mediumSolved,
  hardSolved,
  totalEasy,
  totalMedium,
  totalHard,
  rating
}) => {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const { theme } = useTheme();

  // Memoize the handleVisit function
  const handleVisit = useCallback(() => {
    const link = `https://leetcode.com/u/${username}`;
    window.open(link, "_blank", "noopener noreferrer");
  }, [username]);

  const easyPercentage = ((easySolved / totalEasy) * 100).toFixed(2);
  const mediumPercentage = ((mediumSolved / totalMedium) * 100).toFixed(2);
  const hardPercentage = ((hardSolved / totalHard) * 100).toFixed(2);

  return (
    <div className={`CardWrapper container ${theme === "light" ? "lightCard" : "darkCard"}`}>
      <div className="info-card">
        <div className="infoInfo">
          <h3>{username}</h3>
          <h3>LeeterBoard Rank: {rank}</h3>
          <h3>
            Total Questions:{" "}
            <span className={theme === "light" ? "totalQuestionsLight" : "totalQuestionsDark"}>
              {totalQuestions}
            </span>
          </h3>
        </div>

        <div className="card-last">
          <div className="Rating-div">Rating: {rating}</div>
          <Button variant="outline" onClick={handleVisit} id="visit">
            Visit
          </Button>
        </div>
      </div>

      <div className="stats">
        <div className="easy">
          <span>Easy: </span>
          <ProgressBar
            progress={easyPercentage}
            styles="easybar"
            numerator={easySolved}
            denominator={totalEasy}
          />
        </div>

        <div className="medium">
          <span>Medium: </span>
          <ProgressBar
            progress={mediumPercentage}
            styles="mediumbar"
            numerator={mediumSolved}
            denominator={totalMedium}
          />
        </div>

        <div className="hard">
          <span>Hard: </span>
          <ProgressBar
            progress={hardPercentage}
            styles="hardbar"
            numerator={hardSolved}
            denominator={totalHard}
          />
        </div>
      </div>
    </div>
  );
});

export default NewCard;
