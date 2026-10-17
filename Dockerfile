FROM node:18-alpine
# Define o diretório de trabalho
WORKDIR /express-docker

# Copia primeiro os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install --legacy-peer-deps --no-audit --prefer-offline
 
# Copia o restante do código-fonte da aplicação
COPY . .

# Gera os arquivos do cliente do Prisma
RUN npx prisma generate

# Compila o projeto TypeScript
RUN npm run build

# Expõe a porta usada pela Evolution API
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
