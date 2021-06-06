# Mars Rover TDD Kata

## Docker Setup

On a Unix (Mac and Linux) machine, run:

- `bash run.sh` or `chmod +x run.sh && ./run.sh`, this build and tags the image and runs the container in interactive mode.

On a Windows machine, run:

- `docker build -t rover .`, which builds and tags the image.
- `docker run -it rover`, runs the container in interactive mode.

## Running the Application

Run `yarn start -h`

<p align="center">
  <img width="892" alt="cli showing help options" src="https://user-images.githubusercontent.com/5263355/120939815-ba5d9a00-c711-11eb-8094-113c3ee98ca3.png">
</p>


# Rover Specification

From the problem statement, we can assume the the Rover is moving on a 2-Dimentional grid. Since the Rover would need to keep track of it's position and heading.

## Position and Heading

We can have represent the Rover's current position using a `Vector2 (x, y)`, and the direction can be represented using a single digit.

<p align="center"><img width="381" alt="grid showing rover position and heading/direction"  src="https://user-images.githubusercontent.com/5263355/120787740-9179b100-c527-11eb-835b-0f17e291e263.png"></p>
