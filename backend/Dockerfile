#
# 🛠️ Build Stage
#
FROM php:8.1-fpm-alpine

RUN apk add --no-cache \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    icu-dev \
    oniguruma-dev \
    bash \
    postgresql-dev \
    && docker-php-ext-install pdo pdo_pgsql zip intl mbstring gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./

RUN composer install

COPY . .

# Expose the port
EXPOSE 5601

CMD ["php-fpm"]