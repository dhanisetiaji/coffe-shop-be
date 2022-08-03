# Coffee Shop API

<!-- NAVIGATION -->
<ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>

<!-- ABOUT THE PROJECT -->

## About The Project

### Built With

some technology used in this project.

- [Express](https://expressjs.com)
- [JWT](https://jwt.io)
- [MySQL](https://mysql.com)
- [CryptoJs](https://www.npmjs.com/package/crypto-js)
- [Cloudinary (media upload)](https://cloudinary.com/)


<!-- GETTING STARTED -->

## Getting Started

Get started with this project, intructions on setting up your project locally.
To get a local copy up and running follow these simple steps.

### Prerequisites

Before installing, you must be install [nodejs](https://nodejs.org) [yarn](https://yarnpkg.com/getting-started/install)

### Installation

1. Clone this repo

```sh
git clone https://github.com/dhanisetiaji/coffe-shop-be.git
```

2. Install yarn package

```sh
cd coffe-shop-be
yarn install
```

3. Setting `.env`

- create `.env` file

  ```sh
  touch .env
  ```

- Add configuration in `.env` file

```
host = yourdbhostname
user = yourdbusername
password = yourdbpassword
database = yourdbdatabasename

SECRET_KEY_CRYPT = yoursecretkeycrypto

SECRET_KEY_JWT = yoursecretkeyjwt

CLOUDINARY_CLOUD_NAME = yourcloudinaryname
CLOUDINARY_API_KEY = 'yourcloudinarykey
CLOUDINARY_API_SECRET = yourcloudinaryapisecret

PORT = yourport

```


1. Start the project

```sh
yarn start
```

<!-- Contributors -->

## Contributors

- Fullstack [Dhani Setiaji (PM)](https://github.com/dhanisetiaji)

