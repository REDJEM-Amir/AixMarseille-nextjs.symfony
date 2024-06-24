FROM php:8.2-fpm-alpine

# Install system dependencies
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

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy the composer files
COPY composer.json composer.lock ./

# Allow Composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

# Install PHP dependencies
RUN composer install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 5601

# Start PHP-FPM server
CMD ["php-fpm"]