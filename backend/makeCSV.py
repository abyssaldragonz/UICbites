import requests
import time
import csv
import os
from datetime import datetime
from math import radians, sin, cos, sqrt, atan2

# Configuration
GOOGLE_API_KEY = "AIzaSyAzkiho-nqUeLA5nx5pfOSkmvv50a90qMo"
LOCATION = (41.8719295991057, -87.64794666151604)  # lat,long of SCE
RADIUS = 1609.34  # 1 mile in meters
PLACE_TYPE = "restaurant" # the types of places we are looking for in the API
CSV_FILE = 'restaurants.csv'
CACHE_EXPIRY_DAYS = 7  # Refresh data weekly

def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculate distance between two coordinates in miles"""
    R = 3958.8  # Earth radius in miles
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    return R * c

def get_cached_restaurants():
    #Check if the file exists
    if not os.path.exists(CSV_FILE):
        return None
    
    # Checks the CSV file to see if it needs to be refreshed
    with open(CSV_FILE, mode='r') as file:
        reader = csv.DictReader(file)
        cached_data = list(reader)
        if cached_data:
            # Check if cache is expired
            last_updated = datetime.fromisoformat(cached_data[0]['last_updated'])
            if (datetime.now() - last_updated).days < CACHE_EXPIRY_DAYS:
                return cached_data
    return None

def fetch_and_cache_restaurants():
    """Fetch from Google Places API and cache results"""
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    all_results = []
    next_page_token = None
    page_count = 0
    max_pages = 3  # each page gets 20 results, so 3 pages = 60 results (60 is also the max)
    
    # go 3 times
    while page_count < max_pages:
        # Make params for when you call the API
        params = {
            "location": f"{LOCATION[0]},{LOCATION[1]}",
            "rankby": "distance",
            "type": PLACE_TYPE,
            "key": GOOGLE_API_KEY
        }
        
        if next_page_token:
            params['pagetoken'] = next_page_token
            time.sleep(2)  # Google requires delay for page tokens

        response = requests.get(url, params=params)
        data = response.json()
        
        if data.get('status') != 'OK':
            break
            
        # Add distance to each place
        for place in data.get('results', []):
            if 'geometry' in place:
                place_lat = place['geometry']['location']['lat']
                place_lng = place['geometry']['location']['lng']
                place['distance'] = calculate_distance(LOCATION[0], LOCATION[1], place_lat, place_lng)
        
        all_results.extend(data.get('results', []))
        next_page_token = data.get('next_page_token')
        page_count += 1
        
        if not next_page_token:
            break

    # Prepare CSV data
    csv_data = [{
        'last_updated': datetime.now().isoformat(),
        'name': place.get('name', ''),
        'address': place.get('vicinity', ''),
        'rating': str(place.get('rating', '')),
        'distance': str(round(place.get('distance', 0), 2)),  # Round to 2 decimal places
    } for place in all_results]

    # Write to CSV
    with open(CSV_FILE, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=csv_data[0].keys())
        writer.writeheader()
        writer.writerows(csv_data)
        
    return csv_data

def update_restaurants():
    #Get the cached restaurants to see if we need to update
    cached = get_cached_restaurants()
    if not cached:
        print("No valid cache found. Fetching fresh data...")
        fresh_data = fetch_and_cache_restaurants()
        print(f"Successfully updated {len(fresh_data)-1} restaurants")
    else:
        print("Cache is still valid. No update needed.")

if __name__ == "__main__":
    update_restaurants()