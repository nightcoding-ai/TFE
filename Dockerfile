FROM node:12.19.0-alpine3.9 AS development

WORKDIR /BEND/api/


RUN npm install 

RUN npm run start:dev



