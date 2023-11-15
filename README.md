## Deep Pharma API

### Run the project

Create a `.env` file in the root of the project and after that paste the following variables:

```env
PORT=3001
ISSUER_BASE_URL=https://dev-prcdh8fl4ig1zyzy.us.auth0.com
AUDIENCE=https://deep-pharma.com
```

This will automatically connect our Nestjs API with Auth0

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
// password: 123456
 mysl -u root -p
```

4. create the database

```bash
CREATE DATABASE deep_pharma_db;
```

Once the database is created, open the project in your code editor, open a terminal and run the following commands to install the necessary dependencies and initialize the project.

```env
npm install
npm run start:dev
```
