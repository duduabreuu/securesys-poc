# Plano — SecureSys PoC

## Abordagem

Aplicação web estática, sem backend, criada para funcionar localmente no VS Code com Live Server. O JavaScript troca os estados de tela dentro de uma moldura de celular, permitindo gravação vertical do fluxo completo.

## Estrutura

- `index.html`: palco de gravação, moldura do celular, camadas de telas e carregamento de scripts.
- `style.css`: identidade visual, componentes, navegação inferior, animações e responsividade.
- `script.js`: renderização das telas, navegação, validação do login, carregamento de 5 segundos e animação da pontuação.
- `README.md`: instruções de uso e gravação.

## Design

- **Movimento:** dashboard mobile de segurança digital, com estética “protective fintech” e superfícies macias.
- **Princípios:** confiança, legibilidade, contraste controlado e feedback imediato.
- **Paleta:** teal profundo para segurança e estabilidade; menta/neon para proteção ativa; vermelho e amarelo apenas para risco e alertas.
- **Layout:** moldura vertical de iPhone sobre um palco escuro, com cartões empilhados e navegação inferior persistente.
- **Elementos-assinatura:** marca geométrica de raposa, círculos suaves no fundo e anel de score de risco.
- **Interação:** ações curtas e explícitas, com toasts e transições suaves; erros aparecem próximos ao campo.
- **Animação:** entrada com fade/slide, carregamento com pulsação e pontos, score progressivo de 0 a 90.
- **Tipografia:** Inter, com títulos compactos e microcopy em tamanhos pequenos para reproduzir o Figma.
- **Essência:** proteção simples e inteligente para ajudar pessoas a reconhecer golpes digitais; confiável, didática, vigilante.
- **Voz:** direta e acolhedora. Exemplos: “Conte com nossa IA para lhe proteger de golpes.” e “Cole sua mensagem e deixe a IA analisar para você.”
- **Logotipo:** símbolo geométrico inspirado em uma raposa, usado como escudo visual da marca.
- **Cor proprietária:** verde-mint `#60EFA0` para indicar proteção ativa.
