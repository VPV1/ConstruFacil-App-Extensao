# 🏗️ ConstruFácil - Gestão de Estoque Mobile

> **Projeto de Extensão – Análise e Desenvolvimento de Sistemas**  
> Depósito ConstruBem Ltda. • Manaus, AM

---

## 📋 Sobre o Projeto

O **ConstruFácil** é um aplicativo Android desenvolvido como projeto de extensão universitária com o objetivo de solucionar o problema de controle manual de estoque do Depósito ConstruBem, um pequeno comércio de materiais de construção localizado em Manaus/AM.

O proprietário e os colaboradores utilizavam cadernos de anotações para controlar o estoque de materiais, o que gerava divergências no **saldo líquido** — especialmente em casos de devoluções e estornos de obras.

---

## 🎯 Funcionalidades

- ✅ **Login** com controle de acesso por usuário (Proprietário e Atendente)
- ✅ **Lista de Estoque** com saldo líquido calculado em tempo real
- ✅ **Alertas visuais** para itens com estoque abaixo do mínimo
- ✅ **Registro de Movimentações** com 3 tipos:
  - 📦 **Entrada** – Recebimento de mercadoria
  - 🚚 **Saída** – Venda ou retirada
  - ↩️ **Devolução** – Estorno / Retorno de obra
- ✅ **Cálculo automático do saldo líquido** (Estoque base + Entradas + Devoluções - Saídas)

---

## 🛒 Produtos Cadastrados (Mock)

| Produto              | Unidade   | Qtd. Inicial | Qtd. Mínima |
|----------------------|-----------|:------------:|:-----------:|
| Tijolo Comum         | milheiro  | 15           | 3           |
| Madeira Cupiúba      | m         | 50           | 10          |
| Cimento CP II        | saco      | 120          | 20          |
| Areia Grossa         | m³        | 8            | 2           |
| Vergalhão CA-50      | barra     | 200          | 30          |

---

## 🧮 Fórmula do Saldo Líquido

```
Saldo Líquido = Quantidade Base + Σ(Entradas) + Σ(Devoluções) - Σ(Saídas)
```

---

## 📱 Telas do Aplicativo

| Tela             | Descrição                                      |
|------------------|------------------------------------------------|
| **Login**        | Autenticação com usuário e senha               |
| **Estoque**      | Lista de produtos com saldo líquido atualizado |
| **Movimentação** | Registro de entrada, saída ou devolução        |

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Android Studio ou Expo Go no celular

### Instalação

```bash
# Clone o repositório
git clone https://github.com/vinicius-ads/ConstruFacil-App-Extensao.git
cd ConstruFacil-App-Extensao

# Instale as dependências
npm install

# Inicie o projeto
npm start
```

### Acesso de Demonstração

| Usuário | Senha | Perfil               |
|---------|-------|----------------------|
| `joao`  | 1234  | Sr. João (Proprietário) |
| `carlos`| 1234  | Carlos (Pátio)       |

---

## 🗂️ Estrutura do Projeto

```
ConstruFacil/
├── App.js                          # Ponto de entrada e navegação
├── package.json
├── src/
│   ├── data/
│   │   └── database.js             # Dados mockados e lógica de saldo líquido
│   └── screens/
│       ├── LoginScreen.js          # Tela de autenticação
│       ├── EstoqueScreen.js        # Lista de produtos e saldo
│       └── MovimentacaoScreen.js   # Registro de movimentações
└── README.md
```

---

## 📊 Metodologia

1. **Levantamento de Requisitos** – Entrevista com proprietário Sr. João
2. **Prototipação** – Wireframes das 3 telas no Figma
3. **Desenvolvimento** – React Native com Expo
4. **Testes** – Dados reais do depósito; validação da lógica de saldo
5. **Treinamento** – Capacitação dos colaboradores no uso do app
6. **Avaliação** – Questionário de satisfação pós-implantação

---

## 🏫 Informações Acadêmicas

- **Curso:** Análise e Desenvolvimento de Sistemas
- **Disciplina:** Atividade de Extensão
- **Instituição:** [Nome da Instituição]
- **Semestre:** 2025.1
- **Local de realização:** Manaus, AM

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos — Atividade de Extensão Universitária.

---

*Depósito ConstruBem Ltda. • Manaus, AM*
