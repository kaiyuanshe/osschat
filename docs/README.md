# Contributing

## Contributing Codes 

### Preparing the development environment

Install git & node.js on your computer

### Get the source code

```shell
git clone git@github.com:kaiyuanshe/osschat.git
```

### Install dependencies

```shell
cd osschat && npm install 
```

### Run locally

```shell
./node_modules/.bin/ts-node bin/main.ts
```

You can get the following result, open <http://localhost:8788>, scan qrcode and begin to use the bot!

```shell
16:57:45 INFO Wechaty <wechaty-puppet-puppeteer>(heroku-wechaty) start() v0.29.7 is starting...
16:57:47 INFO startWeb startWeb() listening to http://localhost:8788
```

After scan the qrcode, you can find the following result here

```shell
17:12:57 INFO chatops chatops(Der! I just got online!
OSS Bot v0.0.24)
17:12:57 INFO startBot onLogin(Contact<李佳芮>) 李佳芮 Heroku Wechaty Getting Started v0.29.7 logined
```

### Advance

1. Using docker to get a more stable version
2. Using an advance puppet to get a more stable version

## Contributing Documents

### Preparing the environment

Install python3 or Aanaconda3 on your computer

### Get the docs

```shell
git clone git@github.com:kaiyuanshe/osschat.git
```

### Install python requirements

```shell
cd osschat && python install docs/requirements.txt
```

### Write the documents

All documents are in the `docs/pages` directory.
Create your `.md` document and configure contents in
`docs/index.rst`. Format: `pages/your-file-name`.

Example:

```rst

Contents:

.. toctree::
   :maxdepth: 2
   :glob:

   ./pages/osschat
   ./pages/how-to-use
   ./README
   ./pages/faq
   ./pages/copyright
   ./pages/your-file-name

```

### Compile the documents

```shell
cd docs &&  sphinx-build -M html . build
```

### Preview documents locally

Open `index.html` with your browser in the `docs/build/html` directory

### Advanced settings

All settings in `doc/conf.py`.
Please refer this [conf.py](https://github.com/readthedocs/recommonmark/blob/master/setup.py).



