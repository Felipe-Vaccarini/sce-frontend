$(document).ready(listarProdutos);

function listarProdutos() {

    $.ajax({
        url: 'http://localhost:8080/api/produto/list',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result, function (i, data) {
                html += `<tr><td>` + data.id + `</td>`;
                html += `<td>` + data.nome + `</td>`;
                html += `<td><a href="editar-produto.html?id=` + data.id + `"><i class="bi bi-pencil-fill"></i></a>`;
                html += ` <a href="visualizar-produto.html?id=` + data.id + `"><i class="bi bi-search"></i></a>`;
                html += ` <a href="#" onclick="removerProduto(` + data.id + `)"><i class="bi bi-archive-fill"></i></a></td></tr>`;

                $("#tbListarProdutosBody").html(html);
            });

            let table = new DataTable('#tbListarProdutos');
        }
    })
}
function removerProduto(id) {

    var respostaPergunta = confirm("Confirma a exclusão?");
    if (respostaPergunta == true) {

        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/produto/remove/' + id,
            dataType: 'json',
            success: function (result) {
                location.reload();
            },
            error: function (result) {
                alert(result);
            }
        })

    }
}