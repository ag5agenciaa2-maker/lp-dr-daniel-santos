# Estrutura do site — Daniel Santos da Silva (Sociedade de Advocacia)

> Leia este arquivo ANTES de criar ou editar qualquer página deste projeto.
> Ele descreve a estrutura; o arquivo `_nav-footer-template.html` (nesta mesma pasta) é o código pra colar.

## 1. Mapa de páginas

| Arquivo | Pasta | Profundidade (`{{BASE}}`) |
|---|---|---|
| `index.html` | raiz | `` (vazio) — é a própria referência |
| `termos-e-condicoes.html` | raiz | `` (vazio) |
| `politica-de-privacidade.html` | raiz | `` (vazio) |

Não há páginas em subpasta neste projeto. Se uma for criada (ex.: `blog/post.html`), `{{BASE}}` = `../`.

## 2. Template canônico

Toda página nova (ou qualquer página existente sendo re-sincronizada) deve partir de
`docs/_nav-footer-template.html` — nunca copiar nav/footer de uma página secundária, que pode
estar desatualizada. O template usa o placeholder `{{BASE}}`: substitua por `` na raiz ou `../`
em subpastas, em TODOS os `href`/`src` marcados.

Sempre que o nav ou footer do `index.html` mudar, regenerar esse template e re-rodar a sincronização
nas páginas secundárias (skill "Rodapé Padrão nas Páginas").

## 3. Itens obrigatórios em TODA página do site

1. **Nav idêntico ao index**: logo + pílula de navegação (`.nav__pill`) + CTA WhatsApp (`.nav__cta`) + toggle mobile (`.nav__toggle`).
2. **Footer idêntico ao index**: 4 colunas (Marca / Navegação / Serviços / Contato) + linha de créditos (copyright + Cookies + Termos + Política | AG5).
3. **Drawer mobile** (`#drawer` + `#drawer-overlay`) — sem ele o botão hambúrguer não abre nada.
4. **Banner de cookies LGPD** (`#ck-banner`) + **modal de preferências** (`#ck-modal`) + `cookie-banner.css` no `<head>` + `cookie-banner.js` no final do `<body>`.
5. **Botão flutuante de WhatsApp** (`.wa-premium-container`) — mesmo em páginas legais, mantém o canal de contato sempre acessível.
6. **`script.js`** no final do `<body>`, ANTES do `cookie-banner.js`.
7. **`<meta charset>`, `<meta viewport>`, favicon, `<link rel="stylesheet" href="style.css">`** — sempre presentes.
8. O modal de Dúvidas (`#obj-modal`) pode ser incluído por consistência mesmo em páginas sem seção FAQ — ele fica inerte (sem gatilho `.depo__row` na página) e não quebra nada.

## 4. Regra de profundidade de caminho

Projeto 100% raiz hoje — todo `href`/`src` é direto (`assets/...`, `style.css`, `index.html`).
Se um dia existir subpasta, todo caminho do template marcado com `{{BASE}}` vira `../` e os
`href` internos da própria seção (ex. índice de blog) continuam relativos à subpasta, sem `{{BASE}}`.

## 5. Armadilhas conhecidas deste projeto

- **Aspas curvas**: nunca usar `"`/`"` em atributos HTML (`class="..."`) — quebra o parsing.
  Já ocorreu uma vez ao editar a seção Sobre; sempre usar aspas retas `"`.
- **Links do menu**: a navbar usa âncoras da home (`#topo`, `#servicos`, `#grade-mentoria`, `#sobre`,
  `#contato`). Nas páginas legais, esses mesmos hrefs precisam do prefixo `index.html` (ex.:
  `index.html#servicos`), senão o navegador tenta rolar uma âncora inexistente na própria página.
- **CTA "Quero saber mais"**: aponta para o WhatsApp (`wa.me/...`) com `target="_blank"`, não para
  `#contato` — foi um ajuste deliberado, não usar `#contato` aqui.
- **`.footer-contact__item`**: pode ser `<a>` (clicável) ou `<span>` (estático, ex. nome do
  escritório sem link do Google) — ambos usam a mesma classe, o CSS aplica hover só em `a.footer-contact__item`.
- **`script.js` é seguro em páginas sem certos elementos**: todos os blocos (`form-contato`,
  `obj-modal`, `wa-message-bubble`, etc.) têm guarda `if (elemento)` antes de usar — não quebra em
  página que não tenha o elemento, mas sempre confirmar ao adicionar funcionalidade nova ali.
- **Node `--check`**: depois de editar `script.js`, rodar `node --check script.js` para garantir
  sintaxe válida antes de considerar a tarefa concluída.

## 6. Como verificar após sincronizar

1. Abrir a página no navegador (desktop e mobile/responsive).
2. Nav: pílula central visível, CTA dourado visível, hover com underline dourado nos links.
3. Mobile: hambúrguer abre o drawer com overlay, fecha ao clicar fora ou no X.
4. Footer: 4 colunas alinhadas, sem texto cortado, WhatsApp e links funcionando.
5. Cookie: banner aparece na primeira visita, "Personalizar" abre o modal, preferências salvam.
6. Console do navegador sem 404 (checar `style.css`, `cookie-banner.css`, `script.js`, `cookie-banner.js`, `assets/*`).
