import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  console.log("📩 API send-lead chamada");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { nome, email, whatsapp, alunos } = req.body;

    if (!nome || !email || !whatsapp) {
      return res.status(400).json({ error: "Dados obrigatórios ausentes" });
    }

    console.log("📦 Dados recebidos:", req.body);

    await resend.emails.send({
      from: "YesCoach <onboarding@resend.dev>",
      to: ["yescoach.br@gmail.com"],
      subject: "🚀 Novo interesse no YesCoach",
      html: `
        <h2>Novo lead recebido</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Alunos:</strong> ${alunos}</p>
      `
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    return res.status(500).json({ error: "Erro interno ao enviar e-mail" });
  }
}
  
