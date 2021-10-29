FROM node:10.0.0-alpine

WORKDIR /frontend
ENV CHOKIDAR_USEPOLLING=true
COPY ./ ./
RUN npm install
CMD ["npm", "run", "serve"]