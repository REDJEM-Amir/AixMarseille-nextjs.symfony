# 🏡 Production Build
FROM php:8.3.8-fpm-alpine

RUN apk add --no-cache \
    bash git icu-dev zip unzip libzip-dev oniguruma-dev freetype-dev libjpeg-turbo-dev libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd intl mbstring opcache pdo pdo_mysql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --chown=appuser:appgroup . .

USER appuser

RUN composer install --no-dev --optimize-autoloader

USER root

EXPOSE 5601

CMD ["symfony", "server:start", "--port=5601", "--no-interaction", "--ansi"]