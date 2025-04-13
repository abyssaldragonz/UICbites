from flask import Flask, render_template, request
import heapq
import csv

app = Flask(__name__)

CSV_FILE = 'restaurants.csv'

@app.route('/', methods=['GET', 'POST'])
def home():
    show_data = False
    csv_data = []
    headers = []
    
    if request.method == 'POST':
        show_data = True
        with open(CSV_FILE, 'r', encoding='utf-8') as file:
            csv_reader = csv.reader(file)
            headers = next(csv_reader)
            
            rating_index = headers.index('rating')  # get index of 'rating'

            heap = []
            for row in csv_reader:
                try:
                    priority = -float(row[rating_index])  # sort by rating (max-heap)
                    heapq.heappush(heap, (priority, row))
                except ValueError:
                    continue  # skip rows with missing or bad rating

            csv_data = [item[1] for item in heapq.nsmallest(len(heap), heap)]

    return render_template('index.html', 
                           show_data=show_data,
                           headers=headers,
                           csv_data=csv_data)

if __name__ == '__main__':
    app.run(debug=True)
