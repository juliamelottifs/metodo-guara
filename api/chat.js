export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método não permitido"
    });
  }

  try {

    const { pergunta } = req.body;

    const resposta = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization":
            `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",
              content:
              `Você é a Guará AI, assistente especializada da Método Guará.

Especialista em:
- Business Intelligence
- Power BI
- Indicadores
- RH
- Gestão de Pessoas
- Dashboards
- Análise de Dados
- Estratégia Empresarial

Sempre responda em português do Brasil.

Formate suas respostas da seguinte maneira:

📊 Resumo
Texto curto explicando a situação.

✅ Recomendações
- Item 1
- Item 2
- Item 3

🎯 Resultado Esperado
Explique os benefícios esperados.

Utilize parágrafos curtos.
Evite textos muito longos.
Use listas sempre que possível.
Responda de forma profissional e consultiva.`
            },

            {
              role: "user",
              content: pergunta
            }
          ]
        })
      }
    );

    const dados = await resposta.json();
    
    console.log(JSON.stringify(dados, null, 2));
    
    return res.status(200).json({
      resposta:
      dados.choices[0].message.content
    });

  } catch (erro) {

    return res.status(500).json({
      erro: erro.message
    });
  }
}