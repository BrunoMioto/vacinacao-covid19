<?php

$source = file_get_contents('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/locations.csv');
$source_array = array_map("str_getcsv", explode("\n", $source));
unset($source_array[count($source_array)-1]);
array_splice($source_array, 0, 1);

$countries_array = json_decode(file_get_contents('https://raw.githubusercontent.com/stefangabos/world_countries/master/data/pt/countries.json'));

$result = [];

foreach($source_array as $data) {
    $country = $data[0];
    $iso_code_alpha3 = strtolower($data[1]);
    if(empty($iso_code_alpha3) && ($country == 'England' || $country == 'Northern Ireland' || $country == 'Scotland' || $country == 'Wales')) {
        $iso_code_alpha3 = 'gbr';
    }
    $vaccines = explode(', ',$data[2]);
    $last_observation_date = $data[3];
    $source_name = $data[4];
    $source_website = $data[5];

    $vaccines_count = file_get_contents('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/'.rawurlencode($country).'.csv');
    $vaccines_array = array_map("str_getcsv", explode("\n", $vaccines_count));
    unset($vaccines_array[count($vaccines_array)-1]);
    array_splice($vaccines_array, 0, 1);

    $last_total = end($vaccines_array);
    $vaccinations_total = $last_total[3];

    foreach($countries_array as $data) {
        $name = $data->name;
        $alpha3 = $data->alpha3;
        if($alpha3 == $iso_code_alpha3) {
            $country_pt = $name;
            $alpha2 = $data->alpha2;
        }
    }
    $iso_code = [
        'alpha2' => $alpha2,
        'alpha3' => $alpha3,
    ];
    
    $push = array(
        'country' => $country,
        'country_pt' => $country_pt,
        'iso_3166-1' => $iso_code,
        'vaccines' => $vaccines,
        'vaccinations_total' => $vaccinations_total,
        'last_update_date' => $last_observation_date,
        'source_name' => $source_name,
        'source_website' => $source_website,
    );

    array_push($result, $push);
}

$json = json_encode($result, JSON_PRETTY_PRINT);
file_put_contents('owid.json', $json);