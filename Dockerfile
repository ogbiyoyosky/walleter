FROM node:12


WORKDIR '/app'

COPY package*.json ./

RUN npm i


USER root

COPY --chown=node:node . .

EXPOSE 4000

RUN npm run build

