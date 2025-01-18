// ControlSection.jsx
import  { useState } from 'react';
import './ControlSection.css';
import { Button } from '../ui/button';

const ControlSection = () => {
  const [minCtc, setMinCtc] = useState(0);
  const [maxCtc, setMaxCtc] = useState(100);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxCtc);
    setMinCtc(value);
    document.getElementById('minSlider').value = value;
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minCtc);
    setMaxCtc(value);
    document.getElementById('maxSlider').value = value;
  };

  return (
    <div className="controls-section">
      <div className="ctc-card">
        <h3 className="ctc-title">CTC Range (LPA)</h3>
        
        <div className="input-group">
          <div className="input-container">
            <label>Min CTC</label>
            <input
              type="number"
              value={minCtc}
              onChange={handleMinChange}
              className="ctc-input"
              min="0"
              max={maxCtc}
            />
          </div>
          <div className="input-container">
            <label>Max CTC</label>
            <input
              type="number"
              value={maxCtc}
              onChange={handleMaxChange}
              className="ctc-input"
              min={minCtc}
              max="100"
            />
          </div>
        </div>

        <div className="slider-container">
          <input
            type="range"
            id="minSlider"
            min="0"
            max="100"
            value={minCtc}
            onChange={handleMinChange}
            className="slider"
          />
          <input
            type="range"
            id="maxSlider"
            min="0"
            max="100"
            value={maxCtc}
            onChange={handleMaxChange}
            className="slider"
          />
        <div>
        <Button variant="outline">search</Button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ControlSection;