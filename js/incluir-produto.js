$('#form-inserir-produto').submit(function (event) {
    event.preventDefault();

    fabricacao = new Date($('#input-fabricacao').val());

    // Criar formData
    var formData = {
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
        type: 'POST',
        url: 'http://localhost:8080/api/produto/create',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (data) {
            location.href = 'listar-produtos.html';
        },
        error: function (data) {
            $('#div-alert-message').empty(); // Remove as mensagens anteriores
            $('#div-alert-message').prepend(data.responseText);
            $('#div-alert-message').fadeIn();
        }
    });
});
