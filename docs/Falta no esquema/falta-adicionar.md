# 📋 Falta Adicionar no Schema
**Empresa:** Advogado Campo Grande RJ - Daniel Santos da Silva | Direito Penal | Direito Tributário
**Data de geração:** 07/08/2026

---

## 🔴 CRÍTICOS — Impactam SEO diretamente

- [ ] Nenhum crítico pendente — CID, Place ID, geo, endereço completo, horário e telefone já estavam disponíveis na fonte de raiz (Pleper) e foram todos aplicados.

## 🟡 IMPORTANTES

- [ ] `sameAs` Facebook — link da página da empresa não encontrado no site nem na raiz.
- [ ] `sameAs` LinkedIn — não encontrado; confirmar se aplicável ao negócio.
- [ ] `email` — não encontrado no site nem na raiz (formulário de contato não expõe e-mail direto).

## 🔵 COMPLEMENTARES

- [ ] `foundingDate` — a raiz informa apenas "Advogado desde 2014" (carreira), não a data de abertura formal do escritório atual (7 endereços/10 advogados). Não é seguro inferir uma data exata sem confirmação.
- [ ] `founder.sameAs` — Instagram pessoal do Dr. Daniel (distinto do Instagram institucional já usado em `sameAs` do negócio) não encontrado.
- [ ] `paymentAccepted` — formas de pagamento não listadas no site.
- [ ] `legalName` — razão social formal (CNPJ/registro) não exibida no site nem na raiz; usado `name` = nome verificado do GBP.
- [ ] `datePublished` / `dateModified` da `WebPage` — datas de publicação da LP não determinadas (projeto ainda em fase de deploy).

## 🟢 FAQ

- [x] Seção FAQ presente na LP (#faq) — já incluída no schema `FAQPage`.

---

## ✅ Resolvidos Automaticamente

- [x] `identifier.Google CID` — 4293609813499277578
- [x] `identifier.Google Place ID` — ChIJz2dqsa3jmwARCnHBeWD3lTs
- [x] `hasMap` + `sameAs[0]` — URL canônica `https://maps.google.com/?cid=4293609813499277578` aplicada
- [x] `geo.latitude` / `geo.longitude` — Derivadas da raiz (Pleper): -22.9043548 / -43.5657018
- [x] `name` — Oficial (GBP verificado): Daniel Santos da Silva - Sociedade de Advocacia
- [x] `alternateName` — Fórmula AG5 aplicada: `Advogado Campo Grande RJ - Daniel Santos da Silva | Direito Penal | Direito Tributário`
- [x] `areaServed` — Bairro base (Campo Grande) + 5 adjacentes do Rio de Janeiro (Senador Vasconcelos, Santíssimo, Cosmos, Inhoaíba, Paciência) + Baixada Fluminense + Rio de Janeiro (cidade)
- [x] `aggregateRating` — 5.0 / 17 avaliações (visível na raiz, Pleper)
- [x] `founder` — Nome, cargo e bio curta extraídos do site (seção Sobre)
- [x] `hasOfferCatalog` — 3 serviços principais extraídos da seção Serviços do site
- [x] `sameAs` Instagram — https://www.instagram.com/daniel_sociedade_de_advocacia/
- [x] `FAQPage` — 5 perguntas/respostas reais extraídas da seção Dúvidas do site
- [x] `WebSite` e `WebPage` com `@id` únicos, ligados via `@graph`

---

📌 **Após preencher cada item:** remover o `[ ]`, substituir o placeholder no Schema e revalidar em https://validator.schema.org/
📌 **NAP** já está idêntico ao Google Business Profile (conferido contra a raiz).

⚠️ **Nota sobre URL**: todo o schema usa `https://www.danielsantosdasilva.ag5agencia.site/` como domínio, conforme solicitado. Se o domínio final de publicação for outro, todos os `@id`, `url`, `image`, `logo`, `hasMap` precisam ser atualizados (buscar por `danielsantosdasilva.ag5agencia.site` em `index.html`).
