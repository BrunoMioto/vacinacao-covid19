// ChromaJs
var scale = chroma.scale(['cdf5ff', '00429d']).domain([0, 50]);

// Moment
moment.locale('pt-br');

// Numeral
numeral.register('locale', 'pt-BR', {
    delimiters: {
        thousands: '.',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: 'R$'
    }
});
numeral.locale('pt-BR');

// Table
function initTable() {
    $('#table').bootstrapTable('destroy').bootstrapTable({
        height: document.documentElement.clientHeight,
        theadClasses: 'thead-dark',
        onLoadSuccess: function(data, status, xhr) {
            $('.timestamp').html(moment(xhr.getResponseHeader("Last-Modified")).format('LLL'));
        }
    });
}


$(document).ready( function () {
    $(window).resize(function() {
        initTable();
    });
    initTable();
});

//-- Total
function totalLocal(data) {
    var total = data.length - 1; // Remove United Kingdom
    return 'Totais: '+total+' países'
}
function totalVaccinations(data) {
    var field = this.field
    var total = 0;
    $.each(data,function(i, data){
        if(data.iso_code.alpha3 != 'gbr') {
            total = Number(total) + Number(data.total_vaccinations);
        }
    });

    var total = numeral(total);
    return total.format('0,0');
}

//-- Loading
function loadingTemplate(message) {
    return '<i class="fa fa-spinner fa-spin fa-fw fa-2x"></i>';
}
    
//-- Vaccines
function vaccinesFormatter(value, row, index) {
    var vaccines = '';
    $.each(value,function(i, data){
        var c = data.toLowerCase().replace(' ','-').replace('/','-')
        vaccines += '<div class="w-100 h-100 d-flex align-items-center justify-content-center pl-2 pr-2 vaccine vaccine-'+c+'">'+data+'</div>';
    });
    return '<div class="d-flex align-content-around position-relative" style="margin-left: -1px; width: 100.2%;">'+vaccines+'</div>'
}

//-- Hundred
function hundredFormatter(value, row, index) {
    if(value == null) {
        var value = 0;
    }
    var colorHex = scale(value).hex();
    
    var contrast_ratio = 2;
    var white = chroma.contrast(colorHex, 'white');
    var black = chroma.contrast(colorHex, 'black');
    
    if (white >= contrast_ratio) {
        var color = "#fff";
    } else if (black >= contrast_ratio) {
        var color = "#000";
    }

    return '<div class="d-flex align-items-center pl-2 pr-2 position-relative hundred" style="margin-left: -1px; width: 100.2%; border-top-color: '+chroma(colorHex).darken(0.1)+'; background-color: '+colorHex+'; color: '+color+'">'+value+'</div>';
}

//-- Total
function totalFormatter(value, row, index) {
    var total = numeral(value);
    return total.format('0,0');
}

//-- Local
function localFormatter(value, row, index) {
    var att = '';
    var title = '';
    if(row.iso_code.alpha3 == 'gbr') {
        var att = '<strong>*</strong>';
        var title = 'title="Apenas para visualização da vacinação de todos países e províncias que compõem o Reino Unido, esses dados não estão incluídos na somatória de doses ou países."';
    }
    return '<div class="d-flex align-items-center text-nowrap" '+title+'><img class="d-inline-block mr-2" src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/'+row.iso_code.alpha2+'.svg" width="20" /><span class="country overflow-hidden">'+value+att+'</span></div></td>'
}

//-- Style Row
function noPadding(value, row, index) {
    return {
        css: {
            padding: 0,
            'border-top': 0,
            'border-bottom': 0
        }
    }
}