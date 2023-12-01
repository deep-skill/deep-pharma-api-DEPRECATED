## Deep Pharma API

### Environment

Create a `.env` file in the root of the project and after that paste the following variables:

```env
# Config
PORT=3001

# Auth0
ISSUER_BASE_URL=https://dev-prcdh8fl4ig1zyzy.us.auth0.com
AUDIENCE=https://deep-pharma.com

# Database
DB_HOST='localhost'
DB_PORT=3306
DB_USERNAME='root'
DB_PASSWORD='123456'
DB_NAME='deep_pharma_db'
```

This will automatically connect our Nestjs API with Auth0

### Docker Database

After that, we need to establish a connection with a MySQL database. To do so, open a terminal with the key combination **`windows` + `r`** write **cmd** in the window, and press `enter`, once the terminal is open enter the following commands.

1. Start the mysql docker container

```bash
docker run --rm --name deep-pharma-mysql -e MYSQL_ROOT_PASSWORD=123456 -d -p 3306:3306 mysql
```

2. Establish a connection with the docker container to create the database

```bash
docker exec -it deep-pharma-mysql bash
```

3. Enter the user and the password

```bash
mysql -h 172.17.0.2 -P 3306 --protocol=tcp -u root -p
// password: 123456
```

4. create the database

```bash
CREATE DATABASE deep_pharma_db;
```

### Run project

Once the database is created, open the project in your code editor, open a terminal and run the following commands to install the necessary dependencies and initialize the project.

```env
npm install
npm run start:dev
```

When the server is turned on, a script will be executed that will pre-fill the database with brands, tags and products.

### Documentation

The documentation of the endpoints and models can be found at http://localhost:3001/docs.

### Config database

To modify any database configuration, you can do it from
`src/config/database.config.ts`

### Database models

To add models to the database, export the model to `src/modules/database/models.ts`
