# Líder Conecta — códigos com Supabase

## Antes de publicar
1. No Supabase > SQL Editor, execute o SQL abaixo para criar a tabela do chatbot:
```sql
create table if not exists public.respostas_bot (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 palavra_chave text not null,
 resposta text not null,
 created_at timestamptz not null default now()
);
alter table public.respostas_bot enable row level security;
create policy "Cada usuário gerencia suas respostas do bot"
on public.respostas_bot for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```
2. Abra `app.js`. Substitua `COLE_AQUI_A_URL_DO_SEU_PROJETO` pela Project URL e `COLE_AQUI_SUA_CHAVE_sb_publishable` pela chave pública que começa com `sb_publishable_`.
3. Nunca coloque uma chave `sb_secret_` no frontend ou no GitHub.
4. No GitHub, substitua `index.html`, `styles.css` e `app.js` pelos arquivos desta pasta e faça Commit changes. Mantenha seu `netlify.toml`. O Netlify deve publicar a atualização automaticamente.
5. Abra o site, crie conta com e-mail e senha de pelo menos 6 caracteres, confirme o e-mail se for solicitado e faça login.
6. Teste um cadastro de consultora e uma campanha, atualize a página e confira se continuam lá.

## Importante
As tabelas `consultoras` e `campanhas` devem ter sido criadas no SQL anterior e devem ter RLS habilitado e políticas por `user_id`. O app salva consultoras, campanhas e respostas de chatbot. Ainda NÃO conecta ao WhatsApp nem envia mensagens reais. Para isso, será necessário configurar a API oficial do WhatsApp Business, webhooks e funções de servidor, além de respeitar consentimento e descadastro.
