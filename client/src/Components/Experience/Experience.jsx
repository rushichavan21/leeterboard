import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import { Clock, BookOpen, Target, Route, Library, MessageSquare, ArrowLeft } from 'lucide-react';
import './Experience.css';
import Navbar from '../Navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';

const InterviewExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch('/InterviewExperiences.json');
        const jsonData = await response.json();
        const experience = jsonData.experiences.find(exp => exp.id === parseInt(id));
        if (experience) {
          setData(experience);
        } else {
          console.error('Experience not found for id:', id);
        }
      } catch (error) {
        console.error('Error fetching experience:', error);
      }
    };

    fetchExperience();
  }, [id]);

  const handleBack = () => {
    navigate('/discuss');
  };

  if (!data) {
    return (
      <div className="loading-container">
        <div>Loading...</div>
      </div>
    );
  }

  const formatText = (text) => {
    // Split by periods but keep the periods
    // Filter out empty strings and trim each sentence
    return text
      .split('.')
      .filter(sentence => sentence.trim())
      .map(sentence => sentence.trim() + '.');
  };
  

  return (
    <div className="interview-experience-exp">
      <Navbar/>
      <button 
        onClick={handleBack}
        className="back-button-exp"
      >
        <ArrowLeft className="back-icon-exp" />
        Back 
      </button>
      <div className="interview-header-exp">
        <h1>{data.title}</h1>
        <div className="tag-container-exp">
          {data.tags.map((tag, index) => (
            <Badge key={index} className="interview-tag-exp">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="interview-container-exp">

        {/* Basic Criteria */}
        <div className="description-exp">
        <Card className="interview-card-exp">
          <CardHeader>
            <div className="card-header-content-exp">
              <Target className="header-icon-exp blue-icon-exp" />
              <CardTitle>Basic Criteria</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="card-text-exp">{data.basicCriteria}</p>
          </CardContent>
        </Card>

        {/* Pre-interview Preparation */}
        <Card className="interview-card-exp">
          <CardHeader>
            <div className="card-header-content-exp">
              <Route className="header-icon-exp green-icon-exp" />
              <CardTitle>Preparation Journey</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="card-text-exp">{data.preInterviewPreparation}</p>
          </CardContent>
        </Card>

        {/* Interview Summary */}
        <Card className="interview-card-exp">
          <CardHeader>
            <div className="card-header-content-exp">
              <Clock className="header-icon-exp yellow-icon-exp" />
              <CardTitle>Interview Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="summary-grid-exp">
              {Object.entries(data.interviewSummary).map(([key, value]) => (
                <div key={key} className="summary-item-exp">
                  <h3>{key}</h3>
                  <p className='card-text-exp'>{Array.isArray(value) ? value.join(", ") : value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Experience */}
        <Card className="interview-card-exp">
          <CardHeader>
            <div className="card-header-content-exp">
              <BookOpen className="header-icon-exp purple-icon-exp" />
              <CardTitle>Detailed Experience</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="detailed-experience-exp">
            {formatText(data.detailedExperience).map((sentence, index) => (
        <p key={index} className="card-text-exp">
          {sentence}
        </p>
      ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Resources */}
        <Card className="interview-card-exp">
          <CardHeader>
            <div className="card-header-content-exp">
              <Library className="header-icon-exp red-icon-exp" />
              <CardTitle>Recommended Resources</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="resource-list-exp">
              {data.recommendedResources.map((resource, index) => (
                <li className='card-text-exp' key={index}>{resource}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Final Verdict */}
        <Card className="interview-card-exp">
          <CardHeader>
            <div className="card-header-content-exp">
              <MessageSquare className="header-icon-exp indigo-icon-exp" />
              <CardTitle>Final Verdict</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="verdict-container-exp">
              <p className='card-text-exp'>{data.finalVerdict}</p>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewExperience;