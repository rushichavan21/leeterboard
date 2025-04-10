import { request, gql } from "graphql-request";
const getLeetcodeData = async (username) => {
  const query = gql`
    query userProfile($username: String!) {
      allQuestionsCount { difficulty count }
      matchedUser(username: $username) {
        problemsSolvedBeatsStats { difficulty percentage }
        submitStatsGlobal { acSubmissionNum { difficulty count } }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
      }
    }
  `;

  const endpoint = "https://leetcode.com/graphql";
  const variables = { username };

  try {
    const data = await request(endpoint, query, variables);
    return {
      totalSolved: data.matchedUser.submitStatsGlobal.acSubmissionNum.find(q => q.difficulty === "All").count,
      easy: data.matchedUser.submitStatsGlobal.acSubmissionNum.find(q => q.difficulty === "Easy").count,
      medium: data.matchedUser.submitStatsGlobal.acSubmissionNum.find(q => q.difficulty === "Medium").count,
      hard: data.matchedUser.submitStatsGlobal.acSubmissionNum.find(q => q.difficulty === "Hard").count,
      rating: data.userContestRanking?.rating || 0,
      contests: data.userContestRanking?.attendedContestsCount || 0,
    };
  } catch (err) {
    console.error(`Failed to fetch data for ${username}:`, err.message);
    return null;
  }
};

export { getLeetcodeData };

