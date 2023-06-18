FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN npm ci 

RUN npm run build_env

RUN npm run build


FROM nginx:alpine AS prod

ENV NODE_ENV production

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 8080

CMD ["nginx", "-g", "daemon off;"]