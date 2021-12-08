FROM node:12.18
COPY package.json /

COPY hardhat.config.ts /
COPY tsconfig.json /

ENV NODE_ENV production
ENV PATH node_modules/.bin:$PATH

RUN npm install --save-dev typescript
RUN npm i

EXPOSE 3000

COPY . .

#RUN npm run deploy-kovan

CMD npm run start
