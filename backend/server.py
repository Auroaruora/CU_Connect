from flask import Flask, request, jsonify
import json

app = Flask(__name__)

with open("clubs.json", "r") as file:
    clubs = json.load(file)

liked_clubs = []

@app.route("/clubs", methods=["GET"])
def get_clubs():
    return jsonify(clubs)

@app.route("/liked-clubs", methods=["GET", "POST"])
def manage_liked_clubs():
    global liked_clubs
    if request.method == "POST":
        club = request.json
        if club not in liked_clubs:
            liked_clubs.append(club)
        return jsonify({"message": "Club added to liked list"}), 201
    return jsonify(liked_clubs)

if __name__ == "__main__":
    app.run(debug=True)
