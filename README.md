# Digihive 

## Development

### Requirements
* Docker
* Configured Prettier in your IDE, enabled for `.twig, .js, .css` files

### Dev server
* To start dev server run `$ make run`
* Then you can access to website on `localhost:8080`
* Required packages will be installed automatically inside Docker container (into `node_modules` folder)
* Watcher for automatic compilation will be running automatically
* Mailhog e-mail client is available on `localhost:8082`

### Build
* To build website run `$ make build`