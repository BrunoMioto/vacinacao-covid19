# Vacinas (COVID-19) aplicadas em cada país

O JSON ([vacinacao-covid19.json](https://raw.githubusercontent.com/altendorfme/vacinacao-covid19/main/vacinacao-covid19.json "Our World in Data")) contém informações sobre a vacinação de COVID-19 em cada país, conforme atualização da [Our World in Data](https://github.com/owid/covid-19-data/tree/master/public/data/vaccinations "Our World in Data.").

Para visualização dos dados acesse ([Vacinação COVID-19](https://vacinacao-covid19.com "Vacinação COVID-19")).
O site contém:
- <b>Nome do país</b>
- <b>Vacinas utilizadas</b>
- <b>Data da última atualização</b>
- <b>Número de doses aplicadas por 100 habitantes</b> - Isso é contado como única dose, e pode não ser igual ao número total de pessoas vacinadas, dependendo do regime de dose específico (por exemplo, pessoas que recebem múltiplas doses).
- <b>Número de doses aplicadas</b>

Foram feitas as seguintes modificações para melhor visualização dos dados
- Adicionado os dados ISO 3166-1 com 2 e 3 digitos.
- Unificado os dados totais de vacinações por país.
- Tradução para português dos países.

## JSON
```json
[{
	"country": "China",
	"country_pt": "China",
	"iso_code": {
		"alpha2": "cn",
		"alpha3": "chn"
	},
	"vaccines": [
		"CNBG",
		"Sinovac"
	],
	"total_vaccinations": "9000000",
	"people_vaccinated": "9000000",
	"people_fully_vaccinated": "",
	"daily_vaccinations": "500000",
	"total_vaccinations_per_hundred": "0.63",
	"people_vaccinated_per_hundred": "0.63",
	"people_fully_vaccinated_per_hundred": "",
	"daily_vaccinations_per_million": "347",
	"last_update_date": "2021-01-09",
	"source_name": "National Health Commission",
	"source_website": "http:\/\/www.scio.gov.cn\/xwfbh\/xwbfbh\/wqfbh\/44687\/44700\/zy44704\/Document\/1696668\/1696668.htm"
}]
```

## Referências
### Wrapper
- https://github.com/owid/covid-19-data/
- https://github.com/stefangabos/world_countries/

### Visualização
- https://github.com/hjnilsson/country-flags/
- https://github.com/jquery/jquery/
- https://github.com/gka/chroma.js/
- https://github.com/moment/moment/
- https://github.com/adamwdraper/Numeral-js/
- https://github.com/twbs/bootstrap/
- https://github.com/wenzhixin/bootstrap-table
