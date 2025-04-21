from flask import Flask, request, jsonify
from flask_cors import CORS
import heapq, csv, datetime

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

# API route to return sorted restaurant data as JSON
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

# Run the Flask app on localhost:5000
if __name__ == '__main__':
    app.run(debug=True, port=5000)
