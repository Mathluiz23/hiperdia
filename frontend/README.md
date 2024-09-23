### Backend
``` bash
    mkdir backend
    cd backend
    npm init -y
    npm install express mysql2 dotenv cors
    npm install -D typescript ts-node @types/node @types/express nodemon
    npx tsc --init
    mkdir -p src/controllers src/routes src/config src/models
    touch src/server.ts src/config/database.ts src/controllers/user.controller.ts src/routes/user.routes.ts
```
### Frontend

``` bash 

mkdir ../frontend
cd ../frontend
npx create-react-app . --template typescript
mkdir -p src/components src/pages src/services
npm install axios
touch src/services/api.ts src/pages/UserList.ts
```
### Banco de dados

```bash
mkdir ../database
cd ../database
touch schema.sql
mysql -u root -p
SOURCE /caminho/para/sua/pasta/database/schema.sql;
```
backend
```bash
npm run dev
````
frontend
```bash
npm start
```
