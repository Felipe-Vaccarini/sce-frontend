function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

var id_produto = GetURLParameter("id");

//Processar formulário
$('#form-editar-produto').submit(function (event) {

    event.preventDefault();

    fabricacao = new Date($('#input-fabricacao').val());

    //Criar formData
    var formData = {
        'id': id_produto,
        'nome': $('#input-nome').val(),
        'marca': $('#input-marca').val(),
        'fabricacao': fabricacao.toISOString(),
        'preco': $('#input-preco').val()
    };

    console.log(JSON.stringify(formData));

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'PUT',
        url: 'http://localhost:8080/api/produto/edit',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (data) {
            location.href = 'listar-produtos.html';
        },
        error: function (data) {
            $('#div-alert-message').prepend(data.responseText);
            $('#div-alert-message').fadeIn();
        }
    });
 });

 function esconderAlert() {
    $('#div-alert-message').html("<a class='close' onclick='esconderAlert()'>×</a>");
    $('#div-alert-message').hide();
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getUTCMonth() + 1),
        day = '' + d.getUTCDate(),
        year = d.getUTCFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/api/produto/getById/' + id_produto,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#input-nome").val(data.nome);
            $("#input-marca").val(data.marca);
            $("#input-fabricacao").val(formatDate(new Date(data.fabricacao)));
            $("#input-preco").val(data.preco);
        }
    })

});