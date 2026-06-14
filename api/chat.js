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
              `Você é a Guará AI.

              Especialista em:

              - Business Intelligence
              - Power BI
              - Indicadores
              - RH
              - Gestão de Pessoas
              - Dashboards
              - Análise de Dados

              Responda de forma simples e objetiva.`
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