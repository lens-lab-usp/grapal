# Site do GRAPAL

Site do GRAPAL (Grupo de Assistência Psicológica ao Aluno), serviço de saúde mental da
Faculdade de Medicina da Universidade de São Paulo. O conteúdo segue os manuais do serviço
(Manual do Aluno e Manual do Residente, versão 1.000), e a identidade visual segue o Manual
da Marca FMUSP (ver "Identidade visual", abaixo).

Endereço: **https://lens.fm.usp.br/grapal/** (publicado pelo GitHub Pages). O endereço próprio
`grapal.fm.usp.br` ainda depende do registro de DNS (ver "Endereço próprio", abaixo).

## Estrutura

É uma página única (`index.html`), dividida em seções com endereço próprio, que podem ser
usadas em links diretos:

| Seção | Endereço |
|---|---|
| Início | `/#inicio` |
| Como falar com o GRAPAL | `/#contato` |
| O que acontece quando você procura | `/#como-funciona` |
| Para quem é da graduação (inclui psicoterapia breve) | `/#graduacao` e `/#psicoterapia` |
| Para residentes | `/#residentes` |
| Sigilo | `/#sigilo` |
| Se alguém se preocupa com você | `/#preocupacao` |
| Urgência e emergência | `/#urgencia` |
| Dúvidas frequentes | `/#duvidas` |
| Outros apoios na FMUSP | `/#apoios` |
| Equipe | `/#equipe` |
| Manuais em PDF | `/#manuais` |
| Queremos te ouvir (formulário de opinião) | `/#ouvir` |

Outros arquivos: `assets/site.css` (aparência), `assets/site.js` (comportamento),
`assets/marca-fmusp.png` e `assets/marca-fmusp-branca.png` (marca da FMUSP), `fotos/` (equipe,
320 × 320 px), `manuais/` (PDFs), `404.html` (endereço não encontrado) e `psicoeducacao/`
(área de psicoeducação, com páginas e estilos próprios).

O site é HTML, CSS e um pouco de JavaScript, sem bibliotecas, sem banco de dados e sem nenhum
recurso de fora (só o formulário de opinião envia a mensagem para o Google, ver abaixo). **Não usa cookies e não coleta dados de quem visita.** Sem JavaScript, todo o
conteúdo continua aparecendo; só deixam de funcionar a animação e o destaque "Agora" da urgência.

## Identidade visual

O site segue o Manual da Marca FMUSP (2017), publicado em
`https://www.fm.usp.br/imt/conteudo/manual_marca_fmusp_oficial_2017.pdf`.

**Marca.** `assets/marca-fmusp.png` (verde-escuro) e `assets/marca-fmusp-branca.png` (negativo,
usada sobre o triângulo do rodapé). Para trocar pelo arquivo oficial da Comunicação, suba os novos
com esses mesmos nomes, em PNG de fundo transparente e na proporção original (largura igual a duas
vezes a altura). A marca não é recortada nem recolorida, e nada fica a menos de uma altura do "M"
de MEDICINA de distância dela.

**Tipografia.** A fonte da FMUSP é a FF Unit Slab; o manual indica a Lucida Sans quando ela não
está disponível. O site pede as duas nessa ordem (variável `--font`, em `assets/site.css`): quem
tem a FF Unit Slab instalada vê o site com ela, e os demais veem a Lucida Sans (no Mac, a mesma
letra se chama Lucida Grande). Celulares não trazem nenhuma das duas: o iPhone usa a Verdana, de
desenho próximo, e o Android, a fonte padrão do aparelho. Para a FF Unit Slab aparecer para todo
mundo é preciso publicar os arquivos da fonte junto com o site (regra `@font-face`), o que depende
de a licença da FMUSP permitir o uso na web.

