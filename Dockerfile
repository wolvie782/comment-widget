FROM node:latest
WORKDIR /var/www/html/comment-widget-master
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
