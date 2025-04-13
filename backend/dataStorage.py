from flask import Flask, render_template, request
import heapq
import csv

#Setup Flask app
app = Flask(__name__)

CSV_FILE = 'restaurants.csv'

import heapq

def dataByAttribute(attribute_index, csv_reader, maxFirst):
    pQueue = []
    for row in csv_reader:
        try:
            value = float(row[attribute_index])
        except ValueError:
            value = 0.0  #if missing, treat it as 0

        priority = -value if maxFirst else value
        heapq.heappush(pQueue, (priority, row))

    return [item[1] for item in heapq.nsmallest(len(pQueue), pQueue)]

# flask needs to route to the home page
@app.route('/', methods=['GET', 'POST'])

def home():
    show_data = False
    csv_data = []
    headers = []

    sort_by = request.form.get('sort_by') #read dropdown choice
    if sort_by == 'rating_desc':
        attribute = 'rating'
        maxFirst = True
    elif sort_by == 'rating_asc':
        attribute = 'rating'
        maxFirst = False
    elif sort_by == 'distance_asc':
        attribute = 'distance'
        maxFirst = False
    elif sort_by == 'distance_desc':
        attribute = 'distance'
        maxFirst = True
    else:
        attribute = 'rating'
        maxFirst = True  # default

    
    #When button is pressed
    if request.method == 'POST':
        show_data = True
        with open(CSV_FILE, 'r', encoding='utf-8') as file:
            csv_reader = csv.reader(file)
            headers = next(csv_reader)
            
            attribute_index = headers.index(attribute)  # get index of the attribute

            csv_data = dataByAttribute(attribute_index, csv_reader, maxFirst)

            
    #sending data to the frontend
    return render_template('index.html', 
                           show_data=show_data,
                           headers=headers,
                           csv_data=csv_data)

if __name__ == '__main__':
    app.run(debug=True)
