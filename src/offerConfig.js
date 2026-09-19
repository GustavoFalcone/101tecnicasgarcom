export const offerConfig = {
  name: "+101 Técnicas para Servir como um Garçom Profissional",
  basicPrice: "R$ 10,00",
  completePrice: "R$ 27,90",
  completeAnchor: "DE R$ 97,00",
  upgradePrice: "R$ 17,90",
  bonusTotal: "R$ 87,00",
  basicCheckout: "https://zuckpay.com.br/checkout/plano-basico-101-tecnicas-para-servir-como-um-garcom-profissional",
  completeCheckout: "https://zuckpay.com.br/checkout/plano-completo-101-tecnicas-para-servir-como-um-garcom-profissional",
  upgradeCheckout: "https://zuckpay.com.br/checkout/plano-completo-101-tecnicas-para-servir-como-um-garcom-profissional-1",
  countdownMinutes: 30,
  countdownStorageKey: "atlas-pizzaiolo:offer-start:v1"
};
export const audiences = [
  { image: "/assets/generated/publico-garcom-restaurante.webp", title: "GARÇOM DE RESTAURANTE", text: "Para quem trabalha no atendimento de mesas e quer ter técnicas visuais para servir, carregar, recolher e se movimentar com mais agilidade e segurança no salão." },
  { image: "/assets/generated/publico-garcom-hotel.webp", title: "GARÇOM DE HOTEL / A&B", text: "Para quem atua em hotéis, restaurantes de hotel ou no setor de alimentos e bebidas e precisa manter mais organização, postura e padrão durante o serviço." },
  { image: "/assets/generated/publico-cumim.webp", title: "CUMIM / AUXILIAR DE GARÇOM", text: "Para quem ainda está no apoio do salão e quer entender melhor as técnicas do serviço para executar tarefas com mais confiança e depender menos do improviso." },
  { image: "/assets/generated/publico-buffet-eventos.webp", title: "ATENDENTE DE BUFFET / EVENTOS", text: "Para quem trabalha em casamentos, festas, buffets e eventos e precisa lidar com bandejas, serviço, circulação, reposição e recolhimento de forma mais prática." }
];
export const bonuses = [
  { image: "/assets/bonus/bonus-01.webp", title: "ATLAS VISUAL DE UTENSÍLIOS, COPOS E SERVIÇO", summaryTitle: "ATLAS VISUAL DE UTENSÍLIOS, COPOS E SERVIÇO", shortTitle: "Atlas Visual de Utensílios, Copos e Serviço", text: "Reconheça rapidamente taças, copos, pratos, talheres, bandejas e outros itens usados no salão.", summary: "Utensílios, copos, taças, pratos e itens de serviço explicados de forma rápida.", value: "R$ 27,00", icon: "acesso-atlas-utensilios" },
  { image: "/assets/bonus/bonus-02.webp", title: "+30 DESAFIOS DO GARÇOM", summaryTitle: "+30 DESAFIOS DO GARÇOM", shortTitle: "+30 Desafios do Garçom", text: "Treine com situações reais do atendimento e veja como agir em diferentes momentos do salão.", summary: "Situações reais do salão para treinar decisões e aplicação prática.", value: "R$ 23,00", icon: "acesso-desafios-garcom" },
  { image: "/assets/bonus/bonus-03.webp", title: "DICIONÁRIO VISUAL DO RESTAURANTE", summaryTitle: "DICIONÁRIO VISUAL DO RESTAURANTE", shortTitle: "Dicionário Visual do Restaurante", text: "Entenda termos, pratos, preparos e expressões comuns do restaurante de forma simples e visual.", summary: "Termos, pratos e preparos comuns do restaurante explicados de forma simples.", value: "R$ 17,00", icon: "acesso-dicionario-restaurante" },
  { image: "/assets/bonus/bonus-04.webp", title: "CERTIFICADO DE CONCLUSÃO", summaryTitle: "CERTIFICADO DE CONCLUSÃO", shortTitle: "Certificado de Conclusão", text: "Receba um certificado digital ao finalizar o material.", summary: "Certificado digital ao finalizar o material.", value: "R$ 20,00", icon: "acesso-certificado" }
];
export const benefits = [
  { title: "Sirva com mais clareza", text: "Veja posições, movimentos e sequências visuais para entender como executar cada técnica de forma mais organizada.", icon: "pratica-claridade" },
  { title: "Trabalhe com mais agilidade", text: "Consulte técnicas para bandejas, pratos, deslocamento e organização que ajudam a reduzir movimentos desnecessários durante o serviço.", icon: "pratica-agilidade" },
  { title: "Tenha mais segurança no salão", text: "Compare o certo e o errado, observe detalhes de postura e entenda melhor como carregar, servir e recolher.", icon: "pratica-seguranca" },
  { title: "Consulte sempre que precisar", text: "Abra pelo celular, tablet ou computador e encontre rapidamente a técnica que quer revisar antes ou durante o trabalho.", icon: "pratica-consulta-digital" }
];
export const faqs = [
  ["O que é o material +101 Técnicas do Garçom?", "É um material visual e digital de consulta, organizado para ajudar você a entender técnicas de bandeja, serviço, postura, atendimento e recolhimento no salão."],
  ["Serve para quem está começando?", "Sim. As explicações visuais facilitam a consulta de quem ainda está ganhando experiência e quer depender menos do improviso."],
  ["Quem já trabalha como garçom também pode usar?", "Pode. O material funciona como uma referência rápida para revisar movimentos, conferir detalhes e organizar melhor o serviço."],
  ["É um curso em vídeo?", "Não. É um material visual de consulta. Você abre a técnica que precisa e encontra a orientação sem ter que assistir a uma aula inteira."],
  ["Como vou receber o acesso?", "O acesso é digital e fica disponível após a confirmação da compra, conforme o processo da plataforma de pagamento."],
  ["Consigo consultar pelo celular?", "Sim. Você pode abrir o material pelo celular, tablet ou computador e imprimir páginas se isso for útil na sua rotina."],
  ["Os bônus também são digitais?", "Sim. No Plano Completo, os quatro bônus acompanham o material principal em formato digital."],
  ["O certificado comprova formação profissional?", "Não. Ele registra a conclusão do material, mas não substitui formação profissional, treinamento obrigatório ou certificação exigida por uma empresa."],
  ["Qual é a diferença entre o Plano Básico e o Completo?", "O Plano Básico inclui as +101 Técnicas do Garçom. O Plano Completo reúne o material principal e os quatro bônus apresentados na página."],
  ["Como funciona a garantia?", "Você tem 7 dias para acessar e conhecer o material. Se não quiser continuar dentro desse prazo, pode solicitar o reembolso pelas regras da plataforma de pagamento."]
];
export function checkoutWithParams(checkout, search = "") {
  if (!checkout || checkout.includes("{{")) return null;
  try {
    const url = new URL(checkout);
    if (!["https:", "http:"].includes(url.protocol)) return null;
    const incoming = new URLSearchParams(search);
    for (const [key, value] of incoming) {
      if (!url.searchParams.getAll(key).includes(value)) url.searchParams.append(key, value);
    }
    return url.href;
  } catch {
    return null;
  }
}
export function getOfferDeadline(storage, now = Date.now()) {
  let start = now;
  try {
    const saved = storage?.getItem(offerConfig.countdownStorageKey);
    const parsed = Number(saved);
    if (saved !== null && saved !== void 0 && Number.isFinite(parsed) && parsed > 0 && parsed <= now) start = parsed;
    else storage?.setItem(offerConfig.countdownStorageKey, String(now));
  } catch {
  }
  return start + offerConfig.countdownMinutes * 60 * 1e3;
}
