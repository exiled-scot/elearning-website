#!/bin/bash

# Change to src/ directory and run npm run start
cd src/
npm run start &

# Change to src/api directory and run docker-compose up
cd api/
docker-compose up
