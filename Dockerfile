FROM node:18-alpine

WORKDIR /express-docker

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install --legace-peer-deps- --no-audit --prefer-offline

# Copia todo o código-fonte da aplicação
COPY . .

# Gera os arquivos do cliente do Prisma
RUN npx prisma generate

# Compila o projeto TypeScript
RUN npm run build

# Expõe a porta usada pela Evolution API
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
