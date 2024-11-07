FROM node:16.20.2
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 4000 
CMD [ "npm", "run", "start:production" ]
