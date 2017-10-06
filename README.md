# React Base

Just a low-level build of all the things needed to do some React development.

## Getting Started

This project uses [Binci](https://github.com/binci/binci) and [Docker](https://www.docker.com) to manage containerizing of the dev environment. It _can_ be run without these (just use `npm`/`yarn` run-commands instead)

**Quick Start**:

Run the following:

```
binci install up
```

The above will install all dependencies, and start the web server (with hot-module-reloading).

See the [`binci.yml`](./binci.yml) file for all available tasks.
