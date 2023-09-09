FROM node:20-alpine

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add git

COPY ./package*.json /app/

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0

CMD [ "npm", "start" ]
