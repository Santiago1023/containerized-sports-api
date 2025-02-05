// "use client";
// import styles from "./page.module.css";
// import { useState } from "react";
// import axios from "axios";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// const datos = {
//   message: "NFL schedule fetched successfully.",
//   data: [
//     {
//       away_team: "Dallas Cowboys",
//       away_team_thumbnail:
//         "https://upload.wikimedia.org/wikipedia/commons/a/a6/Dallas_Cowboys_logo.svg",
//       home_team: "New York Giants",
//       home_team_thumbnail:
//         "https://upload.wikimedia.org/wikipedia/commons/4/44/New_York_Giants_logo.svg",
//       venue: "MetLife Stadium",
//       date: "2025-02-05",
//       status: "Scheduled",
//       time: "8:20 PM ET",
//     },
//     {
//       away_team: "Kansas City Chiefs",
//       away_team_thumbnail:
//         "https://upload.wikimedia.org/wikipedia/commons/a/a2/Kansas_City_Chiefs_logo.svg",
//       home_team: "Los Angeles Chargers",
//       home_team_thumbnail:
//         "https://upload.wikimedia.org/wikipedia/commons/9/90/Los_Angeles_Chargers_logo.svg",
//       venue: "SoFi Stadium",
//       date: "2025-02-06",
//       status: "Scheduled",
//       time: "7:00 PM ET",
//     },
//     {
//       away_team: "Green Bay Packers",
//       away_team_thumbnail:
//         "https://upload.wikimedia.org/wikipedia/commons/5/5e/Green_Bay_Packers_logo.svg",
//       home_team: "Chicago Bears",
//       home_team_thumbnail:
//         "https://upload.wikimedia.org/wikipedia/commons/5/5f/Chicago_Bears_logo.svg",
//       venue: "Soldier Field",
//       date: "2025-02-07",
//       status: "Scheduled",
//       time: "4:30 PM ET",
//     },
//   ],
//   title: "NFL Schedule",
//   thumbnail:
//     "https://upload.wikimedia.org/wikipedia/commons/2/2d/National_Football_League_Logo.svg",
// };

// export default function Home() {
//   // const [scheduleData, setScheduleData] = useState([]);
//   const [scheduleData, setScheduleData] = useState({ games: [], title: '', thumbnail: '' });
//   // const [scheduleData, setScheduleData] = useState({
//   //   games: datos.data,
//   //   title: datos.title,
//   //   thumbnail: datos.thumbnail,
//   // });

//   const handleFetchSchedule = async (sport) => {
//     try {
//       const response = await axios.get(`${BACKEND_URL}/sports`, {
//         params: { q: `${sport} schedule` },
//       });
//       console.log("response :", response);
//       console.log("data : ", response.data);
//       // setScheduleData(response.data.games);
//       setScheduleData({
//         games: response.data.games,
//         title: response.data.title,
//         thumbnail: response.data.thumbnail,
//       });
//     } catch (error) {
//       console.log(error);
//       // setScheduleData([]);
//       setScheduleData({ games: [], title: "", thumbnail: "" });
//     }
//   };

//   return (
//     <div className={`${styles.main} `}>
//       <h1>Welcome to Sports Scheduling</h1>
//       <h3>What schedule do you want?</h3>
//       <div className={styles.buttons}>
//         <button onClick={() => handleFetchSchedule("nfl")}>NFL Schedule</button>
//         <button onClick={() => handleFetchSchedule("nba")}>NBA Schedule</button>
//         <button onClick={() => handleFetchSchedule("mlb")}>MLB Schedule</button>
//       </div>

//       <h2>{scheduleData.title}</h2>
//       <img src={scheduleData.thumbnail} alt="Thumbnail" />
//       <div className={`${styles.dataContainer} debug`}>
//         {scheduleData.games.length > 0 ? (
//           <>
//             {scheduleData.games.map((game, index) => (
//               <div className={styles.dataContainerItem} key={index}>
//                 {game.away_team && game.home_team ? (
//                   <>
//                     <div className={styles.teamvsteam}>
//                       <div className={styles.team}>
//                         <img src={game.away_team_thumbnail} alt="Thumbnail" />
//                         <p>{game.away_team}</p>
//                       </div>
//                       <p>VS</p>
//                       <div className={styles.team}>
//                         <img src={game.home_team_thumbnail} alt="Thumbnail" />
//                         <p>{game.home_team}</p>
//                       </div>
//                     </div>
//                     <p>Venue: {game.venue || "Unknown Venue"}</p>
//                     <p>Date: {game.date || "Unknown Date"}</p>
//                     <p>Time: {game.time || "Unknown Time"}</p>
//                     <p>Status: {game.status || "Unknown Status"}</p>
//                   </>
//                 ) : (
//                   <p>Some game data is missing</p>
//                 )}
//               </div>
//             ))}
//           </>
//         ) : (
//           <span>No data available</span>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import styles from "./page.module.css";
import { useState } from "react";
import axios from "axios";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const BACKEND_URL = 'https://87evphhx3h.execute-api.us-east-1.amazonaws.com/dev';

export default function Home() {
  const [scheduleData, setScheduleData] = useState({
    games: [],
    title: "",
    thumbnail: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga
  const [selectedSport, setSelectedSport] = useState("");

  const handleFetchSchedule = async (sport) => {
    setSelectedSport(sport);
    setIsLoading(true); // Empieza la carga
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
      setIsLoading(false); // Termina la carga
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

      {/* Condición para mostrar el título y la imagen solo cuando no estemos cargando */}
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
