from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
import mysql.connector
import re
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

auth = Blueprint("auth", __name__)

# Database Connection
db_config = {
    "host": "localhost",
    "user": "Sanket",
    "password": "Sanket7044",
    "database": "medintel"
}

# Email Configuration
EMAIL_ADDRESS = "eduler.notes@gmail.com"
EMAIL_PASSWORD = "clki pyqk gcay zmbk"

# Function to send email
def send_email(to_email, user_name):
    subject = "Welcome to Our Platform"
    body = f"Hello {user_name},\n\nThank you for registering!\n\nBest regards,\nTeam Eduler"

    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.sendmail(EMAIL_ADDRESS, to_email, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

# Password Validation Function
def validate_password(password):
    pattern = r"^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    return bool(re.match(pattern, password))

# Route to Register User
@auth.route("/api/register", methods=["POST"])
def register():
    try:
        data = request.json
        name = data.get("name")
        email = data.get("email")
        dob = data.get("dob")
        age = data.get("age")
        gender = data.get("gender")
        contact = data.get("contact")
        password = data.get("password")

        # Validate password strength
        if not validate_password(password):
            return jsonify({"error": "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character."}), 400

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Insert into MySQL
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        cursor.execute(
            "INSERT INTO users (name, email, dob, age, gender, contact, password) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (name, email, dob, age, gender, contact, hashed_password)
        )
        connection.commit()
        cursor.close()
        connection.close()

        # Send confirmation email
        if send_email(email, name):
            return jsonify({"message": "Registration successful. Confirmation email sent!"}), 201
        else:
            return jsonify({"message": "User registered, but email could not be sent."}), 201

    except mysql.connector.IntegrityError:
        return jsonify({"error": "Email already exists."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
