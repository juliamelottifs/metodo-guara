function calcularGuara(){

    const respostas =
        document.querySelectorAll('.guara-check');

    let pontos = 0;

    respostas.forEach(item => {

        if(item.checked){

            pontos += 16.67;
        }

    });

    pontos = Math.round(pontos);

    let nivel = "";
    let mensagem = "";

    if(pontos < 40){

        nivel = "Inicial";

        mensagem =
        "Sua organização ainda possui oportunidades importantes para evoluir a gestão baseada em indicadores.";

    }

    else if(pontos < 70){

        nivel = "Intermediário";

        mensagem =
        "Sua organização já utiliza algumas práticas importantes, mas ainda pode evoluir em análise e monitoramento.";

    }

    else{

        nivel = "Avançado";

        mensagem =
        "Sua organização demonstra maturidade na gestão de pessoas e utilização estratégica de dados.";
    }

    document.getElementById("resultadoGuara").innerHTML = `

        <h2>${pontos}/100</h2>

        <h3>Nível ${nivel}</h3>

        <p>${mensagem}</p>

    `;
}
const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const heroLogo = document.getElementById("hero-logo");
    const navbarLogo = document.getElementById("navbar-logo");

    if(document.body.classList.contains("light-mode")){

        // TEMA CLARO
        heroLogo.src = "images/logo3metodo-guara.png";

        if(navbarLogo){
            navbarLogo.src = "images/logo3metodo-guara.png";
        }

        toggle.innerHTML = "☀️";

    } else {

        // TEMA ESCURO
        heroLogo.src = "images/logo1metodo-guara.png";

        if(navbarLogo){
            navbarLogo.src = "images/logo1metodo-guara.png";
        }

        toggle.innerHTML = "🌙";
    }

});

const btnPerguntar =
document.getElementById("btnPerguntar");

if(btnPerguntar){

    btnPerguntar.addEventListener("click", async () => {

        const pergunta =
        document.getElementById("perguntaGuara").value;

        const respostaDiv =
        document.getElementById("respostaGuara");

        if(!pergunta){
            respostaDiv.innerHTML =
            "Digite uma pergunta.";
            return;
        }

        respostaDiv.innerHTML =
        "🦊 Guará AI está analisando...";

        try{

            const resposta =
            await fetch("/api/chat",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    pergunta
                })
            });

            const dados =
            await resposta.json();

            respostaDiv.innerHTML =
            dados.resposta;

        }catch(error){

            respostaDiv.innerHTML =
            "Erro ao conectar com a Guará AI.";

            console.error(error);
        }

    });

}