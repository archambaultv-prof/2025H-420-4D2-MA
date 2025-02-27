# SOAP et REST

## Introduction

[SOAP](https://fr.wikipedia.org/wiki/SOAP) (Simple Object Access Protocol) et [REST](https://fr.wikipedia.org/wiki/Representational_state_transfer)
(Representational State Transfer) sont deux styles d'architecture pour
concevoir des services web. Ils sont utilisés pour définir comment les services
web communiquent entre eux.

## SOAP

SOAP est un protocole de communication basé sur XML. Il est plus verbeux que
REST, car il nécessite des balises XML pour définir les messages. Il est
souvent utilisé dans les environnements d'entreprise, car il est plus structuré
et offre des fonctionnalités avancées comme la sécurité, la fiabilité et la
transactionnalité. Étant un protocole, SOAP est plus rigide que REST et possède
des règles strictes à suivre définit dans la [Spécification SOAP1.2](https://www.w3.org/TR/soap12-part0/).

HTTP est souvent utilisé comme protocole de transport pour les messages SOAP,
mais il peut également être utilisé avec d'autres protocoles. Lorsque SOAP est
utilisé avec HTTP, les messages SOAP sont encapsulés dans le corps de la
requête HTTP. Souvent les fonctionnalités sont offertes à partir d'une seule
et même URL.

### Fichier WSDL

Bien souvent, les services SOAP sont décrits dans un fichier WSDL (Web Services
Description Language). Un fichier WSDL (Web Services Description Language) est
un document XML qui décrit les services web SOAP. Il spécifie les détails des
services, y compris les méthodes disponibles, les paramètres d'entrée et de
sortie, et les protocoles de communication utilisés. Le fichier WSDL permet aux
clients de comprendre comment interagir avec le service web sans avoir besoin
de connaître les détails d'implémentation.

Les principales sections d'un fichier WSDL sont :

- **types** : définit les types de données utilisés par le service.
- **message** : décrit les messages échangés entre le client et le service.
- **portType** : définit les opérations disponibles et les messages associés.
- **binding** : spécifie les détails de communication, comme le protocole de transport.
- **service** : indique l'URL où le service est disponible.

### Exemple de service SOAP

Voici comment créer une application SOAP avec Express.js qui offre un service
pour additionner deux nombres:

```javascript
const express = require('express');
const soap = require('soap');

const app = express();

const service = {
  CalculatorService: {
    CalculatorPort: {
      add: (args) => {
        const { a, b } = args;
        return { result: a + b };
      }
    }
  }
};

const wsdl = `
<definitions name="CalculatorService"
  targetNamespace="http://example.com/calculator.wsdl"
  xmlns="http://schemas.xmlsoap.org/wsdl/"
  xmlns:tns="http://example.com/calculator.wsdl"
  xmlns:xsd1="http://example.com/calculator.xsd"
  xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/">
  <message name="addRequest">
    <part name="a" type="xsd:int"/>
    <part name="b" type="xsd:int"/>
  </message>
  <message name="addResponse">
    <part name="result" type="xsd:int"/>
  </message>
  <portType name="CalculatorPortType">
    <operation name="add">
      <input message="tns:addRequest"/>
      <output message="tns:addResponse"/>
    </operation>
  </portType>
  <binding name="CalculatorBinding" type="tns:CalculatorPortType">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="add">
      <soap:operation soapAction="add"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>
  <service name="CalculatorService">
    <port name="CalculatorPort" binding="tns:CalculatorBinding">
      <soap:address location="http://localhost:3000/calculator"/>
    </port>
  </service>
</definitions>
`;

app.use(express.json());
app.use('/calculator', soap({ services: service, wsdl }));

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

Comme vous pouvez le voir, il s'agit de beaucoup de code pour un simple service
d'addition. C'est l'une des raisons pour lesquelles REST est devenu plus
populaire que SOAP.

## REST

REST est un style d'architecture qui définit un ensemble de contraintes pour
concevoir des services web. Ce n'est pas un protocole, donc il n'y a pas de
définition stricte à suivre. Bien qu'il soit souvent utilisé avec HTTP, REST
peut techniquement être utilisé avec d'autres protocoles de communication. Dans
ce cours, nous allons nous concentrer sur REST avec HTTP.

Basé sur le protocole HTTP, REST utilise les méthodes HTTP (GET, POST, PUT,
DELETE) pour définir les opérations sur les ressources. Les ressources sont
identifiées par des URL (Uniform Resource Locator).

Les caractéristiques principales de REST sont :

- **Sans état (Stateless)** : Chaque requête est indépendante des autres. Le serveur ne
  conserve pas l'état de la session du client.
- **Interface uniforme (Uniform Interface)** : Les ressources sont manipulées via des méthodes
  standard (GET, POST, PUT, DELETE).
- **Client-Serveur (Client-Server)** : Le client et le serveur sont séparés, ce qui permet une
  évolutivité et une maintenance plus faciles.
- **Mise en cache (Cacheable)** : Les réponses peuvent être mises en cache pour améliorer les
  performances.
- **Système en couches (Layered System)** : Les clients ne connaissent pas la structure interne du
  serveur.

### Exemple de service REST

Reprenons l'exemple précédent, mais cette fois-ci en utilisant REST:

```javascript
const express = require('express');

const app = express();

app.use(express.json());

app.post('/add', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

Comme vous pouvez le voir, le code est beaucoup plus simple et lisible. C'est
souvent le cas pour les services REST qui offrent des fonctionnalités simples.

## Conclusion

SOAP et REST sont deux styles d'architecture pour concevoir des services web.
SOAP est plus structuré et offre des fonctionnalités avancées et standardisées,
tandis que REST est plus simple et flexible. Le choix entre les deux dépend des
besoins du projet et des préférences de l'équipe de développement.

Il existe également d'autres styles d'architecture pour les services web, comme
GraphQL, qui offre une approche plus flexible pour interroger les données.