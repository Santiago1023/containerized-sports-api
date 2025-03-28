from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

app = Flask(__name__)
CORS(app)

# SerpAPI base URL and API key
load_dotenv()
SERP_API_URL = "https://serpapi.com/search.json"
SERP_API_KEY = os.getenv("SPORTS_API_KEY")
if not SERP_API_KEY:
    raise ValueError("Error: SPORTS_API_KEY no está definida en el entorno.")

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

@app.route('/sports', methods=['GET'])
def get_sports_schedule():
    print("API Key:", SERP_API_KEY)  # Verifica que no esté en None o vacío
    # Obtain the param q to the url
    query = request.args.get('q', 'nfl schedule')
    if not query:
        return jsonify({"message": "Query parameter 'q' is required."}), 400
    try:
        # Query SerpAPI con el parámetro recibido
        params = {
            "engine": "google",
            "q": query,  # Aquí se usa el parámetro dinámico
            "api_key": SERP_API_KEY
        }
        response = requests.get(SERP_API_URL, params=params)
        print('response: ', response)
        response.raise_for_status()
        data = response.json()
        print('data: ', data)
        
        # Extraer los resultados de la programación
        sports_results = data.get("sports_results", {})
        games = sports_results.get("games")
        game_spotlight = sports_results.get("game_spotlight")
        title = sports_results.get("title", '')
        thumbnail = sports_results.get("thumbnail", "")
        
        if not games and not game_spotlight:
            return jsonify({"message": f"No schedule available for {query}.", "games": []}), 200

        if game_spotlight:
            games = [game_spotlight]
        formatted_games = []
        for game in games:
            teams = game.get("teams", [])
            away_team = teams[0].get("name", "Unknown") if len(teams) > 0 else "Unknown"
            away_team_thumbnail = teams[0].get("thumbnail", "Unknown") if len(teams) > 0 else "Unknown"
            home_team = teams[1].get("name", "Unknown") if len(teams) > 1 else "Unknown"
            home_team_thumbnail = teams[1].get("thumbnail", "Unknown") if len(teams) > 1 else "Unknown"

            game_info = {
                "away_team": away_team,
                "away_team_thumbnail": away_team_thumbnail,
                "home_team": home_team,
                "home_team_thumbnail": home_team_thumbnail,
                "venue": game.get("venue", "Unknown"),
                "date": game.get("date", "Unknown"),
                "status": game.get("status", "Unknown"),
                "time": f"{game.get('time', 'Unknown')} ET" if game.get("time") else "Unknown"
            }
            formatted_games.append(game_info)
        return jsonify({
            "message": f"{query} schedule fetched successfully.",
            "title": title,
            "thumbnail": thumbnail,
            "games": formatted_games
        }), 200
    
    except Exception as e:
        return jsonify({"message": "An error occurred.", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)