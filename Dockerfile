FROM node:18

WORKDIR /dock

COPY package*.json ./

RUN npm install

COPY . .

# would send over any .env variables but do not want to push to github
# ENV

 EXPOSE 3000

 CMD ["npm", "run", "start:dev"]
