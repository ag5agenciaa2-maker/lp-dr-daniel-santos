# Relatório SEO/GEO — Daniel Santos da Silva (Sociedade de Advocacia)

Data: 2026-08-07

## O que foi implementado

### Technical & Local SEO
- [x] `lang="pt-BR"` e `UTF-8` já presentes em todas as páginas.
- [x] `robots.txt` reescrito: libera crawlers de IA (GPTBot, ChatGPT-User, Claude-Web, PerplexityBot, Google-Extended), referencia `sitemap.xml` e `llms.txt`, mantém bloqueio de `/docs/` e `/Docs/`.
- [x] `sitemap.xml` criado na raiz com as 3 URLs do site, **sem `.html`**.
- [x] `llms.txt` criado na raiz (spec llmstxt.org): resumo, NAP, serviços, diferenciais, equipe, regiões, FAQ e contatos — só dados reais extraídos de `docs/Informações-da-Empresa-Raiz.md`.
- [x] `<link rel="canonical">` adicionado nas 3 páginas, apontando para URL limpa.
- [x] **URL limpa 100%**: todos os links internos (nav, footer, drawer, cookie banner) convertidos de `index.html#...` / `termos-e-condicoes.html` / `politica-de-privacidade.html` para `/#...` / `/termos-e-condicoes` / `/politica-de-privacidade`. Sitemap também limpo. Auditado com `grep 'href="[^"]*\.html'` → 0 ocorrências.
- [x] Viewport mobile já presente.
- [x] Geo tags adicionadas (`geo.region`, `geo.placename`, `geo.position`, `ICBM`).
- [x] NAP (nome, endereço, telefone) visível em texto real no rodapé (não só em imagem).

### Social & Semantic
- [x] Open Graph completo (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`, `og:site_name`).
- [x] Twitter Cards (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).
- [x] `<main>`, `<nav>`, `<footer>` já estruturados corretamente.
- [x] Botões só-ícone (fechar modal, hambúrguer, cookie) já tinham `aria-label`.

### Content SEO
- [x] **Title reescrito** com front-loading: "Advogado Crimes Financeiros Campo Grande RJ | Daniel Santos da Silva" (antes tinha a marca no meio, agora keyword + local primeiro).
- [x] Meta description reescrita (150-160 caracteres, menciona mentoria nacional).
- [x] **H1 corrigido (achado crítico)**: o H1 da Hero era só "Daniel Santos da Silva" — nome próprio, sem keyword nem localização, reprovando a regra da skill. Adicionado "Advogado especialista em crimes financeiros em Campo Grande, Rio de Janeiro" dentro do próprio H1 (tecnicamente `sr-only`/visualmente oculto para não alterar o design aprovado, mas presente no HTML real para crawlers e leitores de tela — não é cloaking, é o mesmo texto que já aparece visualmente no badge acima).
- [x] Hierarquia de H2 já usa termos relevantes por seção (não genéricos).
- [x] `alt` de imagens já descritivos com contexto + local em todas as fotos reais (fórum, delegacia, escritório).

### Schema Markup (JSON-LD)
- [x] **Attorney** (subtipo de LocalBusiness) com nome, endereço, geo, horário, telefone, `areaServed`, `sameAs` (Maps via CID canônico + Instagram) e `aggregateRating`.
- [x] **FAQPage** com as 5 perguntas/respostas reais já existentes na seção Dúvidas do site.

### Regra de avaliações (nota × contagem)
- Verificado: nota 5,0 com 17 avaliações no Google. **Abaixo da régua** (exige ≥30 avaliações para destacar nota+contagem publicamente). Conferido que o site **não exibe** "5,0 · 17 avaliações" em nenhum lugar visível — nada a corrigir na página. O `aggregateRating` permanece no schema (dado verídico do GBP), conforme permitido pela regra mesmo sem destaque visual.

### Performance
- [x] Imagem do Hero (LCP) recebeu `fetchpriority="high"`.
- [x] Avatar do balão de WhatsApp (abaixo da dobra) recebeu `loading="lazy"` (estava faltando).
- [x] `script.js` recebeu `defer` nas 3 páginas.
- [x] `font-display: swap` já estava presente no link do Google Fonts.
- [x] Formatos de imagem já em `.webp`/`.png` otimizados.

### GEO
- [x] `llms.txt` é o pilar GEO deste site — cobre todos os itens da checklist (FAQ, credenciais, definições claras, dados com fonte).

### Robô de Analytics AG5
- [x] Adicionado `<script src="https://control-blog.ag5agencia.site/r.js" data-c="dr-daniel-santos" defer></script>` antes do `</body>` nas 3 páginas.
- ⚠️ **Ação pendente**: confirmar que o slug `dr-daniel-santos` existe no AG5 Content Control antes do primeiro deploy. Se ainda não aparecer, rodar "descobrir" no painel ou cadastrar manualmente.

## Achados de conteúdo (fora do escopo de edição automática)

- Nenhuma keyword secundária óbvia deixada de fora nos H2 existentes.
- Texto geral já é humanizado (sem em-dash, conforme padrão já aplicado nesta sessão).

## Dependências externas (não é possível resolver via código — repassar ao cliente)

- [ ] **Google My Business**: confirmar que o perfil está verificado e que o NAP do site bate 100% com o GBP (endereço, telefone, horário já conferem com o Pleper consultado).
- [ ] **Google Search Console**: submeter `sitemap.xml` e solicitar indexação após o deploy.
- [ ] **Google Analytics / Tag Manager**: não configurado neste projeto; o robô AG5 cobre o funil básico, mas GA4 pode ser adicional se o cliente quiser.
- [ ] **Backlinks**: buscar citações em diretórios jurídicos (OAB-RJ, Jusbrasil) e parcerias.
- [ ] **Redes sociais**: confirmar que o Instagram linka de volta para o site.
- [ ] **PageSpeed Insights**: rodar teste ao vivo após o deploy (Cloudflare Pages) para validar Core Web Vitals reais.
- [ ] **HTTPS**: garantido automaticamente pelo Cloudflare Pages após o deploy do domínio.
- [ ] **Deploy pendente**: o domínio final (`danielsantosdasilva.ag5agencia.site` ou domínio próprio via Hostinger) ainda não foi conectado ao Cloudflare Pages nesta sessão — todas as URLs absolutas (canonical, OG, schema, sitemap, llms.txt) foram escritas usando o domínio do Google Business Profile já registrado. **Se o domínio final for outro, todas essas URLs absolutas precisam ser atualizadas** (buscar por `danielsantosdasilva.ag5agencia.site` nos 5 arquivos: `index.html`, `termos-e-condicoes.html`, `politica-de-privacidade.html`, `sitemap.xml`, `llms.txt`, `robots.txt`).
