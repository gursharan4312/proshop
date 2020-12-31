#!/bin/bash
docker run --network nginx-proxy --rm -d --name nginx-container \
        -v ~/nginx/nginx-conf:/etc/nginx/conf.d \
        -v ~/nginx/letsencrypt:/etc/letsencrypt \
        -v ~/nginx/var/lib/letsencrypt:/var/lib/letsencrypt \
        -p 80:80 -p 443:443 nginx:alpine