**Triângulos.** São os dois do manual: o de 39°, em verde-escuro, sempre na frente, e o de 26°,
em verde-água. Na capa (seção Início) a marca fica centrada na vertical que passa pelo ponto em
que os dois se cruzam. Os ângulos estão fixos no CSS (0,8098 e 0,4877 são as tangentes de 39° e
de 26°) e não devem ser alterados; tamanho e posição se ajustam pelas variáveis `--T`, `--yi` e
`--marca` da regra `.hero`. O triângulo de 26° em verde-escuro se repete no canto superior
direito das seções de fundo claro e no canto inferior esquerdo do rodapé, onde leva a marca em
negativo. As caixas de destaque têm o canto cortado das caixas do próprio manual.

**Cores.** Verde-escuro Pantone 342 C (`#006747`) e verde-água Pantone 320 C (`#009ca6`). Das
complementares, azul-marinho 3025 C na residência, vermelho 200 C na urgência e laranja 1375 C
nos avisos.

A área `psicoeducacao/` segue as mesmas regras; o que é próprio da identidade está em
`psicoeducacao/assets/identidade-fmusp.css`.

## Como alterar

Toda alteração na ramificação `main` entra no ar sozinha em um ou dois minutos. Dá para editar
pelo próprio site do GitHub: abra o arquivo, clique no lápis, altere e clique em **Commit changes**.
Se depois disso a página ainda parecer a antiga, recarregue ignorando o cache (Ctrl+Shift+R, ou
Cmd+Shift+R no Mac). Os endereços de `site.css` e `site.js` em `index.html` levam um `?v=...`: ao
alterar um desses dois arquivos, mude esse número nas duas linhas para o navegador baixar a versão nova.

**Contatos.** O e-mail e o WhatsApp aparecem em vários pontos (botões do início, seção de
contato, caixa "Para quem está preocupado" e rodapé). Use a busca no arquivo pelo número ou
pelo e-mail e altere todas as ocorrências. O link do WhatsApp tem o formato
`https://wa.me/5511987440393`.

**Equipe.** Cada pessoa aparece em dois lugares de `index.html`: na fileira de fotos do início
(bloco `faces-grid`) e na seção Equipe (listas `people`). Suba a foto em `fotos/` (quadrada,
de preferência 320 × 320 px, nome em minúsculas e sem acento, como `nome-sobrenome.jpg`) e copie
um item existente nos dois lugares, trocando arquivo, nome e função. Na seção Equipe, quem tem
mini currículo é um botão (`p-btn`) seguido do bloco `p-cv`, com o registro profissional (`p-reg`),
o texto em um parágrafo e, se houver, links (como o Google Scholar) no parágrafo `p-links`; clicar
na foto ou no nome abre esse conteúdo numa janela. Quem ainda não
tem mini currículo fica só com foto, nome e função, sem botão: copie o item de alguém que tem para
incluir o texto. Para retirar alguém, apague os dois itens e a foto.

**Aviso de novidade.** O selo "Novo" no topo do início (consultas on-line) é o link `news`, logo no
começo da seção Início de `index.html`. Para tirá-lo, apague esse link; o texto completo continua na
caixa "Novo: consultas on-line" (`#online`), na seção de contato, e nas dúvidas frequentes.

**Manuais.** Suba o PDF novo em `manuais/` com o mesmo nome do antigo
(`manual-do-aluno-grapal.pdf` ou `manual-do-residente-grapal.pdf`) e ajuste a versão escrita
na seção Manuais.

**Data de atualização.** Fica no rodapé ("Atualizado em ...").

## O destaque "Agora" na urgência

Na seção de urgência, o site marca qual dos dois locais procurar naquele momento, pelo horário
de São Paulo, seguindo a regra dos manuais: dias úteis, das 8h às 17h, pronto-atendimento do
CeAC; noites, fins de semana e feriados, Unidade de Emergência Referenciada (UER-ICHC). Os dois
locais aparecem sempre; o destaque só
indica o do momento.

Quando há dúvida, o site indica a UER-ICHC. Contam como dia não útil os feriados nacionais, o
9 de julho (estadual), o 25 de janeiro (municipal), carnaval (segunda e terça), Quarta-feira de
Cinzas, Sexta-feira Santa, Corpus Christi, 24 e 31 de dezembro. As datas móveis são calculadas
a partir da Páscoa de cada ano, então não precisam ser atualizadas. Para incluir uma data fixa,
edite a lista `fixos` em `assets/site.js` (formato mês-dia, por exemplo `'11-20'`).

