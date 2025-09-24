FROM node:lts-slim AS build
WORKDIR /src

COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build -- --configuration=development --output-path=dist

FROM nginx:stable AS final
EXPOSE 4200

RUN rm -f /usr/share/nginx/html.index.html

COPY --from=build /src/dist/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN if [ -f /usr/share/nginx/html/index.csr.html ]; then \ 
        cp /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html; \
        fi