#!/bin/bash
docker run  --network projects-network --name proshop --rm $1 -it \
        -v $PWD:/mnt/app \
        -p 8080:3000 \
        -w /mnt/app node:alpine npm run production
