
import '../Styles/LeetCodeProfile.css'
import { useEffect, useState } from 'react';

const LeetCodeProfile = ({ userId }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/data/${userId}`);
        const data = await response.json();
        setProfileData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchLeetCodeData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="leetcode-profile container">
      <h1>LeetCode Profile</h1>
      <p><strong>Total Solved:</strong> {profileData.totalSolved}</p>
      <p><strong>Ranking:</strong> {profileData.ranking}</p>

      <h2>Submissions by Difficulty:</h2>
      <ul>
        <li><strong>Easy:</strong> {profileData.easySolved} solved / {profileData.totalEasy} total</li>
        <li><strong>Medium:</strong> {profileData.mediumSolved} solved / {profileData.totalMedium} total</li>
        <li><strong>Hard:</strong> {profileData.hardSolved} solved / {profileData.totalHard} total</li>
      </ul>

      <h2>Submission Stats:</h2>
      <ul>
        {profileData.totalSubmissions.map((submission, index) => (
          <li key={index}>
            <strong>{submission.difficulty}:</strong> {submission.count} submissions
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeetCodeProfile;
