FROM node:12.18-alpine
COPY package.json /

COPY hardhat.config.ts /
COPY tsconfig.json /

ENV NODE_ENV production

RUN npm install --save-dev typescript
RUN npm install -g

ENV PATH node_modules/.bin:$PATH

EXPOSE 3000

COPY contracts /contracts
COPY deploy /deploy
COPY src /src

RUN npm run deploy-kovan

CMD npm run start
