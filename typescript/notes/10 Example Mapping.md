


### **Story 1: Define Pivot Currency**
```gherkin
As a Foreign Exchange Expert
I want to be able to define a Pivot Currency
So that I can express exchange rates based on it
```


### Règles métiers 
- **Règle une :La devise pivot doit pouvoir convertir et être convertie dans toutes les autres devises disponibles**
- **Règle deux : Si une devise pivot existe alors la conversion doit OBLIGATOIREMENT passer par celle-ci**
- **Règle quatre : La devise pivot est obligatoire et immuable**

```gherkin
Given a bank with Euro as Pivot Currency
And an exchange rate of 1.2 to USD
And an exchange rate of 1344 to KRW
When I convert 12 USD to KRW
Then I receive 13 440 KRW
```



### **Story 2: Add an exchange rate**
```gherkin
As a Foreign Exchange Expert
I want to add/update exchange rates by specifying: a multiplier rate and a currency
So they can be used to evaluate client portfolios
```

### Règles métiers
- **Règle une : La nouvelle devise doit obligatoirement pouvoir être converti par la devise pivot**
- **Règle deux : Pas de taux de change avec la devise pivot**


### **Story 3: Convert a Money**
```gherkin
As a Bank Consumer
I want to convert a given amount in currency into another currency
So it can be used to evaluate client portfolios
```

### Règles métiers
- **Règle une : Si je n'ai pas de taux de change avec ma devise, alors une erreur apparait sauf si je convertis dans la devise de départ**
- **Règle deux : Appliquer le round-tripping ; quand je convertis une devise vers une autre, je la reconverti vers la devise initiale et je dois avoir une marge d'erreur de 1% maximale**


### Conversion de devise

> Que se passe-t-il si nous voulons convertir dans une devise inconnue du système ?

### Erreur en cas de devise inconnue
```gherkin
Given a bank with Euro as Pivot Currency
When I convert 10 euros to Korean Won
Then I receive an error explaining that the system has no exchange rate
```

```gherkin
Given a bank with Euro as Pivot Currency
  And an Exchange Rate of 1.235944 to USD
  And  an Exchange Rate of 0.12548966 to KRW
When I convert 10.254 KRW to USD
  And I convert the result back to KRW
Then I receive 10.254 +- 1%
```

```gherkin
Given a bank with Euro as Pivot Currency
  And an Exchange Rate of 1.235944 to USD
  And  an Exchange Rate of 0.12548966 to KRW
When I convert 10.254 KRW to USD
  And I convert the result back to KRW
Then I receive 10.254
```