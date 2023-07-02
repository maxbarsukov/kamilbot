# Kamil Bot

[![docker](https://github.com/maxbarsukov/kamilbot/actions/workflows/docker.yml/badge.svg)](https://github.com/maxbarsukov/kamilbot/actions/workflows/docker.yml)
![license](https://img.shields.io/badge/license-MIT-green)

English ｜ [Русский](README.ru.md)

[![moment 1](./docs/img/kamil3.jpg)](./docs/img/kamil3.jpg)
[![moment 2](./docs/img/kamil4.jpg)](./docs/img/kamil4.jpg)

> Покорми меня 🥺 by [Камиль](https://t.me/kamilonly)

## Table of contents
1. [Updates](#updates)
2. [Getting Started](#getting-started)
   1. [Pre-reqs](#pre-reqs)
   2. [Building and Running](#run)
3. [Linting](#linting)
4. [Contributing](#contributing)
5. [Code of Conduct](#code-of-conduct)
6. [License](#license)

## Updates <a name="updates"></a>

<strong>🎉 v2 has been released!</strong>
<details open>
  <summary><b>🔔 Jul. 2, 2023 (v0.3.0)</b></summary>

> - Add nylon logging. Literally 1984.
</details>

<details open>
  <summary><b>🔔 Mar. 24, 2023 (v0.2.0)</b></summary>

> - Fix some bugs, update random messages.
</details>

<strong>🎉 v1 has been released!</strong>
<details open>
  <summary><b>🔔 Mar. 20, 2023 (v0.1.0)</b></summary>

> - Create bot, add basic names and name detector.
</details>

## Getting Started <a name="getting-started"></a>

### Pre-reqs <a name="pre-reqs"></a>

Make sure you have [`git`](https://git-scm.com/) installed.

To build and run this app locally you will need a few things:

- Check you have [Node.js](https://nodejs.org/en) installed *(tested with **v18.12.1**)*;
- Install [Yarn](https://yarnpkg.com/) *(tested with **1.22.19**)*;

***or***

- Install [Docker](https://docs.docker.com/);
- Install [docker-compose](https://docs.docker.com/compose/install/);

Clone this repository:

    git clone git@github.com:maxbarsukov/kamilbot.git


### Building and Running <a name="run"></a>

#### Locally

    yarn install
    yarn build
    yarn start

#### Docker

    ./bin/docker-setup
    docker-compose up

## Linting <a name="linting"></a>

### Locally

```bash
yarn lint # yarn lint:fix to fix with eslint
yarn format # yarn format:fix to fix with prettier
```

### Docker

Run `bin/docker-setup` and `bin/docker-quality` to launch quality checkers in Docker;


## Contributing <a name="contributing"></a>

Bug reports and pull requests are welcome on GitHub at https://github.com/maxbarsukov/kamilbot.
This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/maxbarsukov/kamilbot/blob/master/CODE_OF_CONDUCT.md).


## Code of Conduct <a name="code-of-conduct"></a>

Everyone interacting in the **kamilbot** project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/maxbarsukov/kamilbot/blob/master/CODE_OF_CONDUCT.md).


## License <a name="license"></a>

The project is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
*Copyright 2023 Max Barsukov*


**Leave a star :star: if you find this project useful.**
