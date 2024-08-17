FROM nginx:latest

# Install envsubst
RUN apt-get update && apt-get install -y gettext-base

# Copy template config
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]