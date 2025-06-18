FROM node:20-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build


# serve the angular app with nginx

FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *

# copy  the build anguylar app froom the build stage

COPY --from=build /app/dist/Webapp/browser .
EXPOSE 80
ENTRYPOINT ["nginx" , "-g", "daemon off;"]
