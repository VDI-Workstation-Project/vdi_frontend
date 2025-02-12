FROM ubuntu:latest
LABEL authors="woods"

ENTRYPOINT ["top", "-b"]