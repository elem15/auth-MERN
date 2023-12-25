Test task for some company.
## CRUD User with authentication.
### Stack: React + Express + MongoDB

## Setup

1. Clone the repository and install the dependencies
```bash
cd auth-MERN/frontend
npm install
echo "VITE_LOCAL_DEV=true" > .env.local
cd ../backend 
npm install
echo "MONGO_CONNECTION_STRING=<your MongoDB uri>" > .env
echo "SESSION_SECRET=<any string>" >> .env

```
2. Build the fullstack application locally
```bash
npm run build:full
```
3. Start the frontend application locally
```bash
npm start
```
