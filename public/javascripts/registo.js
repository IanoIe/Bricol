/**Função para registar utilizador */
function registar(){
    $.ajax({
        url: '/api/auth/register',
        method: 'post',
        data: {
            Nome:document.getElementById("nome").value,
            Username:document.getElementById("username").value,
            Email:document.getElementById("email").value,
            Password:document.getElementById("pass").value,
        },
        success: function(result, status){
            console.log('Success')
            window.location = "login.html";
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown);
        }
    })
}