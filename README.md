![Node.js CI](https://github.com/lmachens/shorty/workflows/Node.js%20CI/badge.svg)

# shorty

Shorty is a simple URL Shortener with analytics.

## Develop

Install dependencies:

```
npm install
```

Add environment variables in .env file. You can copy the .env.example and update the variables.

```
cp .env.example .env
```

Next, update MONGO_DB_URI and MONGO_DB_NAME in `.env`.

To start the server and client in development mode at the same time:

```
npm run dev
```

If you like to run the production build, you have to build the client first.

```
npm run build
npm start
```

Take a look at other scripts in package.json.
