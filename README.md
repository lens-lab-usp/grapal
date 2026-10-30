# Site do GRAPAL

Site do GRAPAL (Grupo de Assistência Psicológica ao Aluno), serviço de saúde mental da
Faculdade de Medicina da Universidade de São Paulo. O conteúdo segue os manuais do serviço
(Manual do Aluno e Manual do Residente, versão 1.000), e a identidade visual é a mesma dos
manuais e do Manual da Marca FMUSP.

Endereço: **https://grapal.fm.usp.br** (publicado pelo GitHub Pages).

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
`assets/fonts/` (fontes), `fotos/` (equipe, 320 × 320 px), `manuais/` (PDFs),
`404.html` (endereço não encontrado).

O site é HTML, CSS e um pouco de JavaScript, sem bibliotecas, sem banco de dados e sem nenhum
recurso de fora (só o formulário de opinião envia a mensagem para o Google, ver abaixo). **Não usa cookies e não coleta dados de quem visita.** Sem JavaScript, todo o
conteúdo continua aparecendo; só deixam de funcionar a animação e o destaque "Agora" da urgência.

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

**Equipe.** Cada pessoa aparece em dois lugares de `index.html`: no mosaico de fotos do início
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

## Licenças

As fontes Zilla Slab (Mozilla Foundation) e Source Sans 3 (Adobe) são distribuídas sob a SIL
Open Font License 1.1; os textos das licenças estão em `assets/fonts/`. Os ícones são do
conjunto Lucide (licença ISC), com o texto da licença em `assets/LICENCA-icones-lucide-ISC.txt`.
