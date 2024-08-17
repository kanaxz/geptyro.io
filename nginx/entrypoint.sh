#!/bin/bash

# Define an array of environment variables
ENV_VARS=(
  'NGINX_HTTP_PORT'
  'NGINX_HTTPS_PORT'
  'NGINX_DOMAIN'
  'SERVER_PORT'
  'ENV'
)

# Create a list of variables for envsubst
SUBST_VARS=$(printf '${%s} ' "${ENV_VARS[@]}")

# Substitute environment variables in the Nginx config template
envsubst "$SUBST_VARS" < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Check if the substitution was successful
if [ $? -ne 0 ]; then
  echo "Error: Failed to substitute environment variables"
  exit 1
fi

# Start Nginx
exec nginx -g 'daemon off;'