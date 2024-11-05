const query = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      profile {
        ranking
        starRating 
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
    userContestRanking(username: $username) {
      attendedContestsCount  
      rating
    }
  }
`;
const query2 = `
  query getUserAttendedContests($username: String!) {
    userContestRanking(username: $username) {
      attendedContestsCount  
      rating
    }
  }
`;


const formatData = (data, attendedContests = 0, rating = 0) => {
  let sendData = {
    totalSolved: data.matchedUser.submitStats.acSubmissionNum[0]?.count || 0,
    totalSubmissions: data.matchedUser.submitStats.totalSubmissionNum || [],
    totalQuestions: data.allQuestionsCount[0]?.count || 0,
    easySolved: data.matchedUser.submitStats.acSubmissionNum[1]?.count || 0,
    totalEasy: data.allQuestionsCount[1]?.count || 0,
    mediumSolved: data.matchedUser.submitStats.acSubmissionNum[2]?.count || 0,
    totalMedium: data.allQuestionsCount[2]?.count || 0,
    hardSolved: data.matchedUser.submitStats.acSubmissionNum[3]?.count || 0,
    totalHard: data.allQuestionsCount[3]?.count || 0,
    rating: rating,
    attendedContests: attendedContests, 
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
            body: JSON.stringify({ query: query, variables: { username: user } })
        });

        const data = await response.json();

        if (data.errors) {
            console.error('LeetCode API Error:', data.errors);
            return res.status(400).json({ error: 'Error fetching data from LeetCode', details: data.errors });
        }

        const userContestRanking = data.data.userContestRanking;

     
        let attendedContests = 0;
        let rating = 0;

        if (!userContestRanking) {
            
            console.log('User has not attended any contests.');
        } else {
        
            attendedContests = userContestRanking.attendedContestsCount || 0;

            if (attendedContests > 0) {
                const ratingResponse = await fetch('https://leetcode.com/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Referer': 'https://leetcode.com'
                    },
                    body: JSON.stringify({ query: query2, variables: { username: user } })
                });

                const ratingData = await ratingResponse.json();

                if (ratingData.errors) {
                    console.error('LeetCode API Error (rating):', ratingData.errors);
                    return res.status(400).json({ error: 'Error fetching rating from LeetCode', details: ratingData.errors });
                }

                rating = ratingData.data.userContestRanking ? ratingData.data.userContestRanking.rating || 0 : 0;
            }
        }


        const formattedData = formatData(data.data);
        formattedData.attendedContests = attendedContests; 
        formattedData.rating = rating; 

        res.json(formattedData); 

    } catch (err) {
        console.error('Network or Fetch Error:', err);
        res.status(500).json({ error: 'Server error or LeetCode API unreachable', details: err });
    }
};


