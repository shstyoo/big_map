import csv
import time
import urllib.request
import json

# Config stuff
API_KEY = 'AIzaSyDQgBmECcYPsVFlY-8wTdJIse3dg3bg350'
url = 'https://maps.googleapis.com/maps/api/geocode/json'

# File stuff
filename = 'states.csv'
output_filename = 'states_latlng.csv'

# Global variables
big_table = []
big_table_2 = []
integration_index = []
workbook_index = []
PD_index = []

start = time.time()

# Read from CSV
with open('states_latlng.csv') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
        temp = []
        temp.append(row[0])
        if row[1] in integration_index:
            temp.append(integration_index.index(row[1]))
        else:
            integration_index.append(row[1])
            temp.append(integration_index.index(row[1]))
        if row[2] in workbook_index:
            temp.append(workbook_index.index(row[2]))
        else:
            workbook_index.append(row[2])
            temp.append(workbook_index.index(row[2]))
        if row[3] in PD_index:
            temp.append(PD_index.index(row[3]))
        else:
            PD_index.append(row[3])
            temp.append(PD_index.index(row[3]))
        if len(row) > 4:
            temp.append(row[4]);
            temp.append(row[5]);

        big_table.append(temp)

with open('mike_map.csv') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
        big_table_2.append(row)

print(big_table_2)

bigger_table = []
for item in big_table_2:
    for item2 in big_table:
        if item[0] in item2[0]:
            print(item2)
            bigger_table.append(item2)

print(bigger_table)

fucking_table = []
i=1
for item in bigger_table:
    if i%2 == 0:
        continue
    else:
        fucking_table.append(item)

print(fucking_table)

for item in bigger_table:
    with open('mike_map_latlng.csv', 'a', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(item)

print(integration_index)
print(workbook_index)
print(PD_index)

# # Loop through all items
# for school in big_table:
#     if(school[0] == 'School+District'):
#         school.append('Latitude')
#         school.append('Longitude')
#         continue
#     # Get response from Google Map API
#     school_format = school[0].replace(" ", "+")
#     response = urllib.request.urlopen(url + '?address=' + school_format + '&key=' + API_KEY)
#     data = json.loads(response.read())
#     # Get lat and long from JSON if results exist
#     if data['status'] == 'ZERO_RESULTS':
#         print('nothing here')
#     else:
#         for item in data['results']:
#             if len(data['results']) == 1:
#                 school.append(item['geometry']['location']['lat'])
#                 school.append(item['geometry']['location']['lng'])
#             else:
#                 for _type in item['types']:
#                     if _type == 'school':
#                         school.append(item['geometry']['location']['lat'])
#                         school.append(item['geometry']['location']['lng'])
#     # Write to file
#     # with open(output_filename, 'a', newline='') as csvfile:
#     #     writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
#     #     writer.writerow(school)

end = time.time()
print(end-start)

# print(big_table[1])
# print(integration_index)
# print(workbook_index)
# print(PD_index)
