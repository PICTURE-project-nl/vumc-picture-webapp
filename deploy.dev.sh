#!/bin/bash

rsync -avz . picture@37.48.82.3:/srv/projects/vumc-picture-webapp
ssh picture@37.48.82.3 "cd /srv/projects/vumc-picture-webapp && docker-compose build"
ssh picture@37.48.82.3 "cd /srv/projects/vumc-picture-webapp && docker-compose up -d"
