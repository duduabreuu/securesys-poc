# SecureSys — PoC web para gravação

Protótipo navegável do SecureSys, feito para demonstrar o fluxo principal sem backend. A interface simula um aplicativo de celular em formato vertical.

## Como abrir no VS Code

1. Abra a pasta `securesys-poc` no VS Code.
2. Instale a extensão **Live Server** (Ritwick Dey), caso ainda não tenha.
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.
4. Abra a página em uma janela vertical. O projeto também funciona abrindo o `index.html` diretamente.

## Fluxo da demonstração

- Clique na tela inicial do app.
- Aguarde aproximadamente 5 segundos na tela de carregamento.
- No login, use qualquer e-mail e a senha `12345`.
- Na tela inicial, cole/digite uma mensagem e clique em **Analisar mensagem**.
- A pontuação anima até 90/100.
- Teste **Histórico**, **Aprender**, **Segurança** e **Perfil** pelo fluxo da tela.

## Como gravar

- Use a visualização vertical do celular no navegador.
- Para uma gravação 9:16, use uma janela ou área de captura de aproximadamente 390×844 px.
- No OBS Studio, crie uma fonte de captura de janela e grave em 1080×1920 ou 720×1280.
- Se quiser acelerar a apresentação, a tela de carregamento é o único trecho com espera automática de 5 segundos.

## Arquivos

- `index.html`: estrutura da página e moldura do celular.
- `style.css`: identidade visual, responsividade e animações.
- `script.js`: navegação, login, análise simulada e pontuação.
