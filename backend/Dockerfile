FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libicu-dev \
    libonig-dev \
    libzip-dev \
    zip \
    && docker-php-ext-install pdo pdo_mysql intl mbstring zip opcache

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/symfony

COPY php.ini /usr/local/etc/php/php.ini

COPY . .

RUN composer install --no-scripts --no-interaction --optimize-autoloader

RUN chown -R www-data:www-data /var/www/symfony/var

EXPOSE 9000

CMD ["php-fpm"]