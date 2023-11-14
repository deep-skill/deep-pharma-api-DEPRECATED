## Deep Pharma API

### Run the project

Create a `.env` file in the root of the project and after that paste the following variables:

```env
PORT=3001
ISSUER_BASE_URL=https://dev-prcdh8fl4ig1zyzy.us.auth0.com
AUDIENCE=https://deep-pharma.com
```

This will automatically connect our Nestjs API with Auth0

After that run the following commands to install the necessary dependencies and initialized the project.

```env
npm install
npm run start:dev
```
