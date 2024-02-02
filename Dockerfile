FROM node:18

WORKDIR /vangers
COPY package.json .
RUN npm i
COPY . .
#CMD npm run makemigrations
#CMD npm run migrate
CMD npm run start
