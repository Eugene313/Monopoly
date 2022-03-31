FROM node:14 as build

RUN mkdir -p /web
WORKDIR /web
ARG BASE_URL_AXIOS
ARG CONFIG

ENV NUXT_VERSION=2.15.7
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8000
ENV CONFIG=${CONFIG}

COPY . .
RUN npm ci && npm rebuild node-sass && npm run build --standalone

FROM node:14-alpine as release

RUN mkdir -p /web
WORKDIR /web
ARG BASE_URL_AXIOS
ARG CONFIG

ENV NUXT_VERSION=2.15.7
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8000
ENV CONFIG=${CONFIG}


COPY --from=build /web  .

EXPOSE 8000

CMD npm run start-${CONFIG}
