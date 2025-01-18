import Navbar from "@/Components/Navbar/Navbar";
import Slider from "@/Components/Slider/Slider";
import "./Interview.css";
import InterviewCard from "@/Components/InterviewCard/InterviewCard";
import { Button } from "@/Components/ui/button";
import ControlSection from "@/Components/Controls-interview/ControlSection";
const Discuss = () => {
  const categories = [
    "Internship",
    "MAANG",
    "Off-Campus",
    "On-Campus",
    "Remote",
  ];
  return (
    <div>
      <Navbar />
      <div className="sidebar--div">
        <Slider />
      </div>
      <div className="title--interview container">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          InterView{" "}
        </span>{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">
          {" "} 
          Experiences{" "}
        </span>
      </div>
      <div className="categories--interview container">
        {categories.map((value) => (
          <button className="categories-button" key={value}>
            {value}
          </button>
        ))}
        <Button>Post New</Button>
        <Button>View your posts</Button>
      </div>
        <div className="subdiv-interview">
          <div className="controls-section">
            {/* <Button>Create</Button>
            <Button>your posts</Button> */}
            <ControlSection/>
          </div>
          <div className="cards-interview">
            <InterviewCard/>
            <InterviewCard/>
            <InterviewCard/>
            <InterviewCard/>
          </div>
        </div>
    </div>
  );
};

export default Discuss;
