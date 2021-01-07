# Vacinas (COVID-19) aplicadas em cada país

O JSON ([owid.json](https://raw.githubusercontent.com/altendorfme/owid/main/owid.json "Our World in Data")) contém informações sobre a vacinação de COVID-19 em cada país, conforme atualização da [Our World in Data](https://github.com/owid/covid-19-data/tree/master/public/data/vaccinations "Our World in Data.").

- Adicionado os dados ISO 3166-1 com 2 e 3 digitos.
- Unificado os dados totais de vacinações por país.
- Adicionada a tradução para português dos nomes dos países.

## JSON
```json
[{
        "country": "China",
        "country_pt": "China",
        "iso_3166-1": {
            "alpha2": "cn",
            "alpha3": "zwe"
        },
        "vaccines": [
            "CNBG",
            "Sinovac"
        ],
        "vaccinations_total": "4500000",
        "last_update_date": "2020-12-31",
        "source_name": "National Health Commission",
        "source_website": "https:\/\/www.globaltimes.cn\/page\/202012\/1211515.shtml"
}]
```

## Referências
- https://github.com/owid/covid-19-data/
- https://github.com/stefangabos/world_countries/