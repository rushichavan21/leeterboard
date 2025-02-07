import React from 'react';
import "./InterviewCard.css"
import { useNavigate } from 'react-router-dom';

const Building2Icon = () => (
  <svg className="icon-i-card" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4M3 9h18M9 16v2m6-2v2"/>
  </svg>
);

const RupeeIcon = () => (
  <svg className="icon-i-card" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 16V4h22v12H1z M12 20v-4"/>
  </svg>
);

const InterviewCard = ({ card }) => {
  const navigate = useNavigate();
  const { name, company, ctc, tags, testimonial } = card;
  
  // Generate consistent but random-looking colors for tags
  const getTagColor = (tag) => {
    const colors = [
      { bg: '#553C9A', text: '#ffffff' },
      { bg: '#2B6CB0', text: '#ffffff' },
      { bg: '#2F855A', text: '#ffffff' },
      { bg: '#C53030', text: '#ffffff' },
      { bg: '#B7791F', text: '#ffffff' }
    ];
    const index = tag.length % colors.length;
    return colors[index];
  };

  const handleCardClick = () => {
    navigate(`/experience/${card.id}`);
  };

  return (
    <div className="card-i-card" onClick={handleCardClick}>
      <div className="card-header-i-card">
        <div className="header-content-i-card">
          <div>
            <h3 className="title-i-card">{name}</h3>
            <div className="company-i-card">
              <Building2Icon />
              <span className="company-name-i-card">{company}</span>
            </div>
          </div>
          <div className="ctc-i-card">
            <RupeeIcon />
            <span className="ctc-text-i-card">{ctc}</span>
          </div>
        </div>
      </div>
      
      <div className="card-content-i-card">
        <div className="tags-i-card">
          {tags.map((tag, index) => {
            const colorStyle = getTagColor(tag);
            return (
              <span
                key={index}
                className="tag-i-card"
                style={{ 
                  backgroundColor: colorStyle.bg,
                  color: colorStyle.text
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
        <p className="testimonial-i-card">{testimonial}</p>
      </div>
      
      <div className="card-footer-i-card">
        <button className="read-more-i-card">
          Read Full Experience →
        </button>
      </div>
    </div>
  );
};

export default InterviewCard;