# 🏡 Production Build
FROM php:8.3.8-fpm-alpine

ARG AUTH_JWKURI
ENV AUTH_JWKURI=${AUTH_JWKURI}
ARG AUTH_AUDIENCE
ENV AUTH_AUDIENCE=${AUTH_AUDIENCE}
ARG AUTH_ISSUER
ENV AUTH_ISSUER=${AUTH_ISSUER}
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG APP_SECRET
ENV APP_SECRET=${APP_SECRET}
ARG APP_ENV
ENV APP_ENV=${APP_ENV}

RUN apk add --no-cache \
    bash git icu-dev zip unzip libzip-dev oniguruma-dev freetype-dev libjpeg-turbo-dev libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd intl mbstring opcache pdo pdo_mysql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --chown=appuser:appgroup . .

RUN chown -R appuser:appgroup /app

USER appuser

RUN composer install --no-dev --optimize-autoloader

USER root

EXPOSE 5601

CMD ["symfony", "server:start", "--port=5601", "--no-interaction", "--ansi"]