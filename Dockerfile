FROM node:18-alpine AS build

ARG BANG_SERVER_URL
ARG BANG_CARDS_BASE_URL

WORKDIR /app

COPY . .

RUN apk add gettext
RUN export BANG_SERVER_URL=$BANG_SERVER_URL && \
    export BANG_CARDS_BASE_URL=$BANG_CARDS_BASE_URL && \
    envsubst '$BANG_SERVER_URL,$BANG_CARDS_BASE_URL' < nginx.conf.template > nginx.conf

RUN npm ci 

RUN npm run build_env

RUN npm run build


FROM nginx:alpine AS prod

ENV NODE_ENV production

COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 8080

CMD ["nginx", "-g", "daemon off;"]