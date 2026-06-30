// ==========================================
// 1. CÁLCULO DO DIAGNÓSTICO
// ==========================================
function calcularGuara() {
    const respostas = document.querySelectorAll('.guara-check');
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
        mensagem = "Sua organização ainda possui oportunidades importantes para evoluir a gestão baseada em indicadores.";
    }
    else if(pontos < 70){
        nivel = "Intermediário";
        mensagem = "Sua organização já utiliza algumas práticas importantes, mas ainda pode evoluir em análise e monitoramento.";
    }
    else{
        nivel = "Avançado";
        mensagem = "Sua organização demonstra maturidade na gestão de pessoas e utilização estratégica de dados.";
    }

    document.getElementById("resultadoGuara").innerHTML = `
        <h2>${pontos}/100</h2>
        <h3>Nível ${nivel}</h3>
        <p>${mensagem}</p>
    `;
}

// ==========================================
// 2. TEMA CLARO / ESCURO
// ==========================================
const toggle = document.getElementById("theme-toggle");

if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        const heroLogo = document.getElementById("hero-logo");
        const navbarLogo = document.getElementById("navbar-logo");

        if(document.body.classList.contains("light-mode")){
            // TEMA CLARO
            if(heroLogo) heroLogo.src = "images/logo3metodo-guara.png";
            if(navbarLogo) navbarLogo.src = "images/logo3metodo-guara.png";
            toggle.innerHTML = "☀️";
        } else {
            // TEMA ESCURO
            if(heroLogo) heroLogo.src = "images/logo1metodo-guara.png";
            if(navbarLogo) navbarLogo.src = "images/logo1metodo-guara.png";
            toggle.innerHTML = "🌙";
        }
    });
}

// ==========================================
// 3. INTEGRAÇÃO GUARÁ AI (GROQ)
// ==========================================
const btnPerguntar = document.getElementById("btnPerguntar");

