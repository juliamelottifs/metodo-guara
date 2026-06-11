console.log("SCRIPT CARREGOU");
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