#!/bin/bash
docker run --network projects-network --rm $1 --name projects-nginx \
        -v /home/ec2-user/etc/nginx/conf.d:/etc/nginx/conf.d \
        -v /home/ec2-user/etc/letsencrypt:/etc/letsencrypt \
        -v /home/ec2-user/var/lib/letsencrypt:/var/lib/letsencrypt \
        -p 80:80 -p 443:443 nginx:alpine
