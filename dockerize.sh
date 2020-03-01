#!/bin/bash

docker kill iotchangelog-web 2>/dev/null

docker image build -t  iotchangelog-web .

docker run -id \
    -v `pwd`/config/.env.docker.local:/usr/share/nginx/html/.env \
    --name iotchangelog-web \
    --network iotchangelog_network \
    -p 3001:80 \
    --rm iotchangelog-web:latest

