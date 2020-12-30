#!/bin/bash
docker run  --network projects-network --name proshop --rm $1 -it \
        -v $PWD:/mnt/app \
        -v ~/env/proshop:/mnt/env \
        -p 8080:5000 \
        -w /mnt/app node:alpine cp /mnt/env/.env . && npm run start
