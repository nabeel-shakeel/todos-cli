# Todos CLI

A command line utility that fetches and displays a specified number of todos from from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API. It can fetch even or odd indexed todos and outputs the title and completion status in a table format.

## Working Demo
![Todos CLI Demo](./assets/todos-cli-demo.mov)

## Features

- Fetches first `n` specified even number of todos, by default `20`
- Option to fetch either even or odd indexed todos, by default `even`
- Display todos in a readable table format

## Prerequisites

- Node.js (>= 20.x.x)
- Docker (optional, for running in a container)

## Installation

1. Clone the repository

```bash
   git clone git@github.com:nabeel-shakeel/todos-cli.git
   cd todos-cli
```

2. Install dependencies `yarn`
3. Make a fresh build `yarn build`

## Usgae

First, intsall it globally in system `npm i -g .` and then run `td`
Or use with `npx`

```bash
npx td -n <number> -e|-even --no-even
```

Run `npx td --help` to get details of available options

Examples

- Fetch 20 even todos `npx td`
- Fetch 40 even todos `npx td -n 40 -e`
- Fetch 10 odd todos `npx td -n 10 --no-even`

## Tests

Tests are written using jest. To run the test `yarn test`

## Dockerization

Follow the below steps to build and run the docker conatiner

1. Build docker image `docker build -t todos-cli .`
2. Run docker container `docker run todos-cli -n 20`
