### STAGE 1: Build ###
FROM node:9.11.1 as builder


ENV DOCKER_BUILDKIT=1

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
COPY ./config/.env.docker.dev /usr/src/app/.env

RUN npm install
#RUN npm install react-scripts -g
COPY . /usr/src/app
RUN npm run build

### STAGE 2: Production Environment ###
FROM nginx:1.13.12-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
