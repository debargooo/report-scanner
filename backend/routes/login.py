from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
import mysql.connector

login_user = Blueprint("login", __name__)

# Database Connection
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "Moumita#2024",
    "database": "medintel"
}

@login_user.route("/api/login", methods=["POST"])
def login():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        # Check if email exists in the database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        cursor.execute("SELECT name, password FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        connection.close()

        if user and check_password_hash(user["password"], password):
            return jsonify({"message": "Login successful", "name": user["name"]}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500
