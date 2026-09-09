FROM denoland/deno:latest AS builder

WORKDIR /usr/src/app

COPY deno.json deno.lock vite.config.ts ./
COPY client ./client

RUN deno install --allow-scripts
RUN deno task build

FROM docker.io/library/nginx:1.29.3

WORKDIR /usr/src/app/

# defaults for standalone/local runs; override via -e or a k8s Deployment env/ConfigMap
ENV BACKEND_HOST=backend
ENV BACKEND_PORT=8080
# opt in to the base image resolving /etc/resolv.conf into NGINX_LOCAL_RESOLVERS
ENV NGINX_ENTRYPOINT_LOCAL_RESOLVERS=1

# rendered into /etc/nginx/conf.d/default.conf at startup by the base image's
# built-in envsubst-on-templates entrypoint script
COPY default.conf.template /etc/nginx/templates/default.conf.template

COPY --from=builder /usr/src/app/client/dist /usr/share/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
