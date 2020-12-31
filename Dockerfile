FROM node:14.13.0-alpine
WORKDIR /proshop
COPY ./ /proshop
RUN npm install
RUN npm install --prefix frontend
RUN npm run build --prefix frontend
EXPOSE 5000
CMD [ "npm","start" ]