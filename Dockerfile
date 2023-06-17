FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN npm ci 

RUN npm run build_env

RUN npm run build


FROM nginx:alpine AS prod

ENV NODE_ENV production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]