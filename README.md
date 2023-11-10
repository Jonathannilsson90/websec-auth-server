
### **Kurs**: Webbsäkerhet analys och implementation

### Grupp : 

* Yulia Gutorova
* Jonathan Nilsson   


### Uppgift: Server för autentisering

**Mål**: *"Målet är att utrusta våra
studenter med rudimentär kunskap och praktiska färdigheter för att förstå säkerhetskrav och
lagstiftning som påverkar frontendutvecklare och att implementera säkerhetsåtgärder i frontend
som är kompatibla med backend-systemen."*

**Hur vi löste uppgiften:** *Teamet valde att försöka lösa uppgiften genom att implementera olika tekniker.* <br> **Autentisering:** *Passport-integration med local-strategy(Användarnamn och lösenord) samt google-recaptcha-v2*<br>
**Auktorisering:**  *Teamet valde att använda sig utav sessions och cookies i detta projekt, eftersom det ansågs säkrare än att förvara datan i dem istället för localstorage hos respektive användare.*

### Starta projektet:

```js
git clone https://github.com/Jonathannilsson90/websec-auth-server.git
npm install
npm run dev
```

### Npm-paket som nyttjas i projektet:
```js
jest
axios
bcrypt
connect-mongo
cookie-parser
cors
express-rate-limit
express-session
healthcheck-middleware
helmet
jsonwebtoken
passport
passort-local
morgan
```

### Tekniker:
* [Recaptcha](https://www.npmjs.com/package/react-google-recaptcha-v2) - Autentisering med hjälp av recaptcha, säkrar inloggning emot bot-attacker.
* [Express-session](https://www.npmjs.com/package/express-session) - Tillägg till Express som gör det möjligt att skapa sessions.
* [Passport](https://www.passportjs.org) - Flexibelt och modulärt mellanprogram som möjligör en smidigare och säkrare Autentisering.