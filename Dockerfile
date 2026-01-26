FROM node:18-alpine

WORKDIR /app

# Build argument for API URL (React needs REACT_APP_ prefix at build time)
ARG REACT_APP_API_URL=http://localhost:5002
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
