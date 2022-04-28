FROM node:14.17.6

WORKDIR /api/src

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["npm", "run start:dev" ]
