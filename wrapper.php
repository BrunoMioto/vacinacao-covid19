<?php

$source = file_get_contents('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/locations.csv');
if($source === FALSE) {
    http_response_code(404);
    die();
}

$source_array = array_map("str_getcsv", explode("\n", $source));
unset($source_array[count($source_array)-1]);
array_splice($source_array, 0, 1);

$countries_array = json_decode(file_get_contents('https://raw.githubusercontent.com/stefangabos/world_countries/master/data/pt/countries.json'));
if($countries_array === FALSE) {
    http_response_code(404);
    die();
}

$result = [];
foreach($source_array as $data) {
    $country = $data[0];
    $iso_code_alpha3 = strtolower($data[1]);

    switch ($country) {
        case 'United Kingdom':
            $country_pt = 'Reino Unido';
            $iso_code_alpha3 = 'gbr';
            $alpha2 = 'gb';
            break;
        case 'England':
            $country_pt = 'Inglaterra';
            $iso_code_alpha3 = 'gbr-eng';
            $alpha2 = 'gb-eng';
            break;
        case 'Northern Ireland':
            $country_pt = 'Irlanda do Norte';
            $iso_code_alpha3 = 'gbr-nir';
            $alpha2 = 'gb-nir';
            break;
        case 'Scotland':
            $country_pt = 'Escócia';
            $iso_code_alpha3 = 'gbr-sct';
            $alpha2 = 'gb-sct';
            break;
        case 'Wales':
            $country_pt = 'País de Gales';
            $iso_code_alpha3 = 'gbr-wls';
            $alpha2 = 'gb-wls';
            break;
    }

    $vaccines = explode(', ',$data[2]);
    $last_observation_date = $data[3];
    $source_name = $data[4];
    $source_website = $data[5];

    $vaccinations = file_get_contents('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv');
    if($vaccinations === FALSE) {
        http_response_code(404);
        die();
    }
    $vaccinations_array = array_map("str_getcsv", explode("\n", $vaccinations));
    unset($vaccinations_array[count($vaccinations_array)-1]);
    array_splice($vaccinations_array, 0, 1);

    foreach($vaccinations_array as $data) {
        $location= $data[0];
        if($location == $country) {
            //$iso_code                            = $data[1];
            //$date                                = $data[2];
            $total_vaccinations                  = $data[3];
            $people_vaccinated                   = $data[4];
            $people_fully_vaccinated             = $data[5];
            $daily_vaccinations                  = $data[6];
            $total_vaccinations_per_hundred      = $data[7];
            $people_vaccinated_per_hundred       = $data[8];
            $people_fully_vaccinated_per_hundred = $data[9];
            $daily_vaccinations_per_million      = $data[10];
        }
    }

    if (strpos($iso_code_alpha3, 'gbr') === FALSE) {
        foreach($countries_array as $data) {
            $name = $data->name;
            $alpha3 = $data->alpha3;
            if($alpha3 == $iso_code_alpha3) {
                $country_pt = $name;
                $alpha2 = $data->alpha2;
            }
        }
    }
    $iso_code = [
        'alpha2' => $alpha2,
        'alpha3' => $iso_code_alpha3,
    ];
    
    $push = array(
        'country' => $country,
        'country_pt' => $country_pt,
        'iso_code' => $iso_code,
        'vaccines' => (empty($vaccines)) ? null : $vaccines,
        'total_vaccinations' => (empty($total_vaccinations)) ? null : $total_vaccinations,
        'people_vaccinated' => (empty($people_vaccinated)) ? null : $people_vaccinated,
        'people_fully_vaccinated' => (empty($people_fully_vaccinated)) ? null : $people_fully_vaccinated,
        'daily_vaccinations' => (empty($daily_vaccinations)) ? null : $daily_vaccinations,
        'total_vaccinations_per_hundred' => (empty($total_vaccinations_per_hundred)) ? null : $total_vaccinations_per_hundred,
        'people_vaccinated_per_hundred' => (empty($people_vaccinated_per_hundred)) ? null : $people_vaccinated_per_hundred,
        'people_fully_vaccinated_per_hundred' => (empty($people_fully_vaccinated_per_hundred)) ? null : $people_fully_vaccinated_per_hundred,
        'daily_vaccinations_per_million' => (empty($daily_vaccinations_per_million)) ? null : $daily_vaccinations_per_million,
        'last_update_date' => (empty($last_observation_date)) ? null : $last_observation_date,
        'source_name' => (empty($source_name)) ? null : $source_name,
        'source_website' => (empty($source_website)) ? null : $source_website,
    );

    array_push($result, $push);
}

$json = json_encode($result, JSON_PRETTY_PRINT);
file_put_contents('vacinacao-covid19.json', $json);
