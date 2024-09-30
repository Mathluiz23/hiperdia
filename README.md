# Hiperdia - Monitoramento de Pressão Arterial e Saúde

* Projeto ainda em desenvolvimento :construction:

**Hiperdia** é uma aplicação web que permite monitorar medições de pressão arterial de forma organizada e visual, gerando relatórios em PDF, armazenando as medições no banco de dados e exibindo gráficos de evolução das medições.

## Índice
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Exportação de PDF](#exportação-de-pdf)
- [Salvar Medições](#salvar-medições)
- [Contribuição](#contribuição)

## Funcionalidades
- Adicionar medições de pressão arterial.
- Editar e deletar medições já registradas.
- Exibir as medições em uma tabela organizada.
- Gerar um gráfico interativo da evolução das medições.
- Exportar relatórios de medições e gráficos em formato PDF.
- Salvar medições em um banco de dados via API.

## Tecnologias Utilizadas
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js, Sequelize, MySQL
- **Bibliotecas**:
  - `react-icons` para ícones.
  - `chart.js` e `react-chartjs-2` para gráficos interativos.
  - `html2canvas` e `jspdf` para geração de PDFs.
  - `axios` para requisições HTTP à API.

## Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- MySQL para o banco de dados
- Git

### Passos para instalação
1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/hiperdia.git
    ```

2. Acesse o diretório do projeto:
    ```bash
    cd hiperdia
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Configure as variáveis de ambiente:
    - Crie um arquivo `.env` na raiz do projeto e adicione as variáveis para conexão com o banco de dados e a API.

5. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## Como Usar

1. Acesse a aplicação no seu navegador.
2. Adicione os dados do usuário no formulário de **Dados do Usuário**.
3. Insira as medições de pressão arterial no formulário de **Medições**.
4. Visualize os dados na tabela e o gráfico gerado automaticamente.
5. As medições são salvas automaticamente no local storage e podem ser exportadas ou enviadas para o banco de dados.

## Exportação de PDF

- A funcionalidade de exportação de PDF captura o cabeçalho, a tabela de medições e o gráfico, gerando um arquivo PDF que pode ser baixado pelo usuário.
- Para exportar o PDF, basta clicar no botão **Exportar PDF** após adicionar medições.

## Salvar Medições

- O botão **Salvar Dados** envia as medições e informações do usuário para o banco de dados através de uma API configurada no backend.
- Certifique-se de que a API está rodando corretamente para salvar os dados.

## Contribuição
Sinta-se à vontade para abrir issues e enviar pull requests. Seguindo as boas práticas de commits semânticos e mantendo a padronização de código.

### Regras para Commit
- Use mensagens de commit semânticas (ex.: `feat:`, `fix:`, `chore:`, etc.).
- Mantenha commits explicativos e informativos.

---

Made with ❤️ by [Seu Nome](https://github.com/Mathluiz23)

