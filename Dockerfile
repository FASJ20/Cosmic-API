FROM node:24.1.0-slim



COPY . .

RUN npm install

EXPOSE 5200

CMD ["npm", "start"]
