#! /bin/bash

build(){
    docker build -t rover .
}

run() {
    docker run -it rover
}

build
run