FROM node:12.18
COPY package*.json /

COPY hardhat.config.ts /
COPY tsconfig.json /

ARG MNEMONIC
ARG INFURA_API_KEY
ENV MNEMONIC=${MNEMONIC}
ENV INFURA_API_KEY=${INFURA_API_KEY}
ENV NODE_ENV development
ENV PATH=node_modules/.bin:${PATH}

RUN npm i --scripts-prepend-node-path
RUN npm install --save ts-node

EXPOSE 3000

COPY . .


CMD npm run start
