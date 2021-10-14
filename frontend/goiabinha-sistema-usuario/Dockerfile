FROM node:14-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY . ./

RUN yarn install 


CMD ["npm", "start"]