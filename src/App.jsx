import { useEffect, useRef, useState } from "react";
import Icon from "./AtlasIcon.jsx";
import { audiences, bonuses, benefits, faqs, offerConfig as offer, checkoutWithParams, getOfferDeadline } from "./offerConfig.js";
const assets = new Set(Object.keys(import.meta.glob("/public/assets/**/*.{png,webp}")).map((p) => p.replace("/public", "")));
function Asset({ src, alt, className = "", hero = false }) {
  return <div className={`asset ${className} ${assets.has(src) ? "" : "pending"}`} data-asset-path={src}>{assets.has(src) ? <img src={src} alt={alt} loading={hero || className === "pageAsset" ? "eager" : "lazy"} decoding="async" /> : <div role="img" aria-label={alt} />}</div>;
}
function CTA({ children, onClick }) {
  const content = <>{children}<Icon name="arrow" /></>;
  return onClick ? <button className="cta" onClick={onClick}>{content}</button> : <a className="cta" href="#planos">{content}</a>;
}
function Checkout({ children, basic = false, secondary = false }) {
  const href = checkoutWithParams(basic ? offer.basicCheckout : offer.completeCheckout, location.search);
  return href ? <a className={secondary ? "secondary" : "cta"} href={href}>{children}</a> : <button className={secondary ? "secondary" : "cta"} disabled data-checkout-pending>{children}</button>;
}
function List({ items, excluded = false }) {
  return <ul className={`featureList ${excluded ? "excluded" : ""}`}>{items.map((s) => <li key={s}><span aria-hidden="true">{excluded ? "×" : "✓"}</span><span>{s}</span></li>)}</ul>;
}
function Trust() {
  return <div className="trust">{[["lock", "PAGAMENTO SEGURO"], ["device", "ACESSO DIGITAL"], ["check", "SEM MENSALIDADE"]].map(([i, s]) => <span key={s}><Icon name={i} />{s}</span>)}</div>;
}
function Row({ numbers, reverse = false }) {
  const ref = useRef(null);
  const [held, setHeld] = useState(false);
  const [duration, setDuration] = useState(18);
  useEffect(() => {
    const ro = new ResizeObserver(() => setDuration(Math.max(15, Math.min(20, ref.current.clientWidth / 85))));
    ro.observe(ref.current);
    const release = () => setHeld(false);
    for (const e of ["pointerup", "pointercancel", "blur"]) window.addEventListener(e, release);
    return () => {
      ro.disconnect();
      for (const e of ["pointerup", "pointercancel", "blur"]) window.removeEventListener(e, release);
    };
  }, []);
  return <div className={`carouselRow ${reverse ? "reverse" : ""} ${held ? "held" : ""}`} tabIndex={0} aria-label={reverse ? "Segunda fileira de demonstração" : "Primeira fileira de demonstração"} onPointerDown={() => setHeld(true)} onPointerUp={() => setHeld(false)} onPointerCancel={() => setHeld(false)} onTouchEnd={() => setHeld(false)}><div className="track" style={{ "--duration": `${duration}s` }}>{[0, 1, 2].map((c) => <div className="group" key={c} ref={c === 0 ? ref : null} aria-hidden={c > 0 ? true : void 0}>{numbers.map((n) => <Asset key={n} className="pageAsset" src={`/assets/carrossel/${String(n).padStart(2, "0")}.webp`} alt={`Página demonstrativa ${n} do Atlas Visual do Pizzaiolo`} />)}</div>)}</div></div>;
}
function Upgrade({ open, close }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const el = ref.current, previous = document.activeElement, y = scrollY, style = document.body.getAttribute("style");
    document.body.style.cssText += `;position:fixed;top:-${y}px;width:100%;`;
    el.showModal();
    return () => {
      el.close();
      if (style === null) document.body.removeAttribute("style");
      else document.body.setAttribute("style", style);
      window.scrollTo({ top: y, behavior: "instant" });
      previous?.focus({ preventScroll: true });
    };
  }, [open]);
  function trapFocus(event) {
    if (event.key !== "Tab") return;
    const controls = [...ref.current.querySelectorAll('button:not(:disabled),a[href],[tabindex="0"]')];
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  return <dialog ref={ref} className="upgrade" aria-labelledby="upgrade-title" onKeyDown={trapFocus} onCancel={(e) => {
    e.preventDefault();
    close();
  }}><button className="close" onClick={close} aria-label="Fechar oferta especial" autoFocus>×</button><span className="eyebrow">OFERTA ESPECIAL</span><h2 id="upgrade-title">Receba o material completo  por Apenas R$ 17,90</h2><p>Aceite este desconto especial do Plano Completo por apenas R$ 7,90 a mais que o Plano Básico</p><Asset className="upgradeAsset" src="/assets/planos/plano-completo.webp" alt="Pacote completo do Atlas Visual do Pizzaiolo" /><List items={bonuses.map((b) => b.title)} /><div className="price">{offer.upgradePrice}</div><Checkout>SIM, QUERO O PLANO COMPLETO</Checkout><Checkout basic secondary>NÃO, QUERO CONTINUAR SOMENTE COM O BÁSICO</Checkout></dialog>;
}
function FAQ() {
  const [active, setActive] = useState(null);
  return <section className="section reading faq reveal" data-section="faq"><span className="eyebrow">DÚVIDAS FREQUENTES</span><h2>Perguntas Frequentes</h2><div className="faqList">{faqs.map(([q, a], i) => <article className={active === i ? "faqOpen" : ""} key={q}><h3><button id={`q${i}`} aria-expanded={active === i} aria-controls={`a${i}`} onClick={() => setActive(active === i ? null : i)}>{q}<span aria-hidden="true">+</span></button></h3><div id={`a${i}`} className="answer" role="region" aria-labelledby={`q${i}`} aria-hidden={active !== i}><div><p>{a}</p></div></div></article>)}</div></section>;
}
export default function App() {
  const [deadline] = useState(() => {
    let s;
    try {
      s = localStorage;
    } catch {
    }
    return getOfferDeadline(s);
  });
  const [now, setNow] = useState(Date.now);
  const [upgrade, setUpgrade] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(id);
  }, []);
  const remaining = Math.max(0, Math.ceil((deadline - now) / 1e3));
  const time = `${String(Math.floor(remaining / 3600)).padStart(2, "0")}:${String(Math.floor(remaining / 60) % 60).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  useEffect(() => {
    if (!window.IntersectionObserver || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const o = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        o.unobserve(e.target);
      }
    }), { threshold: 0.03 });
    document.querySelectorAll(".reveal, .hero, .intermediate, .plans > .reading, .plan, .finalCta > .reading").forEach((e) => {
      e.classList.add("animate");
      o.observe(e);
    });
    return () => o.disconnect();
  }, []);
  return <>
<header className="urgency" data-section="urgency"><strong>OFERTA EXCLUSIVA APENAS HOJE</strong><span>TERMINA EM: <b data-timer>{time}</b></span></header><main>
<section className="hero reading" data-section="hero"><span className="eyebrow heroLabel">MATERIAL ILUSTRADO</span><h1><span>+100 Fichas de Montagem de Pizzas</span><span>Para entender a estrutura de cada uma</span><span>com mais clareza e segurança</span></h1><p className="heroSubtitle">Um material visual e direto para quem está começando ou já trabalha como pizzaiolo e quer consultar, entender e executar diferentes montagens de pizza de forma muito mais prática</p><Asset src="/assets/hero-produto.webp" alt="Atlas Visual do Pizzaiolo — +100 Mapas de Montagem de Pizzas" className="heroAsset" hero /><CTA>QUERO ACESSAR O +100 FICHAS</CTA><p className="micro">Material 100% digital • Use no celular ou imprima • Pagamento único</p></section>
<section className="section reading audience reveal" data-section="audience"><h2>Para quem é este material?</h2><div className="vertical">{audiences.map((a, i) => <article className={`audienceCard ${i === 0 ? "featured" : ""}`} key={a.title}><Asset className="portrait" src={a.image} alt={a.title} /><div><h3>{a.title}</h3><p>{a.text}</p></div></article>)}</div></section>
<section className="section demo reveal" data-section="carousel"><h2>VEJA O MATERIAL POR DENTRO 👇</h2><Row numbers={[1, 2, 3, 4, 5]} /><Row numbers={[6, 7, 8, 9]} reverse /><div className="chips">{["VISTA SUPERIOR", "ANATOMIA EM CAMADAS", "SEQUÊNCIA VISUAL"].map((s) => <span key={s}>{s}</span>)}</div></section>
<section className="section reading summary reveal" data-section="summary"><Asset className="peopleAsset" src="/assets/plano-completo-pessoas.webp" alt="Plano Completo do Atlas Visual do Pizzaiolo" /><h2>Veja tudo o que você terá acesso imediato ao escolher o material completo:</h2><div className="summaryCards"><article><Icon name="pizza" /><div><h3>Atlas Visual do Pizzaiolo</h3><p>Fichas Ilustradas para saber todo o processo de montagem das Pizzas diretamente impresso ou no celular</p></div></article>{bonuses.map((b) => <article key={b.title}><Icon name={b.icon} /><div><h3>{b.summaryTitle}</h3><p>{b.summary}</p></div></article>)}</div><p className="micro">Tudo em formato digital • Consulte no celular • Imprima as páginas que quiser</p></section>
<div className="reading intermediate" data-section="intermediate"><CTA>VER PLANOS</CTA></div>
<section className="section reading benefits reveal" data-section="benefits"><h2>O QUE MUDA NA PRÁTICA?</h2><p className="intro">Em vez de tentar lembrar dezenas de sabores de cabeça, você consulta um mapa visual e entende rapidamente como aquela pizza é estruturada.</p><div className="benefitCards">{benefits.map((b, i) => <article key={b.title}><div className="benefitVisual"><span>0{i + 1}</span><Icon name={b.icon} /></div><div><h3>{b.title}</h3><p>{b.text}</p></div></article>)}</div></section>
<section className="section reading bonuses reveal" data-section="bonuses"><span className="eyebrow">4 BÔNUS NO PLANO COMPLETO</span><h2>Materiais extras para complementar o Atlas.</h2><p className="intro">Além dos +100 Mapas de Montagem, o Plano Completo libera quatro materiais adicionais para aprofundar a parte prática e visual.</p><div className="bonusCards">{bonuses.map((b, i) => <article key={b.title}><span className="bonusNumber">BÔNUS 0{i + 1}</span><Asset className="bonusAsset" src={b.image} alt={b.title} /><div className="bonusCopy"><h3>{b.title}</h3><p>{b.text}</p><div className="bonusPrice"><del>DE {b.value}</del><strong>GRÁTIS</strong></div></div></article>)}</div></section>
<section className="reading calculatorImage reveal" data-section="bonus-value"><img src="/assets/generated/calculadora-pizza.webp" width="985" height="1596" loading="lazy" decoding="async" alt="Somando tudo o que você vai levar. Manual Visual de Pré-Preparo: R$ 27,00. Guia Visual de Porcionamento e Distribuição: R$ 23,00. +30 Desafios Visuais do Pizzaiolo: R$ 17,00. Certificado de Conclusão: R$ 20,00. Valor total dos bônus: R$ 87,00. Mas hoje, tudo sairá por: R$ 0,00 (GRÁTIS)." /></section>
<section className="section plans" id="planos" data-section="plans"><div className="reading"><span className="eyebrow">DECIDA O SEU PLANO</span><h2>Escolha o <em>MELHOR PLANO PARA VOCÊ</em></h2><p className="offerNotice">CONDIÇÃO ESPECIAL DISPONÍVEL NESTA OFERTA</p><div className="tileTimer" data-timer aria-label={`Tempo restante: ${time}`}>{time.split("").map((s, i) => <span key={i} className={s === ":" ? "colon" : "digit"}>{s}</span>)}</div></div><div className="planGrid">
<article className="plan basic" data-section="basic"><span className="eyebrow">PAGAMENTO ÚNICO</span><h3>Plano Básico</h3><p className="planDescription">Para quem quer começar apenas com o material principal.</p><div className="price">{offer.basicPrice}</div><List items={["Atlas Visual do Pizzaiolo - +100 Mapas de Montagem de Pizzas", "Acesso digital imediato", "Imprimível"]} /><List excluded items={bonuses.map((b) => b.title)} /><div className="planAction"><CTA onClick={() => setUpgrade(true)}>QUERO SOMENTE O PLANO BÁSICO</CTA><Trust /><a className="upgradeHint" href="#plano-completo"><Icon name="arrow" /><span>Temos uma oferta especial para você</span><Icon name="arrow" /></a></div></article>
<Upgrade open={upgrade} close={() => setUpgrade(false)} />
<article className="plan complete" id="plano-completo" data-section="complete"><span className="popular">MAIS ESCOLHIDO</span><h3>Plano Completo</h3><p className="planDescription">Leve o material principal com todos os bônus complementares</p><Asset className="planAsset" src="/assets/planos/plano-completo.webp" alt="Plano Completo com todos os bônus" /><del className="anchorPrice">{offer.completeAnchor}</del><span className="por">POR:</span><div className="price">{offer.completePrice}</div><List items={["Atlas Visual do Pizzaiolo", "+100 Mapas de Montagem", "Material digital", "Consulta pelo celular"]} /><div className="includedBonuses imageBonus"><img src="/assets/generated/exclusive-bonuses.webp" alt="+ 4 BÔNUS EXCLUSIVOS. DE R$ 87,00. Manual Visual de Pré-Preparo dos Ingredientes; Guia Visual de Porcionamento e Distribuição; +30 Desafios Visuais do Pizzaiolo; Certificado de Conclusão." loading="lazy" decoding="async" /></div><div className="planAction"><Checkout>QUERO O PLANO COMPLETO</Checkout><Trust /></div></article></div></section>
<section className="section reading guarantee reveal" data-section="guarantee"><div className="guaranteeSeal imageSeal"><img src="/assets/generated/guarantee.webp" alt="7 DIAS — COMPRA PROTEGIDA" loading="lazy" decoding="async" /></div><h2>Você tem 7 dias para conhecer o material.</h2><p>Acesse o Atlas, veja como os mapas funcionam e avalie o conteúdo com calma. Se dentro do prazo de 7 dias você decidir que não quer continuar com o material, poderá solicitar o reembolso conforme as regras da plataforma de pagamento utilizada na compra.</p></section>
<FAQ /><section className="section finalCta" data-section="final"><div className="reading"><Icon name="pizza" /><h2>Tenha uma referência sempre por perto</h2><p>Tenha +100 Mapas de Montagem para consultar diferentes pizzas sem depender somente da memória.</p><CTA>QUERO ACESSAR AS FICHAS</CTA></div></section>
</main><footer data-section="footer"><div className="reading"><p>O Atlas Visual do Pizzaiolo é um material educacional e de apoio visual. As referências apresentadas podem ser adaptadas aos ingredientes, processos, porcionamentos e padrões adotados por cada operação. O material não substitui boas práticas de manipulação de alimentos, normas sanitárias, procedimentos internos ou formação profissional quando exigida.</p><p>© 2026 Atlas Visual do Pizzaiolo</p></div></footer></>;
}
