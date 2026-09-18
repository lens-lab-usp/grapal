# GRAPAL — Jornadas de saúde mental

Site autoguiado para universitários adultos, com 17 jornadas e 102 etapas. Inclui explicações, exemplos comentados, diagramas, fichas de prática, checkpoints, progresso e diários opcionais com gráficos dos próprios registros.

O material pode preceder ou complementar a psicoterapia individual. Não oferece avaliação individualizada, diagnóstico, prescrição ou monitoramento profissional das respostas.

## Colocar no GitHub

1. Descompacte `GRAPAL_GitHub.zip` no computador.
2. No GitHub, crie um repositório, por exemplo `grapal-jornadas`, e selecione **Private**. Para evitar um README duplicado, deixe desmarcada a opção de criar um README na abertura do repositório.
3. Abra o repositório e use **uploading an existing file** na página inicial ou **Add file → Upload files** quando essa opção estiver disponível.
4. Arraste os arquivos e a pasta `tests` que estão **dentro** da pasta `grapal-jornadas`. O arquivo `index.html` deve ficar na raiz do repositório. Não envie apenas o ZIP: ele precisa ser descompactado primeiro.
5. Confirme o envio com uma mensagem como `Adicionar site GRAPAL`.

Arquivos cujo nome começa com ponto podem estar ocultos no computador. Eles são auxiliares; os cinco arquivos essenciais do site são `index.html`, `styles.css`, `content.js`, `workbook.js` e `app.js`.

Esses passos guardam o código no GitHub. Nenhum fluxo de publicação automática foi incluído.

Referência: [adicionar arquivos a um repositório — documentação do GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

## Acesso privado e hospedagem

**Repositório privado e site privado são configurações diferentes.** O controle de acesso da hospedagem atual não faz parte destes arquivos HTML e JavaScript. Esta exportação não inclui um sistema próprio de login.

Mantenha o repositório privado e não ative o GitHub Pages se ainda não tiver definido a proteção de acesso ao site. Segundo a documentação do GitHub, publicar Pages com controle de acesso privado exige uma organização com GitHub Enterprise Cloud e um site de projeto elegível. Um repositório privado isoladamente não basta.

Para hospedar em outro serviço, use os cinco arquivos do site em uma hospedagem estática com autenticação ou restrição de acesso configurada no servidor/provedor. Todos os arquivos, inclusive `content.js`, precisam ficar atrás dessa proteção. Uma senha escrita no JavaScript não protege o conteúdo.

Não é necessário fazer build. O diretório público é a raiz desta pasta; se a hospedagem solicitar um comando de build, ele pode ficar vazio. O site usa caminhos relativos e pode ser servido sob um subdiretório.

Referências: [o que é GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) e [visibilidade e acesso privado](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site).

## Usar no próprio computador

O site funciona sem conta do ChatGPT, chave de API, banco de dados ou dependências JavaScript externas. Para uma prévia local consistente, use um servidor HTTP local. Se tiver Python 3 instalado, abra o terminal na pasta `grapal-jornadas` e execute:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Abra `http://127.0.0.1:8000` no navegador. Para encerrar, pressione `Ctrl+C` no terminal. Esse comando fica limitado ao próprio computador.

## Anotações e progresso

- Os registros ficam em `localStorage`, no navegador e no endereço em que o site é utilizado.
- As anotações dos usuários não estão neste pacote. Não há banco de respostas no repositório.
- Mudar de endereço, navegador ou dispositivo não transfere os registros anteriores. Eles permanecem vinculados ao endereço original, enquanto o navegador os conservar.
- Não há sincronização, envio à universidade, acompanhamento em tempo real ou cópia de segurança automática.
- Em computadores compartilhados, quem tiver acesso ao mesmo perfil do navegador pode ler os registros. O site oferece a opção de apagar os dados locais.
- Os números dos diários são registros pessoais não validados, sem interpretação diagnóstica; os gráficos mantêm lacunas quando não há respostas.

## Arquivos e edição

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Página inicial, navegação e estrutura dos diálogos |
| `content.js` | As 17 jornadas, referências, exemplos, fichas e configurações dos diários |
| `app.js` | Navegação, progresso, notas, checkpoints e estado local |
| `workbook.js` | Cadernos de prática, diários e gráficos |
| `styles.css` | Estilo visual e adaptação a telas pequenas |
| `tests/smoke.cjs` | Verificação funcional automatizada |
| `package.json` e `package-lock.json` | Dependência utilizada apenas para executar os testes |

Para preservar anotações já salvas, mantenha os identificadores das jornadas e a ordem das etapas ao editar o conteúdo. Alterar o significado de uma posição pode associar notas antigas a uma etapa diferente. A chave de armazenamento atual é `grapal-hub-v1`.

## Verificação para quem desenvolve

Os arquivos do site não exigem Node.js para funcionar. Os testes opcionais usam Node.js 24.15 ou posterior da série 24, ou Node.js 26+, e jsdom 30.1.0.

```bash
npm ci --ignore-scripts
npm test
```

Os testes percorrem as 17 jornadas e 102 etapas, verificando anotações, fichas, retomada, checkpoints, edição de datas, exclusão de registros, ausência de números no gráfico e comportamento quando o armazenamento está bloqueado. São testes de lógica e DOM; não substituem uma inspeção visual em navegadores nem uma validação clínica da plataforma.

Esta exportação preserva os arquivos funcionais da versão ampliada. Configurações da hospedagem anterior, credenciais, histórico Git e dados pessoais de navegação foram excluídos.
