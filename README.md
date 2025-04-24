# Rota Certa  
**Aplicação Web com Node.js, React, PostgreSQL e Google Maps API**  
Este projeto foi desenvolvido como etapa técnica do processo seletivo da **Shopper**.  

O sistema permite solicitar corridas de táxi, calcular rotas otimizadas utilizando a **Google Maps Routes API** e exibir informações detalhadas em uma interface web intuitiva.  

## Demonstração

https://github.com/user-attachments/assets/3e8212f5-508e-4f53-a9cd-2eaef1aeb776

## **Descrição do Projeto**  

A aplicação possui as seguintes funcionalidades principais:  

1. **Solicitação de viagens:**  
   - Estimativa de valor, duração e rota a partir de um endereço de origem e outro de destino.  

2. **Confirmação de viagem:**  
   - Registra a viagem do usuário com o motorista escolhido.  

3. **Cálculo de Rotas:**  
   - Utiliza a **Google Maps Routes API** para calcular o trajeto entre dois pontos e exibir um mapa.  

4. **Histórico de viagens:**  
   - Exibição das viagens anteriores do usuário com os detalhes da viagem (motorista, data e hora, distâcia, duração e valor total).  


## **Estrutura geral da aplicação**  

![Estrutura geral da aplicação](https://github.com/user-attachments/assets/12b41ae4-32fd-47e2-9181-13bfd4b009d8)

## **Tecnologias Utilizadas**  

### **Backend**  
- **Node.js** com **TypeScript**  
- **Fastify** como framework HTTP  
- **Prisma ORM** para gerenciamento do banco de dados  
- Banco de dados **PostgreSQL**  
- **Axios** para comunicação com APIs externas  
- **Google Maps Routes API** para cálculo de rotas  

### **Frontend**  
- **React** com **TypeScript**  
- **Vite** para construção do projeto  
- **Styled Components** para estilização  
- Integração com a API do backend e exibição de mapas  

---

## **Requisitos para Execução**  

1. **Docker** (necessário para criar o ambiente local)  
2. **Google Cloud API Key** configurada para usar a **Google Maps Routes API**  

---

## **Como Usar o Projeto**  

### **Configuração Inicial**  
1. Certifique-se de ter o **Docker** instalado e em execução em sua máquina. Caso necessário, siga as instruções no site oficial: [Docker Documentation](https://docs.docker.com/).  
2. Clone o repositório.
3. Configure a variável de ambiente no arquivo .env (disponível na raiz do projeto) com a chave da Google Maps API.

### **Iniciar o Projeto com Docker**
1. Construa e execute o projeto usando o comando: docker compose up --build
2. O servidor backend estará disponível em: http://localhost:8080
3. O frontend estará disponível em: http://localhost:3000

