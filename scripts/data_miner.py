# Programmeer Project
#
# Laila Blomer
# 10563865
#
# data_miner.py converts csv data to json

import json, csv
from countrycodes import *

data_array = {}
linegraph = {}

with open('../data/GHG_Emission.csv', 'rb') as input:
    workbook_GHG = csv.reader(input, delimiter=',')
    for row in workbook_GHG:

        # data array for line graph
        for key in country_codes:
            if key[2] == row[0]:
                # fill data_array with year as first key
                if not row[1] in data_array:
                    data_array[row[1]] = {key[1]: {'country': key[2],
                                                   'GHG': row[2],
                                                   'CO2': row[4],
                                                   'CH4': row[5],
                                                   'N2O': row[6],
                                                   'Rest': row[7]}}
                elif not key[1] in data_array[row[1]]:
                    data_array[row[1]].update({key[1]: {'country': key[2],
                                                        'GHG': row[2],
                                                        'CO2': row[4],
                                                        'CH4': row[5],
                                                        'N2O': row[6],
                                                        'Rest': row[7]}})

                # fill data for linegraph with country as first key
                if not key[1] in linegraph:
                    linegraph[key[1]] = []
                linegraph[key[1]].append({'Country': key[2], 'Gas': "CO2", 'Amount': row[4], 'year': row[1]})
                linegraph[key[1]].append({'Country': key[2], 'Gas': 'CH4', 'Amount': row[5], 'year': row[1]})
                linegraph[key[1]].append({'Country': key[2], 'Gas': 'N2O', 'Amount': row[6], 'year': row[1]})
                linegraph[key[1]].append({'Country': key[2], 'Gas': 'Rest', 'Amount': row[7], 'year': row[1]})

        # add relative GHG emission to data_array
        for keys in data_array.keys():
            if row[24] == keys:
                for countries in data_array[keys]:
                    if data_array[keys][countries]['country'] == row[23]:
                        if row[25] != '' and data_array[keys][countries]['GHG'] != '':
                            relative = float(data_array[keys][countries]['GHG']) / float(row[25])

                            data_array[keys][countries].update({'population': row[25],
                                                                'GDP': row[27],
                                                                'relative': relative * 1000000000})

# write output files
with open('data_file.json', 'w') as outfile:
    json.dump(data_array, outfile, indent=4)

with open('data_linegraph.json', 'w') as outfile:
    json.dump(linegraph, outfile, indent=4)
