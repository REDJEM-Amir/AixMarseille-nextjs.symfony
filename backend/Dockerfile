#
# 🛠️ Build Stage
#
FROM php:8.1-fpm-alpine as builder

# Arguments
ARG APP_ENV
ENV APP_ENV=${APP_ENV}

RUN apk add --no-cache \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    icu-dev \
    oniguruma-dev \
    bash \
    postgresql-dev

RUN docker-php-ext-install pdo pdo_pgsql zip intl mbstring gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install --prefer-dist --no-dev --no-scripts --no-progress --no-interaction --optimize-autoloader

COPY . .

RUN APP_ENV=prod composer dump-autoload --no-dev --optimize

#
# 🚀 Production Stage
#
FROM php:8.1-fpm-alpine

RUN apk add --no-cache \
    libzip-dev \
    libpng-dev \
    icu-dev \
    oniguruma-dev \
    bash \
    postgresql-dev

RUN docker-php-ext-install pdo pdo_pgsql zip intl mbstring gd

WORKDIR /app

COPY --from=builder /app ./

# Expose the port
EXPOSE 5601

CMD ["php-fpm"]