#!/bin/bash
docker build -t vumc-picture-webapp .
docker run -d -p 8000:8000 vumc-picture-webapp
