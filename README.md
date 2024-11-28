# 📝 **Registra**

**Registra** é um sistema desenvolvido para gerenciar ocorrências de alunos em escolas. Ele otimiza o acompanhamento do comportamento dos estudantes e facilita a comunicação entre funcionários e responsáveis.  

O sistema foi desenvolvido com **Node.js** no backend, **React.js** no frontend e utiliza **MySQL** como banco de dados.

---

## 📌 **Índice**

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Dependências](#-dependências)
- [Como Contribuir](#-como-contribuir)
- [Licença](#-licença)

---

## 📖 **Sobre o Projeto**

O **Registra** é uma plataforma que permite registrar, acompanhar e gerenciar ocorrências relacionadas ao comportamento dos alunos, com foco em:

- Melhorar a comunicação entre funcionários e responsáveis.
- Facilitar a gestão de incidentes escolares.
- Registrar ocorrências com descrição detalhada, data e hora.

---

## 🚀 **Funcionalidades**

- **Cadastro de ocorrências**: Permite que funcionários registrem comportamentos ou incidentes dos alunos.
- **Busca em tempo real**: Localize ocorrências por palavras-chave.
- **Visualização detalhada**: Cada ocorrência pode ser vista individualmente.
- **Exclusão de registros**: Remove ocorrências diretamente da interface.
- **Página de perfil**: Exibe dados do usuário e suas ocorrências registradas.
- **download em PDF**: Baixa os registros e relatórios em PDF.

---

## ⚙️ **Pré-requisitos**

Antes de começar, você precisa instalar as seguintes ferramentas:

- [Node.js](https://nodejs.org/) (Inclui o gerenciador de pacotes `npm`)
- [Git](https://git-scm.com/)
- [MySQL](https://www.mysql.com/)
- Um editor de código, como o [VSCode](https://code.visualstudio.com/)

---

## 🛠️ **Instalação**

### 1. Clone o repositório

```bash
git clone https://github.com/fel1pee3/registra.git
```

### 2. Configure o Backend

1. Acesse o diretório do servidor:
   ```bash
   cd registra/server
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:
   Crie um arquivo `.env` no diretório `server` com as seguintes variáveis:
   ```env
   DB_HOST=seu-host
   DB_USER=seu-usuario
   DB_PASSWORD=sua-senha
   DB_NAME=nome-do-banco
   JWT_SECRET=sua-chave-secreta
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

### 3. Configure o Frontend

1. Acesse o diretório do cliente:
   ```bash
   cd ../frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o frontend:
   ```bash
   npm run dev
   ```

4. O frontend estará disponível no endereço:
   ```
   http://localhost:5173
   ```

---

## 🧰 **Tecnologias Utilizadas**

### Backend
- **Node.js**
- **Express**
- **MySQL**
- **JWT**
- **Multer**

### Frontend
- **React.js**
- **Vite**
- **Axios**
- **React Router**
- **React Icons**

---

## 📚 **Dependências**

### Backend

- **bcrypt** (`^5.1.1`): Para hashing de senhas.
- **cors** (`^2.8.5`): Para habilitar CORS.
- **express** (`^4.21.1`): Framework para criar APIs REST.
- **jsonwebtoken** (`^9.0.2`): Para autenticação JWT.
- **multer** (`^1.4.5-lts.1`): Para upload de arquivos.
- **mysql2** (`^3.11.3`): Cliente MySQL para Node.js.
- **nodemon** (`^3.1.7`): Reinicia o servidor automaticamente durante o desenvolvimento.

### Frontend

- **axios** (`^1.7.7`): Cliente HTTP.
- **date-fns** (`^4.1.0`): Biblioteca para manipulação de datas.
- **jspdf** (`^2.5.2`): Para geração de PDFs.
- **react** (`^18.3.1`): Biblioteca para criação da interface.
- **react-dom** (`^18.3.1`): Para renderizar o React no DOM.
- **react-icons** (`^5.3.0`): Ícones no React.
- **react-router-dom** (`^6.27.0`): Roteamento.
- **swiper** (`^11.1.14`): Para sliders/carrosséis.

---

## 📝 **Como Contribuir**

1. Faça um fork do projeto.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m 'Adiciona nova feature'
   ```
4. Envie para a branch principal:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

---

## 📄 **Licença**

Este projeto está sob a licença **MIT**.
