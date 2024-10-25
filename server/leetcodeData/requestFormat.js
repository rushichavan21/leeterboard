const query = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      profile {
        ranking
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
        totalSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;


const formatData = (data) => {
    let sendData = {
      totalSolved: data.matchedUser.submitStats.acSubmissionNum[0].count,
      totalSubmissions: data.matchedUser.submitStats.totalSubmissionNum,
      totalQuestions: data.allQuestionsCount[0].count,
      easySolved: data.matchedUser.submitStats.acSubmissionNum[1].count,
      totalEasy: data.allQuestionsCount[1].count,
      mediumSolved: data.matchedUser.submitStats.acSubmissionNum[2].count,
      totalMedium: data.allQuestionsCount[2].count,
      hardSolved: data.matchedUser.submitStats.acSubmissionNum[3].count,
      totalHard: data.allQuestionsCount[3].count,
      ranking: data.matchedUser.profile.ranking,
    };
  
    return sendData;
  };
  

  const fetch = require('node-fetch'); 

exports.leetcodeData = async (req, res) => {
    let user = req.params.id;

    try {
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com'
            },
            body: JSON.stringify({query: query, variables: {username: user}})
        });

        const data = await response.json();

        if (data.errors) {
            console.error('LeetCode API Error:', data.errors);
            return res.status(400).json({ error: 'Error fetching data from LeetCode', details: data.errors });
        }

        res.json(formatData(data.data)); 

    } catch (err) {
        console.error('Network or Fetch Error:', err);
        res.status(500).json({ error: 'Server error or LeetCode API unreachable', details: err });
    }
};
