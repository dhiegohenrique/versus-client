FROM node:12.2.0-alpine as builder
WORKDIR /src/app
COPY ./package.json package-lock.json ./
RUN npm i && npm cache clean --force
COPY . .
RUN npm run build

FROM nginx:1.16.0-alpine
RUN apk add --update --upgrade --no-cache wget
ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src/app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]