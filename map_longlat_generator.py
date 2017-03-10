import csv
import time
import urllib.request
import json
import codecs
import pprint

# Config stuff
API_KEY = 'AIzaSyDQgBmECcYPsVFlY-8wTdJIse3dg3bg350'
url = 'https://maps.googleapis.com/maps/api/geocode/json'

# File stuff
filename = 'csv/states.csv'
output_filename = 'csv/OUTPUT_states_final.csv'

# Global variables
big_table = []
integration_index = []
workbook_index = []
PD_index = []

start = time.time()

# Read from CSV
with open(filename) as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
        temp = []
        temp.append(row[0])
        if row[2] in integration_index:
            temp.append(integration_index.index(row[2]))
        else:
            integration_index.append(row[2])
            temp.append(integration_index.index(row[2]))
        if row[3] in workbook_index:
            temp.append(workbook_index.index(row[3]))
        else:
            workbook_index.append(row[3])
            temp.append(workbook_index.index(row[3]))
        if row[4] in PD_index:
            temp.append(PD_index.index(row[4]))
        else:
            PD_index.append(row[4])
            temp.append(PD_index.index(row[4]))
        big_table.append(temp)

print(big_table[1])
print(integration_index)
print(workbook_index)
print(PD_index)

# Loop through all items
# for school in big_table:
#     if(school[0] == 'School+District'):
#         school.append('Latitude')
#         school.append('Longitude')
#         continue
#     # Get response from Google Map API
#     school_format = school[0].replace(" ", "+")
#     print(url + '?address=' + school_format + '&key=' + API_KEY)
#     response = urllib.request.urlopen(url + '?address=' + school_format + '&key=' + API_KEY)
#     data = json.loads(response.read())
#     # Get lat and long from JSON if results exist
#     if data['status'] == 'ZERO_RESULTS':
#         print('nothing here')
#     else:
#         for item in data['results']:
#             for item2 in item['address_components']:
#                 if item2['long_name'] == 'Michigan':
#                     if len(data['results']) == 1:
#                         school.append(item['geometry']['location']['lat'])
#                         school.append(item['geometry']['location']['lng'])
#                     else:
#                         for _type in item['types']:
#                             if _type == 'school' and item2['long_name'] == 'Michigan':
#                                 school.append(item['geometry']['location']['lat'])
#                                 school.append(item['geometry']['location']['lng'])
#
#         # Write to file
#         with open(output_filename, 'a', newline='') as csvfile:
#             writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
#             writer.writerow(school)
#         print('wrote')
#         print(school)

end = time.time()
print(end-start)
