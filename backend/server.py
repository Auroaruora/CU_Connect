from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})


# Load clubs data
with open("clubs.json", "r") as file:
    clubs = json.load(file)

liked_clubs = []

@app.route("/", methods=["GET"])
def home():
    return "Welcome to the Campus Connect API! Visit /clubs or /liked-clubs for data."


@app.route("/clubs", methods=["GET"])
def get_clubs():
    return jsonify(clubs)

@app.route("/liked-clubs", methods=["GET", "POST"])
def manage_liked_clubs():
    global liked_clubs
    if request.method == "POST":
        print("POST request received")  # Debugging line
        print(f"Request JSON: {request.json}")  # Debugging line to log incoming data
        new_club = request.json
        if new_club not in liked_clubs:
            liked_clubs.append(new_club)
            print(f"Updated liked_clubs: {liked_clubs}")  # Log the updated list
        return jsonify({"message": "Club added to liked list!", "liked_clubs": liked_clubs}), 201
    elif request.method == "GET":
        print(f"Returning liked_clubs: {liked_clubs}")  # Debugging line
        return jsonify(liked_clubs)


@app.route("/liked-clubs/<int:club_id>", methods=["DELETE"])
def delete_liked_club(club_id):
    global liked_clubs
    print(f"Deleting club with id: {club_id}")  # Debugging line
    liked_clubs = [club for club in liked_clubs if int(club.get("id", -1)) != club_id]  # Make sure id is cast to int
    print(f"Updated liked_clubs after deletion: {liked_clubs}")  # Log the updated list
    return jsonify({"message": "Club deleted successfully"}), 200

@app.route("/liked-clubs/<int:club_id>", methods=["GET"])
def get_club(club_id):
    global liked_clubs
    club = next((club for club in liked_clubs if club["id"] == club_id), None)
    if club is None:
        return jsonify({"error": "Club not found"}), 404
    return jsonify(club)



if __name__ == "__main__":
    app.run(debug=True)
