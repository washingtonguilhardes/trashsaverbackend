FROM node:14-bullseye As build

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build


FROM node:14-bullseye as production

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn --prod

COPY . .

COPY --from=build /usr/src/app/dist ./dist

EXPOSE ${PORT}

CMD ["node", "dist/main"]