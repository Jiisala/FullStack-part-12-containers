FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV REACT_APP_BACKEND_URL=//localhost:5002

RUN npm run build

RUN CI=true npm test

CMD ["npm", "start"] 