if(btnPerguntar){
    btnPerguntar.addEventListener("click", async () => {
        const perguntaInput = document.getElementById("perguntaGuara");
        const pergunta = perguntaInput.value.trim();
        const respostaDiv = document.getElementById("respostaGuara");

        if(!pergunta){
            respostaDiv.innerHTML = "<span style='color: red;'>Digite uma pergunta.</span>";
            return;
        }

        // Estado visual de carregamento
        respostaDiv.innerHTML = "🦊 <i>A Guará AI está analisando...</i>";
        btnPerguntar.disabled = true;
        btnPerguntar.innerText = "Processando...";

        // === ATENÇÃO: COLOQUE SUA CHAVE DA API DA GROQ ABAIXO ===
        const GROQ_API_KEY = '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'; 

        try {
            const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // Usando o modelo atualizado que evita o erro 400
                    model: "llama-3.3-70b-versatile", 
                    messages: [
                        {
                            role: "system",
                            content: `Você é a Guará AI, assistente virtual oficial da Método Guará Consultoria.

Sua função é auxiliar usuários, clientes e gestores com informações relacionadas a:

- Business Intelligence (BI)
- Power BI
- Indicadores de desempenho (KPIs)
- Recursos Humanos (RH)
- Gestão de Pessoas
- Dashboards
- Análise de Dados
- Estratégia Empresarial
- Governança de Dados
- Inteligência Artificial aplicada a negócios
- Tomada de decisão baseada em dados

Sobre a Método Guará:

A Método Guará é uma consultoria especializada em inteligência de negócios, análise de dados, Business Intelligence e gestão estratégica.

Sua missão é transformar dados em decisões inteligentes através da análise estratégica, construção de indicadores, dashboards, diagnósticos organizacionais e metodologias próprias de gestão.

A empresa utiliza o Radar Guará, uma metodologia exclusiva que avalia a maturidade organizacional através de seis pilares:

1. Pessoas
2. Indicadores
3. Dados
4. Análise Inteligente
5. Estratégia
6. Crescimento

Sempre que possível, explique conceitos de forma simples, objetiva e prática.

Regras de comportamento:

- Responda sempre em português do Brasil.
- Seja profissional, cordial e objetiva.
- Evite respostas excessivamente técnicas quando o usuário for leigo.
- Utilize exemplos práticos sempre que possível.
- Não invente informações sobre clientes ou empresas.
- Caso não saiba alguma informação, informe educadamente.
- Priorize respostas relacionadas a gestão, indicadores, dados e negócios.

Informações institucionais:

Quando perguntarem:
"QUEM FUNDOU A EMPRESA?" ou "Quem fundou a Método Guará?" ou perguntas semelhantes,
responda exatamente:
"A Método Guará foi criada pelo CEO Erick Lima Vieira, com intuito de transformar a área de negócios. Com uma metodologia própria, a Método Guará nasceu."

Quando perguntarem:
"QUEM SÃO OS FUNCIONÁRIOS DA EMPRESA?" ou "Quem trabalha na Método Guará?" ou perguntas semelhantes,
responda exatamente:
"Erick, Lucas, Luna e Julia são os principais colaboradores da Método Guará, sendo Erick o CEO, analista de dados e fundador; Lucas e Luna diretores, analistas de comunicação e multimídia; e Julia desenvolvedora."

Quando perguntarem:
"O que é o Radar Guará?"
responda que:
"O Radar Guará é uma metodologia própria da Método Guará que avalia a maturidade organizacional de uma empresa através de seis pilares: Pessoas, Indicadores, Dados, Análise Inteligente, Estratégia e Crescimento. O objetivo é identificar pontos fortes, oportunidades de melhoria e apoiar a tomada de decisões."

Quando perguntarem:
"O que a Método Guará faz?"
responda que:
"A Método Guará atua na área de Business Intelligence, análise de dados, dashboards, indicadores estratégicos, gestão de pessoas e inteligência de negócios, ajudando empresas a transformarem dados em decisões inteligentes."

Seu objetivo principal é ajudar gestores e empresas a compreenderem seus indicadores, seus dados e suas oportunidades de crescimento de forma simples e eficiente.`
                        },
                        {
                            role: "user",
                            content: pergunta
                        }
                    ],
                    temperature: 0.5
                })
            });

            // Tratamento de Erro Detalhado
            if (!resposta.ok) {
                const erroDetalhado = await resposta.json();
                console.error("A Groq rejeitou o pedido. Detalhes:", erroDetalhado);
                throw new Error(erroDetalhado.error?.message || `Erro ${resposta.status} na API`);
            }

            const dados = await resposta.json();
            
            // Extrai o texto da resposta e adapta quebras de linha para o HTML
            const textoResposta = dados.choices[0].message.content;
            respostaDiv.innerHTML = textoResposta.replace(/\n/g, '<br>');
            
            // Limpa o campo de digitação após o sucesso
            perguntaInput.value = "";

        } catch(error) {
            // Se falhar, exibe o erro real para sabermos exatamente o que aconteceu
            respostaDiv.innerHTML = `<span style='color: #ff6b6b;'><b>Erro de conexão:</b> ${error.message}.<br><br><small>Verifique se a sua chave de API está correta no script.js.</small></span>`;
            console.error("Erro capturado:", error);
        } finally {
            // Reativa o botão em qualquer situação (sucesso ou erro)
            btnPerguntar.disabled = false;
            btnPerguntar.innerText = "Pergunte para a Guará AI";
        }
  
    });
}

// ==========================================
// 4. CARROSSEL DOS DASHBOARDS
// ==========================================

const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;

function showSlide(i) {
    slides.forEach((slide, idx) => {
        slide.classList.toggle("active", idx === i);
    });
}

showSlide(index);

if (next) {
    next.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        showSlide(index);
    });
}

if (prev) {
    prev.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    });
}

// ==========================================
// 5. TELA CHEIA DO DASHBOARD
// ==========================================

slides.forEach(slide => {
    slide.addEventListener("click", () => {

        if (!document.fullscreenElement) {
            slide.requestFullscreen().catch(err => {
                console.log(err);
            });
        } else {
            document.exitFullscreen();
        }

    });
});
