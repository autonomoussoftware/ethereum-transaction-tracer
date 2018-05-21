# Ethereum Transaction Tracer

> 🐾 Simple REST tracer for Ethereum transactions and Parity clients.

## Requirements

A Parity node started with the options `--tracing on --jsonrpc-apis=traces` to allow the service to get transaction traces.

## Configuration

The following environment variables shall be set:

- `CORS_ORIGINS` (defaults to *)
- `ENODE_JSON_RPC_API_URL` (defaults to http://localhost:8545)
- `PORT` (defaults to 3006)

For Papertrail logging, the following variables shall be set:

- `LOGGER_PAPERTRAIL_HOST`
- `LOGGER_PAPERTRAIL_LEVEL`
- `LOGGER_PAPERTRAIL_PORT`
- `LOGGER_PAPERTRAIL_PROGRAM` (optional)

For New Relic to be enabled, the following variables shall also be set:

- `NEW_RELIC_LICENSE_KEY`
- `NEW_RELIC_LOGGING_LEVEL`

## Startup

Install dependencies and start the service:

```bash
npm install
npm start
```

## License

MIT
