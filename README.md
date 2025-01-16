# Registra

Registra é um sistema desenvolvido para gerenciar ocorrências de alunos em escolas. Ele otimiza o acompanhamento do comportamento dos estudantes e facilita a comunicação entre funcionários e os responsáveis da instituição.  

## Status
🚧 Projeto Finalizado (possiveis mudanças no futuro) 🚧

## Pré-visualização
Confira uma prévia do Conecta:

![Imagem da Aplicação](frontend/images/tela1.png)
![Imagem da Aplicação](frontend/images/tela2.png)
![Imagem da Aplicação](frontend/images/tela3.png)
![Imagem da Aplicação](frontend/images/tela4.png)
![Imagem da Aplicação](frontend/images/tela5.png)
![Imagem da Aplicação](frontend/images/tela6.png)
![Imagem da Aplicação](frontend/images/tela7.png)
![Imagem da Aplicação](frontend/images/tela8.png)
![Imagem da Aplicação](frontend/images/tela9.png)
![Imagem da Aplicação](frontend/images/tela10.png)
![Imagem da Aplicação](frontend/images/tela11.png)

---

## Funcionalidades
- ✅ Sistema de autenticação seguro (JWT)
- ✅ Pré-visualização de cargo, ocrrências criadas e id do usuário logado
- ✅ Registrar ocorrências e relatórios
- ✅ Vizulizar ocorrências e relatórios individualmente
- ✅ Opção de deletar ocorrências e relatórios
- ✅ Opão de download em PDF, baixa podendo baixar ocorrências e relatórios
- ✅ Pré-visualização de ocorrências criadas por associados
- ✅ Busca em tempo real, localize ocorrências por palavras-chave
- ✅ Alternativa de alterar nome e cargo
- ✅ Opção de se tornar Líder ou se conctar como associado

---

## Como Começar

### Pré-requisitos
Certifique-se de ter instalado:
- **Node.js** (v16 ou superior)
- **MySQL**
- **Git**

### Criação do Banco de Dados

#### BD `conecta`
Cria o BD do projeto.
```bash
CREATE DATABASE registra;
```

#### Tabela `users`
Guarda informações sobre os usuários.
```bash
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(199) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL UNIQUE,
    profile_image VARCHAR(255),
    position VARCHAR(255),
    leader_code VARCHAR(255),
    leader_id INT
);
```

#### Tabela `contacts`
Armazena as ocorrências.
```bash
CREATE TABLE registers (
    id_register INT AUTO_INCREMENT PRIMARY KEY,
    user_registration INT,
    title_register VARCHAR(255),
    type VARCHAR(50),
    description TEXT,
    date_register DATE,
    time_register TIME,
    class_register VARCHAR(255),
    student_name VARCHAR(100),
    CONSTRAINT fk_user_registration
    FOREIGN KEY (user_registration)
    REFERENCES users(id)
);
```

#### Tabela `messages`
Armazena os relatórios.
```bash
CREATE TABLE reports (
    id_report INT AUTO_INCREMENT PRIMARY KEY,
    reporting_user INT,
    date_report DATE,
    time_report TIME,
    class_report VARCHAR(50),
    description TEXT,
    CONSTRAINT fk_reporting_user
    FOREIGN KEY (reporting_user)
    REFERENCES users(id)
);
```

### Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/fel1pee3/registra.git
    cd conecta
    ```

2. Instale as dependências do backend:
    ```bash
    cd backend
    npm install
    ```

3. Configure o arquivo `.env` no backend:
    ```env
    DB_HOST="localhost"
    DB_USER="root"
    DB_PASSWORD="SUA-SENHA"
    DB_DATABASE="conecta"
    PORT=3000
    JWT_KEY="SUA-CHAVE-JWT"
    ```

4. Inicie o backend:
    ```bash
    npm start
    ```

5. Instale as dependências do frontend:
    ```bash
    cd ../frontend
    npm install
    ```

6. Inicie o frontend:
    ```bash
    npm run dev
    ```

7. Acesse a aplicação em `http://localhost:3000`.

---

## Licença
Este projeto está licenciado sob a licença **MIT**.

