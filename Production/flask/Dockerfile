# pull official base image
FROM python:3.11.3-slim-buster

# set work directory
WORKDIR /usr/src/app/

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1 # Prevents Python from writing pyc files to disc
ENV PYTHONUNBUFFERED 1 # Prevents Python from buffering stdout and stderr
ENV DEBIAN_FRONTEND=noninteractive

# copy files of the application
COPY . /usr/src/app/

# install dependencies
RUN apt update && apt install -y gcc && rm -rf /var/lib/apt/lists/*
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# specify command to run the application each time the container is started
CMD ["uwsgi","app.ini"]