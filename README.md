# 📬 Projeto Recados – NestJS + GraphQL

Este projeto é um **CRUD de Pessoas e Recados** desenvolvido com **NestJS**, **GraphQL** e **TypeORM**, com o objetivo de estudar e aplicar conceitos de:

* GraphQL (Queries, Mutations e Schemas)
* Relacionamentos entre entidades (OneToMany / ManyToOne)
* TypeORM com PostgreSQL
* Arquitetura em camadas (Resolver → Service → Repository)
* Boas práticas de tipagem e schema-first no GraphQL

---

## 🚀 Tecnologias Utilizadas

* **Node.js**
* **NestJS**
* **GraphQL (Code First)**
* **TypeORM**
* **PostgreSQL**
* **Docker / Docker Compose**
* **TypeScript**

---

## 🧠 Conceito do Sistema

O sistema permite:

* Cadastro de **Pessoas**
* Envio de **Recados** de uma pessoa para outra
* Consulta de recados enviados e recebidos

📌 Um **Recado** sempre possui:

* Um remetente (`de` → Pessoa)
* Um destinatário (`para` → Pessoa)

---

## 🗂️ Estrutura do Projeto

```
src/
├── pessoas/
│   ├── dto/
│   │   └── create-pessoa.input.ts
│   ├── pessoa.entity.ts
│   ├── pessoas.resolver.ts
│   ├── pessoas.service.ts
│   └── pessoas.module.ts
│
├── recados/
│   ├── dto/
│   │   └── create-recado.input.ts
│   ├── recado.entity.ts
│   ├── recados.resolver.ts
│   ├── recados.service.ts
│   └── recados.module.ts
│
├── app.module.ts
└── main.ts
```

---

## 🧱 Entidades

### Pessoa

* `id`
* `name`
* `email`
* `passwordHash`
* `recadosEnviados`
* `recadosRecebidos`

Relacionamentos:

* Uma pessoa pode **enviar vários recados**
* Uma pessoa pode **receber vários recados**

---

### Recado

* `id`
* `mensagem`
* `de` (Pessoa remetente)
* `para` (Pessoa destinatária)

Relacionamentos:

* Muitos recados → Uma pessoa (remetente)
* Muitos recados → Uma pessoa (destinatária)

---

## 🔁 Relacionamentos (TypeORM)

```ts
@ManyToOne(() => Pessoa, pessoa => pessoa.recadosEnviados)
de: Pessoa;

@ManyToOne(() => Pessoa, pessoa => pessoa.recadosRecebidos)
para: Pessoa;
```

```ts
@OneToMany(() => Recado, recado => recado.de)
recadosEnviados: Recado[];

@OneToMany(() => Recado, recado => recado.para)
recadosRecebidos: Recado[];
```

---

## ✍️ Inputs GraphQL

### Criar Pessoa

```graphql
input CreatePessoaInput {
  name: String!
  email: String!
  password: String!
}
```

---

### Criar Recado

📌 **Relacionamentos são criados passando apenas os IDs**

```graphql
input CreateRecadoInput {
  deId: Int!
  paraId: Int!
  mensagem: String!
}
```

---

## 🔥 Exemplos de Mutations

### Criar Pessoa

```graphql
mutation {
  createPessoa(createPessoaInput: {
    name: "João",
    email: "joao@email.com",
    password: "123456"
  }) {
    id
    name
    email
  }
}
```

---

### Criar Recado

```graphql
mutation {
  createRecado(input: {
    deId: 1,
    paraId: 2,
    mensagem: "Olá, tudo bem?"
  }) {
    id
    mensagem
    de { name }
    para { name }
  }
}
```

---

## 🔎 Exemplos de Queries

### Listar Pessoas

```graphql
query {
  pessoas {
    id
    name
    recadosEnviados {
      mensagem
    }
  }
}
```

---

### Listar Recados

```graphql
query {
  recados {
    id
    mensagem
    de { name }
    para { name }
  }
}
```

---

## ⚠️ Erros Comuns Tratados no Projeto

* `Cannot return null for non-nullable field`
* `Undefined type error` no GraphQL
* Problemas de injeção de repositório
* Uso incorreto do `findOne` (TypeORM 0.3+)

---

## ▶️ Como Executar o Projeto

### 1️⃣ Subir o banco com Docker

```bash
docker-compose up -d
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Rodar a aplicação

```bash
npm run start:dev
```

## 🧪 Testes com GraphQL (Postman)

Devido a problemas com o GraphQL Playground durante o desenvolvimento, **todas as Queries e Mutations deste projeto foram testadas utilizando o Postman**.

### 🔧 Configuração no Postman

* Método: **POST**
* URL:

```
http://localhost:3000/graphql
```

* Headers:

```
Content-Type: application/json
```

* Body → **raw → JSON**

```json
{
  "query": "mutation { createPessoa(createPessoaInput: { name: \"João\", email: \"joao@email.com\", password: \"123456\" }) { id name email } }"
}
```

📌 O Postman permite executar normalmente:

* Queries
* Mutations
* Inputs complexos
* Relacionamentos entre entidades

Sendo uma alternativa estável ao Playground para testes GraphQL.

```

---

## 📚 Aprendizados Principais

- GraphQL exige **tipagem explícita**
- Mutations que retornam objetos precisam de **selection set**
- Relacionamentos são resolvidos no **service**, não no input
- Sempre retornar o resultado do `save()` no TypeORM

---

## 👨‍💻 Autor

**Jonas Kelvin**

Projeto desenvolvido para fins de estudo e prática com **NestJS + GraphQL** 🚀

```

