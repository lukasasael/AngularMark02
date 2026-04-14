🦷 Sistema de Gestão de Pacientes (Angular + Spring Boot)

Aplicação fullstack para gerenciamento de pacientes, desenvolvida com Angular no frontend e Spring Boot no backend, com integração real via API REST e persistência em banco de dados PostgreSQL.

📌 Sobre o projeto

Este projeto simula um sistema clínico para controle de pacientes, permitindo o gerenciamento completo de informações como dados pessoais, plano de tratamento e histórico clínico.

A aplicação foi construída seguindo boas práticas de arquitetura, separação de responsabilidades e integração progressiva entre frontend e backend.

🚀 Funcionalidades
Cadastro de pacientes
Listagem de pacientes
Visualização de detalhes
Edição de pacientes
Gerenciamento de prontuário (histórico clínico)
Autenticação real com JWT
Rotas protegidas (frontend e backend)
Integração completa com API REST
🧱 Arquitetura
Frontend (Angular)
Arquitetura baseada em features
Uso de Facade Pattern para desacoplamento da lógica
Gerenciamento reativo com RxJS
Formulários reativos
Rotas protegidas com guards
Interceptor HTTP para envio automático do token JWT
Separação entre componentes de página e componentes reutilizáveis

Principais camadas:

pages → telas
ui → componentes reutilizáveis
facade → orquestração de estado
services → comunicação HTTP
Backend (Spring Boot)
API REST estruturada em camadas:
Controller
Service
Repository
Uso de DTOs para desacoplamento
Tratamento global de exceções
Segurança com Spring Security + JWT
Proteção de endpoints via autenticação
🗄️ Banco de Dados
PostgreSQL rodando via Docker
Persistência real dos dados da aplicação
Hibernate com geração automática de schema
🔐 Autenticação

A aplicação possui autenticação completa baseada em JWT:

Login via endpoint /api/auth/login
Geração de token JWT no backend
Armazenamento do token no frontend
Envio automático do token via interceptor HTTP
Proteção de rotas no Angular (guards)
Proteção de endpoints no backend (Spring Security)
🔗 Integração Frontend ↔ Backend

A aplicação realiza comunicação real entre Angular e Spring Boot:

Consumo de API via HttpClient
Base URL externalizada por environment
CRUD completo de pacientes integrado
Envio automático de token JWT nas requisições protegidas

Isso significa que o projeto opera totalmente com dados reais e autenticação ativa.
