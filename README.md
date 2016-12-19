# Hapi-azure-error-tracer

*Hapi plugin for error-tracing on azure storage tables*

## Install

```
npm install Hapi-azure-error-tracer --save

```
## Configurations

All the configurations are done using environment variables.

The connection string to the azure storage (mandatory):
```
AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=xxxx;AccountKey=yyyyyyyyyyy"

```

The name of the error table (default is *errors* )
```
ERROR_TABLE="errors"

```

## Usage

```
const tracer = require('hapi-azure-error-tracer');
server.register(tracer);
```

## Links

- [hapi](https://hapijs.com/) rest
- [asynquence](https://github.com/getify/asynquence) control flow
- [azure storage explorer](https://azurestorageexplorer.codeplex.com/) azure storage explorer


## Contributions

Feel free to fork, update and pr. I'll be happy to discuss further improvements.
Cheers.
