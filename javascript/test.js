function setFillKey(data, id) {
    for (country_key in data) {
        if (!data[country_key]['GHG'] && id == 'button_GHG') {
            data[country_key].fillColor = "grey";
        }

        else if (data[country_key]['GHG'] > 4000 && id == 'button_GHG') {
            data[country_key].fillKey = 'A';
            data[country_key].fillColor = worldmap_colors[5]
        }

        else if (data[country_key]['GHG'] > 1000 && id == 'button_GHG') {
            data[country_key].fillKey = 'B';
            data[country_key].fillColor = worldmap_colors[4]
        }

        else if (data[country_key]['GHG'] > 500 && id == 'button_GHG') {
            data[country_key].fillKey = 'C';
            data[country_key].fillColor = worldmap_colors[3]
        }

        else if (data[country_key]['GHG'] > 100 && id == 'button_GHG') {
            data[country_key].fillKey = 'D';
            data[country_key].fillColor = worldmap_colors[2]
        }

        else if (data[country_key]['GHG'] > 50 && id == 'button_GHG') {
            data[country_key].fillKey = 'E';
            data[country_key].fillColor = worldmap_colors[1]
        }

        else {
            data[country_key].fillKey = 'F';
            data[country_key].fillColor = worldmap_colors[0]
        }
    }
}
