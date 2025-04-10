const path = require("path");
const { pathToFileURL } = require("url");
const supabase = require("../supaDB/config");

const getUsernames = async () => {
  const { data, error } = await supabase
    .from("LeeterBoard-usernames")
    .select("Username");

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return [];
  }

  return data.map((row) => row.Username);
};

const updateLeetCodeData = async () => {
  const usernames = await getUsernames();
  const modulePath = path.resolve(__dirname, "../leetcodeData/newReq.mjs");
  const moduleURL = pathToFileURL(modulePath);
  const { getLeetcodeData } = await import(moduleURL.href);

  for (const username of usernames) {
    try {
      const info = await getLeetcodeData(username);
      console.log(info);
      if (!info) continue;

      let {
        totalSolved,
        easy,
        medium,
        hard,
        rating,
        contests,
      } = info;
      
      rating = Number(rating.toFixed(2));
      const { error } = await supabase
        .from("LeeterBoard-usernames")
        .update({
          totalSolved,
          easy: easy,
          medium: medium,
          hard: hard,
          rating,
          contests: contests,
        })
        .eq("Username", username);
      if (error) {
        console.error(`Error updating ${username}:`, error.message);
      } else {
        console.log(`Updated ${username}`);
      }
    } catch (err) {
      console.error(`Failed for ${username}:`, err.message);
    }
  }
};

module.exports = updateLeetCodeData;
