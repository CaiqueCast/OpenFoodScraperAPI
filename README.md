# API Open Food Facts web scraping.

## Descrição

**A API Open Food Facts Web Scraping proporciona acesso eficiente e flexível a informações detalhadas sobre produtos alimentícios disponíveis no site Open Food Facts. Essa API permite aos usuários buscar produtos e obter detalhes específicos, oferecendo funcionalidades poderosas de filtragem por critérios como Nutri-Score e NOVA, tambem é possivel a busca pelo ID, assim conseguindo mais informações sobre um produto especifico.**

## Recursos Principais:

- **Buscar Produtos por Critérios:**

  - Os usuários podem realizar buscas de produtos com base em critérios específicos, como Nutri-Score e NOVA, permitindo uma seleção personalizada de alimentos de acordo com suas preferências nutricionais.

- **Detalhes do Produto:**

   - A API fornece informações detalhadas sobre cada produto, incluindo nome, quantidade, ingredientes, informações nutricionais, pontuações Nutri-Score e NOVA, entre outros.

- **Filtragem Avançada:**

   - Os usuários podem refinar suas buscas usando filtros avançados, garantindo que encontrem produtos que atendam aos seus requisitos nutricionais específicos.

- **Busca por ID:**

   - Uma funcionalidade essencial permite aos usuários buscar detalhes de um produto específico utilizando seu ID exclusivo.
 
---

## Utilização da API:

- Após feita a clonagem dessa API para a sua maquina, acessar o terminal e entrar no diretorio onde você a instalou, será necessario executar o seguinte comando:
```npm
npm install
```
Esse comando irá instalar todas as dependências necessarias para o funcionamento da API.


- Após a instalação das dependencias você podera executar o comando
```npm
npm start
```
Esse comando irá iniciar a API, apartir disso ela já estará pronta para uso.

### Agora que a API está em execução, você pode enviar solicitações HTTP para os endpoints definidos nas rotas. Por exemplo:

- Para buscar produtos por classificação (rank): GET http://localhost/products?nutrition=valor&nova=valor
- Para buscar detalhes de um produto por ID: GET http://localhost/products/:id
**Certifique-se de incluir os parâmetros necessários, como nutrition e nova para a rota de busca por classificação e id para a rota de busca por ID.**

## Documentação

**Toda a documentação da API foi feita utilizando o swagger.**

- Para ver a documentação acesse: http://localhost/api-docs/

## Exemplo de Uso:

- ### Buscar Produtos com Nutri-Score e Nova altos:
  - GET http://localhost/products?nutrition=A&nova=1
  - **Exemplo de resposta:**
```javascript
[
  {
    "id": "8011780000922",
    "name": "Nudeln Spaghetti - Riscossa - 500g",
    "nutrition": {
      "score": "A",
      "title": "Qualidade nutricional muito boa"
    },
    "nova": {
      "score": "1",
      "title": "Alimentos não processados ​​ou minimamente processados"
    }
  },
  {
    "id": "8005121000535",
    "name": "Gomiti 53 - Divella - 500 g - 17.6 oz (1 lb 1 oz 9 dr)",
    "nutrition": {
      "score": "A",
      "title": "Qualidade nutricional muito boa"
    },
    "nova": {
      "score": "1",
      "title": "Alimentos não processados ​​ou minimamente processados"
    }
  },
  {
    "id": "7894900530001",
    "name": "água Mineral - Coca-Cola - 500 ml",
    "nutrition": {
      "score": "A",
      "title": "Qualidade nutricional muito boa"
    },
    "nova": {
      "score": "1",
      "title": "Alimentos não processados ​​ou minimamente processados"
    }
  }...
]
```

- ### Buscar Produtos com Nutri-Score e Nova baixos:
  - GET http://localhost/products?nutrition=E&nova=4
  - **Exemplo de resposta:**
