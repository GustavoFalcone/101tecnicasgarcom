export const offerConfig = {
  name: "Atlas Visual do Pizzaiolo",
  basicPrice: "R$ 10,00",
  completePrice: "R$ 27,90",
  completeAnchor: "DE R$ 97,00",
  upgradePrice: "R$ 17,90",
  bonusTotal: "R$ 87,00",
  basicCheckout: "https://zuckpay.com.br/checkout/plano-basico-100-mapas-de-montagem-de-pizzas",
  completeCheckout: "https://zuckpay.com.br/checkout/plano-completo-100-mapas-de-montagem-de-pizzas",
  upgradeCheckout: "https://zuckpay.com.br/checkout/plano-completo-100-mapas-de-montagem-de-pizzas-1",
  countdownMinutes: 30,
  countdownStorageKey: "atlas-pizzaiolo:offer-start:v1"
};
export const audiences = [
  { image: "/assets/generated/pizzaiolo-iniciante.webp", title: "Pizzaiolo iniciante ou auxiliar", text: "Para quem está começando ou estudando sobre pizzas e ainda se confunde com ingredientes, sabores e montagens." },
  { image: "/assets/generated/pizzaiolo-profissional.webp", title: "Quem já trabalha em Pizzarias", text: "Para quem precisa consultar rapidamente um sabor, conferir os componentes e não depender somente da memória no meio da produção." },
  { image: "/assets/generated/dono-gerente.webp", title: "Dono ou gerente de pizzaria", text: "Para quem quer usar o material como apoio visual para organizar referências de montagem e facilitar o treinamento de quem está entrando na equipe." },
  { image: "/assets/generated/empreendedor.webp", title: "Quem vende pizza em casa ou está começando um delivery (Empreendedores)", text: "Para empreendedores terem uma base visual de diferentes sabores para ampliar seu repertório sem precisar improvisar cada montagem do zero." }
];
export const bonuses = [
  { image: "/assets/bonus/bonus-01.webp", title: "Manual Visual de Pré-Preparo dos Ingredientes", summaryTitle: "MANUAL VISUAL DE PRÉ-PREPARO DOS INGREDIENTES", shortTitle: "Manual Visual de Pré-Preparo", text: "Um material ilustrado para consultar cortes, organização e pré-preparo de ingredientes usados na montagem.", summary: "Veja como organizar e preparar diferentes ingredientes antes da montagem de forma muito mais visual.", value: "R$ 27,00", icon: "prep" },
  { image: "/assets/bonus/bonus-02.webp", title: "Guia Visual de Porcionamento e Distribuição", summaryTitle: "GUIA VISUAL DE PORCIONAMENTO E DISTRIBUIÇÃO", shortTitle: "Guia Visual de Porcionamento e Distribuição", text: "Veja exemplos visuais de distribuição para evitar concentração excessiva e compreender melhor a área de cobertura da pizza.", summary: "Referências visuais para entender melhor como distribuir os ingredientes pela área útil da pizza.", value: "R$ 23,00", icon: "sectors" },
  { image: "/assets/bonus/bonus-03.webp", title: "+30 Desafios Visuais do Pizzaiolo", summaryTitle: "+30 DESAFIOS VISUAIS DO PIZZAIOLO", shortTitle: "+30 Desafios Visuais do Pizzaiolo", text: "Desafios ilustrados para testar seu olhar, identificar problemas e praticar a leitura visual de diferentes montagens.", summary: "Exercícios ilustrados para testar seu olhar e treinar a identificação de problemas de montagem e distribuição.", value: "R$ 17,00", icon: "eye" },
  { image: "/assets/bonus/bonus-04.webp", title: "Certificado de Conclusão", summaryTitle: "CERTIFICADO DE CONCLUSÃO", shortTitle: "Certificado de Conclusão", text: "Certificado digital para registrar a conclusão do material.", summary: "Um certificado digital de conclusão do material para registrar que você finalizou o conteúdo.", value: "R$ 20,00", icon: "certificate" }
];
export const benefits = [
  { title: "Pare de depender só da memória", text: "Quando surgir dúvida sobre um sabor, abra o mapa e confira os componentes visualmente.", icon: "memory" },
  { title: "Entenda a estrutura da montagem", text: "Veja a pizza pronta, a anatomia em camadas e uma sequência visual de referência na mesma página.", icon: "layers" },
  { title: "Visualize pizzas divididas com mais clareza", text: "Consulte referências de meio a meio, 3 sabores e 4 sabores sem se perder entre os setores.", icon: "sectors" },
  { title: "Consulte do jeito que for mais prático", text: "Abra pelo celular durante a rotina ou imprima as páginas que quiser deixar por perto.", icon: "device" }
];
export const faqs = [
  ["O que é o Atlas Visual do Pizzaiolo?", "É um material digital com +100 Mapas de Montagem de Pizzas. Cada mapa apresenta a pizza visualmente para facilitar a consulta dos componentes, da anatomia e da estrutura de montagem."],
  ["Serve para quem está começando?", "Sim. O material foi pensado justamente para ser fácil de consultar, inclusive por pizzaiolos iniciantes, auxiliares e pessoas que ainda estão ganhando experiência na bancada."],
  ["Já trabalho como pizzaiolo. Ainda pode me ajudar?", "Sim. Você pode usar o Atlas como referência rápida quando quiser conferir um sabor, uma composição ou uma pizza dividida sem depender apenas da memória."],
  ["É um curso em vídeo?", "Não. O Atlas é um material visual e digital de consulta. A proposta é abrir, localizar a pizza e entender a montagem sem precisar assistir a aulas longas."],
  ["Como vou receber o material?", "O material é digital. Após a confirmação da compra, o acesso é liberado conforme o processo da plataforma utilizada no checkout."],
  ["Posso usar pelo celular?", "Sim. O material foi pensado para consulta digital e pode ser aberto pelo celular. Você também poderá imprimir páginas quando isso for mais prático para sua rotina."],
  ["Preciso seguir todas as montagens exatamente iguais?", "Não. O Atlas funciona como referência visual. Cada pizzaria pode possuir seu próprio padrão de massa, porcionamento, ingredientes e montagem, então o conteúdo pode ser adaptado à realidade da operação."],
  ["O certificado me torna um pizzaiolo profissional?", "Não. O certificado registra a conclusão do material e não substitui formação profissional, certificação reconhecida ou exigências específicas da profissão."],
  ["Qual a diferença entre o Plano Básico e o Completo?", "O Plano Básico libera o Atlas principal com os +100 Mapas de Montagem. O Plano Completo inclui o Atlas e também os quatro bônus da oferta."]
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
