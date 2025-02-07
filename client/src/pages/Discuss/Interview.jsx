import Navbar from "@/Components/Navbar/Navbar";
import Slider from "@/Components/Slider/Slider";
import "./Interview.css";
import InterviewCard from "@/Components/InterviewCard/InterviewCard";
import { Button } from "@/Components/ui/button";
import React, { useState, useEffect } from "react";

const Discuss = () => {
  const categories = [
    "All",
    "Internship",
    "MAANG",
    "Full-Time",
    "Startup",
    "Product"
  ];

  const [interviewCards, setInterviewCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    // Fetch the interview cards data from the JSON file
    const fetchCards = async () => {
      try {
        const response = await fetch("/InterviewCards.json");
        const data = await response.json();
        setInterviewCards(data.cards);
        setFilteredCards(data.cards); // Initially show all cards
      } catch (error) {
        console.error("Error fetching interview cards:", error);
      }
    };

    fetchCards();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredCards(interviewCards);
    } else {
      const filtered = interviewCards.filter((card) => 
        card.tags.includes(category)
      );
      setFilteredCards(filtered);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="sidebar--div">
        <Slider />
      </div>
      <div className="posi-fix-interview">
        <div className="title--interview container">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Interview {" "}
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">
            Experiences
          </span>
        </div>
        <div className="categories--interview container">
          {categories.map((category) => (
            <button
              key={category}
              className={`categories-button ${activeCategory === category ? "active" : ""}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="cards-interview">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <InterviewCard key={card.id} card={card} />
          ))
        ) : (
          <p className="text-gray-500 text-lg">No cards available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Discuss;