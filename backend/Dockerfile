# 🏡 Production Build
FROM php:8.3.8-fpm-alpine

RUN apk add --no-cache bash git icu-dev zip unzip libzip-dev oniguruma-dev \
    && docker-php-ext-install intl mbstring opcache pdo pdo_mysql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader

EXPOSE 5601

CMD ["symfony", "server:start", "--port=5601", "--no-interaction", "--ansi"]