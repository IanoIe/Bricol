/** Função de login */
function entrar(){
    $.ajax({
        url: '/api/auth/login',
        method: 'post',
        data: {
            Email:document.getElementById("email").value,
            Senha:document.getElementById("password").value,
        },
        success: function(result, status){
            console.log(result)
            alert('Login com sucesso!')
            localStorage.setItem("Nome", result[0].Nome);
            localStorage.setItem("idUtilizador", result[0].idUtilizador);
            window.location = "main.html";
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(errorThron);
        },
    })
}