# Líder Conecta — CRM & Chatbot

Protótipo responsivo em português para líderes de equipes Natura e Avon organizarem consultoras, demonstrarem conversas, testarem um fluxo de chatbot e prepararem campanhas.

## Funcionalidades desta versão
- Painel de visão geral.
- Cadastro, edição, pesquisa e importação CSV de consultoras.
- Campo de consentimento para receber mensagens promocionais.
- Caixa de conversas demonstrativa.
- Simulador de chatbot com respostas de exemplo e opções de fluxo.
- Criação de rascunhos de campanhas.
- Exportação de backup JSON.
- Dados locais salvos no armazenamento do navegador (`localStorage`).
- Layout responsivo para celular e computador.

## Importante: limites desta versão
Esta versão ainda **não** grava os dados na nuvem/Supabase e **não** envia nem recebe mensagens reais do WhatsApp. `localStorage` guarda os dados somente no navegador e dispositivo em que foram criados. Use Exportar dados para fazer backup. Não guarde dados sensíveis neste protótipo.

Para armazenamento multiusuário e entre dispositivos, crie um projeto Supabase, configure autenticação e políticas RLS e implemente a integração de dados. O campo Supabase em Configurações é apenas preparatório e ainda não conecta o banco.

Para WhatsApp real, use a WhatsApp Business Platform/Cloud API oficial, com tokens guardados somente no servidor (por exemplo, Supabase Edge Functions), webhook verificado, tratamento de consentimento/descadastro, modelos aprovados quando exigidos e limites de envio. Nunca publique tokens ou chave `service_role` no GitHub ou no frontend.

## Publicar no Netlify
- Repositório GitHub com `index.html`, `styles.css`, `app.js`, `README.md` e `netlify.toml` na raiz.
- Build command: vazio.
- Publish directory: `.`
- Faça commit dos arquivos e aguarde o deploy automático do Netlify.

## Atualizar o repositório existente
Substitua no GitHub os arquivos `index.html`, `styles.css`, `app.js`, `README.md` e `netlify.toml` pelos desta versão. O Netlify fará novo deploy após o commit.
