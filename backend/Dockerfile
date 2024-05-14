#
# 🏡 Production Build
#

FROM php:8.3.7-fpm-alpine as builder

RUN apk add --no-cache \
        git \
        unzip \
        libzip-dev \
        icu-dev \
        && docker-php-ext-install \
        pdo \
        pdo_mysql \
        zip \
        intl \
        opcache

WORKDIR /app

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY composer.* ./
RUN composer install --no-dev --optimize-autoloader

COPY . .

FROM php:8.3.7-fpm-alpine

RUN apk add --no-cache \
        icu-dev \
        && docker-php-ext-install \
        intl \
        opcache

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 5601

CMD ["php-fpm"]