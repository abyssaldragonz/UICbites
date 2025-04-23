from flask import Flask, request, jsonify
from flask_cors import CORS
from makeCSV import update_restaurants
import heapq, csv, datetime
import random


# Setup Flask app and enable Cross-Origin Resource Sharing for React frontend
app = Flask(__name__)
CORS(app) # Needed cus frontend and backend are on different ports

# CSV file containing restaurant data
CSV_FILE = 'restaurants.csv'

# Extract only today's hours from the full hours string
def getTodaysHours(hours):
    today = datetime.datetime.now().strftime('%A')
    lines = hours.strip().splitlines()
    for line in lines:
        if line.startswith(today):
            return line
    return None

# Sort the data by the given attribute using a priority queue
def dataByAttribute(attribute_index, csv_reader, maxFirst):
    pQueue = []
    for row in csv_reader:
        try:
            value = float(row[attribute_index])
        except ValueError:
            value = 0.0  # If value is missing or invalid, treat as 0
        priority = -value if maxFirst else value  # Max or min heap
        heapq.heappush(pQueue, (priority, row))
    return [item[1] for item in heapq.nsmallest(len(pQueue), pQueue)]

# route to return sorted restaurant data as JSON (used for explore page)
@app.route('/api/data', methods=['POST'])
def api_data():
    # Expect JSON payload from frontend like: { sort_by: "rating_desc" }
    data = request.get_json()
    sort_by = data.get('sort_by', 'rating_desc')

    # Determine sorting logic based on dropdown selection
    if sort_by == 'rating_desc':
        attribute, maxFirst = 'rating', True
    elif sort_by == 'rating_asc':
        attribute, maxFirst = 'rating', False
    elif sort_by == 'distance_asc':
        attribute, maxFirst = 'distance', False
    elif sort_by == 'distance_desc':
        attribute, maxFirst = 'distance', True
    elif sort_by == 'flames_fare':
        attribute, maxFirst = 'distance', True # FIX THIS
    elif sort_by == 'student_discount':
        attribute, maxFirst = 'distance', True # FIX THIS
    else:
        attribute, maxFirst = 'rating', True  # Default fallback

    # Read and process the CSV file
    with open(CSV_FILE, 'r', encoding='utf-8') as file:
        csv_reader = csv.reader(file)
        headers = next(csv_reader)  # Read header row
        attr_idx = headers.index(attribute)
        hours_idx = headers.index("hours")

        # Get sorted data based on selected attribute
        sorted_data = dataByAttribute(attr_idx, csv_reader, maxFirst)

        # Replace full hours with only today's hours
        for row in sorted_data:
            row[hours_idx] = getTodaysHours(row[hours_idx])

    data_dicts = [dict(zip(headers, row)) for row in sorted_data] # convert to list of dicts
    return jsonify(data_dicts) #jsonify the data for the frontend

@app.route('/api/highlight', methods=['GET'])
def api_highlight():
    with open(CSV_FILE, 'r', encoding='utf-8') as file:
        csv_reader = csv.reader(file)
        headers = next(csv_reader)
        rows = list(csv_reader)

        if not rows:
            return jsonify({})  # return empty JSON object if no data

        now = datetime.datetime.now()
        #Get the current year and week
        iso_year, iso_week, _ = now.isocalendar()
        # Get a random seed based on the current year and week
        seed = int(f"{iso_year}{iso_week}")

        #Shuffle the rows using the seed
        rng = random.Random(seed)
        rng.shuffle(rows)
        chosen = rows[0]

        restaurant = dict(zip(headers, chosen))
        # Fix the hours to show only today's hours
        restaurant["hours"] = getTodaysHours(restaurant["hours"])

        return jsonify(restaurant)


# route to return the top 5 rated restaurants(used for home page)
@app.route('/api/top5', methods=['GET'])
def api_top5():
    with open(CSV_FILE, 'r', encoding='utf-8') as file:
        csv_reader = csv.reader(file)
        headers = next(csv_reader)
        rating_idx = headers.index('rating')
        hours_idx = headers.index("hours")

        rows = list(csv_reader)
        top_5 = heapq.nlargest(5, rows, key=lambda row: float(row[rating_idx] or 0))

        for row in top_5:
            row[hours_idx] = getTodaysHours(row[hours_idx])

        data_dicts = [dict(zip(headers, row)) for row in top_5]
        return jsonify(data_dicts)


# Run the Flask app on localhost:5000
if __name__ == '__main__':
    update_restaurants()
    app.run(debug=False, port=5000)
