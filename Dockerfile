FROM node:14.13.0-alpine
WORKDIR /proshop
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm install --prefix frontend
RUN npm run build --prefix frontend
CMD [ "npm","start" ]
