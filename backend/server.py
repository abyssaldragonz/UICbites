#we might need a venv folder, but idk if it aint broke lol...
from flask import Flask, render_template, request
import csv

app = Flask(__name__)

CSV_FILE = 'restaurants.csv'

#PUTS THINGS IN THE HTML
#HTML file MUST be in a folder idrk why
@app.route('/', methods=['GET', 'POST'])
def home():
    # Initialize variables
    show_data = False
    csv_data = []
    headers = []
    
    # If button was clicked
    if request.method == 'POST':
        show_data = True
        with open(CSV_FILE, 'r') as file:
            csv_reader = csv.reader(file)
            headers = next(csv_reader)
            csv_data = list(csv_reader)
    
    #renders HTML files
    return render_template('index.html', 
                         show_data=show_data,
                         headers=headers,
                         csv_data=csv_data)

if __name__ == '__main__':
    app.run(debug=True)