```javascript
[
  {
    "id": "3046920010603",
    "name": "Chocolate meio amargo com framboesa - Lindt - 100 g e",
    "nutrition": {
      "score": "E",
      "title": "Má qualidade nutricional"
    },
    "nova": {
      "score": "4",
      "title": "Alimentos ultra-processados"
    }
  },
  {
    "id": "5601045300022",
    "name": "Guaraná - Antarctica - 33 cl",
    "nutrition": {
      "score": "E",
      "title": "Má qualidade nutricional"
    },
    "nova": {
      "score": "4",
      "title": "Alimentos ultra-processados"
    }
  },
  {
    "id": "7898024395232",
    "name": "Nutella Ferrero - 140 g",
    "nutrition": {
      "score": "E",
      "title": "Má qualidade nutricional"
    },
    "nova": {
      "score": "4",
      "title": "Alimentos ultra-processados"
    }
  }...
]
```

- ### Detalhes do Produto pelo ID:
  - GET http://localhost/products/7898276600108
  - **Exemplo de resposta:**
```javascript
{
  "name": "Feijão Caldo Nobre - Feijão Tradicional - Comércio de Cereais Good Ltda - 1 kg",
  "quantity": "1 kg",
  "ingredients": {
    "hasPalmOil": "Sem óleo de palma",
    "isVegan": "Vegano",
    "isVegetarian": "Vegetariano",
    "list": [
      "Feijão - 'NÃO CONTÉM GLÚTEN' 'ALÉRGICOS: PODE CONTER SOJA' Produto 100% Natural"
    ]
  },
  "nutrition": {
    "score": "A",
    "title": "Qualidade nutricional muito boa",
    "values": [
      [
        "low",
        "Gorduras/lípidos em quantidade baixa (0%)"
      ],
      [
        "low",
        "Gorduras/lípidos/ácidos gordos saturados em quantidade baixa (0%)"
      ],
      [
        "low",
        "Açúcares em quantidade baixa (0%)"
      ],
      [
        "low",
        "Sal em quantidade baixa (0%)"
      ]
    ],
    "servingSize": "Tamanho da porção: 60g",
    "data": {
      "Energia": {
        "per100g": "1.100 kj\n(262 kcal)",
        "perServing": "657 kj\n(157 kcal)"
      },
      "Gorduras/lípidos": {
        "per100g": "0 g",
        "perServing": "0 g"
      },
      "Carboidratos": {
        "per100g": "48,3 g",
        "perServing": "29 g"
      },
      "Fibra alimentar": {
        "per100g": "21,7 g",
        "perServing": "13 g"
      },
      "Proteínas": {
        "per100g": "18,9 g",
        "perServing": "11,32 g"
      },
      "Sal": {
        "per100g": "0 g",
        "perServing": "0 g"
      }
    }
  },
  "nova": {
    "score": "1",
    "title": "Alimentos não processados ​​ou minimamente processados"
  }
}
```
---
## Benefícios da API:

- Informações Nutricionais Precisas: Acesse informações nutricionais detalhadas e confiáveis para apoiar escolhas alimentares mais conscientes.

- Personalização da Busca: Personalize suas buscas com base em critérios específicos, proporcionando uma experiência de usuário adaptada às preferências individuais.

- Atualizações em Tempo Real: Beneficie-se de dados sempre atualizados do Open Food Facts para garantir informações precisas sobre os produtos alimentícios disponíveis.

- Nota: Certifique-se de consultar a documentação da API para obter informações detalhadas sobre os endpoints, parâmetros de consulta e possíveis respostas.

---

## O que foi realizado:

- **A API Open Food Facts Web Scraping foi desenvolvida usando o Express, que é essencialmente um conjunto de ferramentas que simplificam a criação de sites e serviços web. Utilizei o Puppeteer, que age como um "robô" capaz de navegar na internet e coletar informações de páginas da web. O Joi foi empregado como uma linguagem de descrição de esquema e validador de dados para garantir que as informações recebidas estejam corretas e façam sentido. Além disso, implementei o swagger-ui-express, uma biblioteca que facilita a visualização e interação com a documentação Swagger, proporcionando um guia claro sobre como utilizar nossa API.**

 
