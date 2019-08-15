FROM node:10
WORKDIR /app
COPY ./package.json /app
RUN npm install
COPY . /app
CMD npm run build && npx serve -l 5000 -s build
EXPOSE 5000
