$(document).ready(onInit());

function onInit() {
    $.ajax({
        url: "http://localhost:8080/api/produto/total",
        type: "get",
        dataType: "json",
        success: function(res) {
           $("#div-total-produtos").html(res);
        }
    });
}
