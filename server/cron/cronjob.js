const path = require("path");
require("dotenv").config();
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

const axios = require("axios");

const sendDiscordMessage = async (message) => {
  const webhookUrl = `${process.env.DISCORD_WEBHOOK}`; 
  try {
    await axios.post(webhookUrl, { content: message });
  } catch (error) {
    console.error(" Discord webhook error:", error.message);
  }
};
const updateLeetCodeData = async () => {
  const usernames = await getUsernames();
  const modulePath = path.resolve(__dirname, "../leetcodeData/newReq.mjs");
  const moduleURL = pathToFileURL(modulePath);
  const { getLeetcodeData } = await import(moduleURL.href);

  let summary = `📊 **Leeterboard Updates :**\n`;
  let changedUsersCount = 0;
  const tasks = usernames.map(async (username) => {
    try {
      const newInfo = await getLeetcodeData(username);
      if (!newInfo) return;

      let { totalSolved, easy, medium, hard, rating, contests } = newInfo;
      rating = Number(rating.toFixed(2));

      const { data: oldData, error: fetchErr } = await supabase
        .from("LeeterBoard-usernames")
        .select("totalSolved, easy, medium, hard, rating")
        .eq("Username", username)
        .single();

      if (fetchErr || !oldData) {
        console.error(`Fetch error for ${username}:`, fetchErr?.message);
        return;
      }

      const changes = [];

      if (totalSolved !== oldData.totalSolved)
        changes.push(`   🧠 Total: ${oldData.totalSolved} → ${totalSolved} (${totalSolved - oldData.totalSolved > 0 ? "+" : ""}${totalSolved - oldData.totalSolved})`);
      if (easy !== oldData.easy)
        changes.push(`   🟢 Easy: ${oldData.easy} → ${easy} (${easy - oldData.easy > 0 ? "+" : ""}${easy - oldData.easy})`);
      if (medium !== oldData.medium)
        changes.push(`   🟠 Medium: ${oldData.medium} → ${medium} (${medium - oldData.medium > 0 ? "+" : ""}${medium - oldData.medium})`);
      if (hard !== oldData.hard)
        changes.push(`   🔴 Hard: ${oldData.hard} → ${hard} (${hard - oldData.hard > 0 ? "+" : ""}${hard - oldData.hard})`);
      if (rating !== oldData.rating)
        changes.push(`   📊 Rating: ${oldData.rating} → ${rating} (${(rating - oldData.rating > 0 ? "+" : "") + (rating - oldData.rating).toFixed(2)})`);

      if (changes.length > 0) {
        summary += `👤 ${username}\n` + changes.join("\n") + `\n\n`;
        changedUsersCount++;
      }

      const { error: updateErr } = await supabase
        .from("LeeterBoard-usernames")
        .update({ totalSolved, easy, medium, hard, rating, contests })
        .eq("Username", username);

      if (updateErr) {
        console.error(`Error updating ${username}:`, updateErr.message);
      }
    } catch (err) {
      console.error(`Failed for ${username}:`, err.message);
    }
  });

  await Promise.all(tasks);

  if (changedUsersCount > 0) {
    await sendDiscordMessage(summary);
  } else {
    console.log("No changes to sync.");
  }
};


module.exports = updateLeetCodeData;
