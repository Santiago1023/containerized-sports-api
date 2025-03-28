"use client";
import styles from "./page.module.css";
import { useState } from "react";
import axios from "axios";

const BACKEND_URL = 'https://ujz6ozv82d.execute-api.us-east-1.amazonaws.com/dev';

export default function Home() {
  const [scheduleData, setScheduleData] = useState({
    games: [],
    title: "",
    thumbnail: "",
  });
  const [isLoading, setIsLoading] = useState(false); 
  const [selectedSport, setSelectedSport] = useState("");

  const handleFetchSchedule = async (sport) => {
    setSelectedSport(sport);
    setIsLoading(true); 
    try {
      const response = await axios.get(`${BACKEND_URL}/sports`, {
        params: { q: `${sport} schedule` },
      });
      console.log("response :", response);
      setScheduleData({
        games: response.data.games,
        title: response.data.title,
        thumbnail: response.data.thumbnail,
      });
    } catch (error) {
      console.log(error);
      setScheduleData({ games: [], title: "", thumbnail: "" });
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className={`${styles.main}`}>
      <h1>Welcome to Sports Scheduling</h1>
      <h3>What schedule do you want?</h3>
      <div className={styles.buttons}>
        <button
          onClick={() => handleFetchSchedule("nfl")}
          className={selectedSport === "nfl" ? "selected" : ""}
        >
          NFL Schedule
        </button>
        <button
          onClick={() => handleFetchSchedule("nba")}
          className={selectedSport === "nba" ? "selected" : ""}
        >
          NBA Schedule
        </button>
        <button
          onClick={() => handleFetchSchedule("mlb")}
          className={selectedSport === "mlb" ? "selected" : ""}
        >
          MLB Schedule
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{scheduleData.title}</h2>
          {scheduleData.thumbnail && (
            <img src={scheduleData.thumbnail} alt="Thumbnail" />
          )}
        </>
      )}

      <div className={`${styles.dataContainer}`}>
        {scheduleData.games.length > 0 ? (
          <>
            {scheduleData.games.map((game, index) => (
              <div className={styles.dataContainerItem} key={index}>
                {game.away_team && game.home_team ? (
                  <>
                    <div className={styles.teamvsteam}>
                      <div className={styles.team}>
                        <img src={game.away_team_thumbnail} alt="Thumbnail" />
                        <p>{game.away_team}</p>
                      </div>
                      <p>VS</p>
                      <div className={styles.team}>
                        <img src={game.home_team_thumbnail} alt="Thumbnail" />
                        <p>{game.home_team}</p>
                      </div>
                    </div>
                    <p>Venue: {game.venue || "Unknown Venue"}</p>
                    <p>Date: {game.date || "Unknown Date"}</p>
                    <p>Time: {game.time || "Unknown Time"}</p>
                    <p>Status: {game.status || "Unknown Status"}</p>
                  </>
                ) : (
                  <p>Some game data is missing</p>
                )}
              </div>
            ))}
          </>
        ) : (
          <span>No data available</span>
        )}
      </div>
    </div>
  );
}
