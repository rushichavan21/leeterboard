import { Button } from "../ui/button";
import "./InterviewCard.css";

const InterviewCard = () => {
  return (
    <div className="interview-card">
      <div className="card-glass">
        <div className="header-section">
          <div className="name-section">
            <h2>Unknown</h2>
            <div className="tag-i-card">internship</div>
          </div>
        </div>

        <div className="company-section">
          <div className="company-logo">
            <h3>Google</h3>
          </div>
          <div className="ctc-badge">
            <span>CTC</span>
            60 LPA
          </div>
        </div>
        <div className="testimonial-section">
          <p>{`Got selected in first round itself`}</p>
          <div className="view-button">
            <Button
              className="px-8 rounded-full"
            >View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
