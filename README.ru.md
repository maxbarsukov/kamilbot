# КамильБот

[![docker](https://github.com/maxbarsukov/kamilbot/actions/workflows/docker.yml/badge.svg)](https://github.com/maxbarsukov/kamilbot/actions/workflows/docker.yml)
![license](https://img.shields.io/badge/license-MIT-green)

[English](README.md) ｜ Русский

[![moment 1](./docs/img/kamil3.jpg)](./docs/img/kamil3.jpg)
[![moment 2](./docs/img/kamil4.jpg)](./docs/img/kamil4.jpg)

> Покорми меня 🥺

## Оглавление
1. [Обновления](#updates)
2. [Начало работы](#getting-started)
   1. [Предварительные требования](#pre-reqs)
   2. [Сборка и запуск](#run)
3. [Линтинг](#linting)
4. [Содействие](#contributing)
5. [Нормы поведения](#code-of-conduct)
6. [Лицензия](#license)

## Обновления <a name="updates"></a>

<strong>🎉 v1 был выпущен!</strong>
<details open>
  <summary><b>🔔 20 марта 2023 (v0.1.0)</b></summary>

> - Создан бот, добавлены основные имена и детектор имен.
</details>

## Начало работы <a name="getting-started"></a>

### Предварительные требования <a name="pre-reqs"></a>

Убедитесь, что у вас устанволен [`git`](https://git-scm.com/).

Чтобы собрать и запустить это приложение локально, вам понадобится несколько вещей:

- Проверьте, что [Node.js](https://nodejs.org/en) установлен *(проверено на **v18.12.1**)*;
- Установите [Yarn](https://yarnpkg.com/) *(проверено на **1.22.19**)*;

***или***

- Установите [Docker](https://docs.docker.com/);
- Установите [docker-compose](https://docs.docker.com/compose/install/);

Склонируйте этот репозиторий:

    git clone git@github.com:maxbarsukov/kamilbot.git


### Сборка и запуск <a name="run"></a>

#### Локально

    yarn install
    yarn build
    yarn start

#### Docker

    ./bin/docker-setup
    docker-compose up

## Линтинг <a name="linting"></a>

### Локально

```bash
yarn lint # yarn lint:fix чтобы исправтить ошибки с помощью eslint
yarn format # yarn format:fix чтобы исправтить ошибки с помощью prettier
```

### Docker

Run `bin/docker-setup` and `bin/docker-quality` to launch quality checkers in Docker;


## Содействие <a name="contributing"></a>

Сообщения об ошибках и запросы на вытягивание приветствуются на GitHub по адресу https://github.com/maxbarsukov/kamilbot.
Этот проект задуман как безопасное и гостеприимное пространство для совместной работы, и ожидается, что участники будут придерживаться [кодекса поведения](https://github.com/maxbarsukov/kamilbot/blob/master/CODE_OF_CONDUCT.md).


## Нормы поведения <a name="code-of-conduct"></a>

Ожидается, что все, кто взаимодействует с кодовыми базами, системами отслеживания проблем, чатами и списками рассылки проекта **kamilbot**, будут следовать [кодексу поведения](https://github.com/maxbarsukov/kamilbot/blob/master/CODE_OF_CONDUCT.md).


## Лицензия <a name="license"></a>

Проект доступен с открытым исходным кодом на условиях [Лицензии MIT](https://opensource.org/licenses/MIT).
*Авторские права 2023 Max Barsukov*


**Leave a star :star: if you find this project useful.**
