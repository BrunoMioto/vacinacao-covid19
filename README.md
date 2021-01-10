# Vacinas (COVID-19) aplicadas em cada país

O JSON ([vacinacao-covid19.json](https://raw.githubusercontent.com/altendorfme/vacinacao-covid19/main/vacinacao-covid19.json "Our World in Data")) contém informações sobre a vacinação de COVID-19 em cada país, conforme atualização da [Our World in Data](https://github.com/owid/covid-19-data/tree/master/public/data/vaccinations "Our World in Data.").

Para visualização dos dados acesse ([Vacinação COVID-19](https://altendorfme.github.io/vacinacao-covid19/ "Vacinação COVID-19")).

- Adicionado os dados ISO 3166-1 com 2 e 3 digitos.
- Unificado os dados totais de vacinações por país.
- Tradução para português dos países.
- Número total de doses de vacinas por 100 pessoas na população total. Isso é contado como única dose, e pode não ser igual ao número total de pessoas vacinadas, dependendo do regime de dose específico (por exemplo, pessoas que recebem múltiplas doses).

## JSON
```json
[{
        "country": "China",
        "country_pt": "China",
        "iso_code": {
            "alpha2": "cn",
            "alpha3": "zwe"
        },
        "vaccines": [
            "CNBG",
            "Sinovac"
        ],
        "vaccinations_total": "4500000",
        "total_vaccinations_per_hundred": "0.31",
        "last_update_date": "2020-12-31",
        "source_name": "National Health Commission",
        "source_website": "https:\/\/www.globaltimes.cn\/page\/202012\/1211515.shtml"
}]
```

## Referências
- https://github.com/owid/covid-19-data/
- https://github.com/stefangabos/world_countries/
- https://github.com/hjnilsson/country-flags/