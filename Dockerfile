FROM node:10.0.0-alpine
# FROM node:latest

WORKDIR /frontend
ENV CHOKIDAR_USEPOLLING=true
COPY ./package*.json ./
RUN npm install

CMD ["npm", "run", "serve"]