## Formulário "Queremos te ouvir"

A seção `#ouvir` tem um formulário para alunos e residentes darem opinião sobre o serviço. Quem escreve
escolhe se quer se identificar. O site não guarda nada: o formulário manda os campos para um pequeno
script do Google (Google Apps Script) publicado na conta USP do coordenador, e o script encaminha cada
mensagem por e-mail para essa mesma conta.

- O endereço do script fica no atributo `action` do formulário `form-ouvir`, em `index.html`.
- Para trocar quem recebe, publique o script abaixo em outra conta (script.google.com → Novo projeto →
  colar o código → Implantar → Nova implantação → App da Web, executar como "Eu", acesso "Qualquer
  pessoa") e troque o endereço no `action`.
- O campo invisível `site` serve contra robôs: mensagens com ele preenchido são descartadas.

```js
/**
 * GRAPAL · "Queremos te ouvir"
 * Recebe as mensagens do formulário do site e as encaminha por e-mail para a conta
 * que publicou este script. Nada fica guardado: a mensagem só passa por aqui.
 */
function doPost(e) {
  try {
    return envia((e && e.parameter) || {});
  } catch (err) {
    console.error('Falha ao encaminhar a mensagem: ' + err);
    return ContentService.createTextOutput('erro: ' + err);
  }
}

function envia(p) {
  var limpa = function (v, n) { return String(v || '').trim().slice(0, n); };
  var mensagem = limpa(p.mensagem, 5000);
  // "site" é um campo invisível do formulário: só robôs o preenchem
  if (!mensagem || p.site) return ContentService.createTextOutput('ok');
  var tipo = limpa(p.tipo, 40), nome = limpa(p.nome, 200), contato = limpa(p.contato, 200);
  var quem = (nome || contato) ? [nome, contato].filter(String).join(' / ') : 'não se identificou';
  var opcoes = {
    to: Session.getEffectiveUser().getEmail(),
    subject: 'GRAPAL: Queremos te ouvir' + (tipo ? ' (' + tipo + ')' : ''),
    body: 'Nova mensagem do formulário "Queremos te ouvir" do site do GRAPAL.\n\n'
      + (tipo ? 'Sobre: ' + tipo + '\n' : '')
      + 'Identificação: ' + quem + '\n\n'
      + mensagem + '\n',
    name: 'Site do GRAPAL'
  };
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contato)) opcoes.replyTo = contato;
  MailApp.sendEmail(opcoes);
  return ContentService.createTextOutput('ok');
}

function doGet() {
  return ContentService.createTextOutput('Formulário do GRAPAL ativo.');
}
```

## Endereço próprio (grapal.fm.usp.br)

O endereço da FMUSP funciona como no site do LENS (`lens.fm.usp.br`): a TI cria um registro de
DNS do tipo CNAME apontando `grapal.fm.usp.br` para `lens-lab-usp.github.io`.

A ordem importa. **Só depois** que a TI confirmar o registro:

1. Em **Settings → Pages**, preencha *Custom domain* com `grapal.fm.usp.br` e salve (o GitHub
   cria sozinho o arquivo `CNAME` no repositório).
2. Espere a verificação do DNS e marque **Enforce HTTPS** quando a opção liberar.

Se o domínio for configurado antes de o registro existir, o endereço do GitHub passa a
redirecionar para um domínio que ainda não responde, e o site fica fora do ar até o DNS ser criado.

Quando o endereço próprio estiver funcionando, troque `https://lens.fm.usp.br/grapal/` por
`https://grapal.fm.usp.br/` nas duas linhas `og:url` e `og:image` do começo de `index.html`: é por
elas que o WhatsApp e outros aplicativos montam a prévia do link.

## Licenças

O site não publica arquivos de fonte: usa as que já estão no aparelho de quem visita (ver
"Identidade visual"). Os ícones são do conjunto Lucide (licença ISC), com o texto da licença em
`assets/LICENCA-icones-lucide-ISC.txt`. A marca "Medicina USP" pertence à FMUSP.
