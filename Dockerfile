FROM node:14.13.0-alpine
WORKDIR /proshop
COPY package*.json ./proshop
RUN npm install
COPY ./ /proshop
RUN npm install --prefix frontend
RUN npm run build --prefix frontend
EXPOSE 5000
CMD [ "npm","start" ]
