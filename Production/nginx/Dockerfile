# Use the nginx image
FROM nginx

# Remove the default nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

# Replace with out nginx.conf
COPY nginx.conf /etc/nginx/conf.d/