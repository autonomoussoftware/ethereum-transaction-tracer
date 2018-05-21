# Ethereum Transaction Tracer

> 🐾 Simple REST tracer for Ethereum transactions and Parity clients.

## Requirements

A Parity node started with the options `--tracing on --jsonrpc-apis=traces` to allow the service to get transaction traces.

## Configuration

The following environment variables shall be set:

- `CORS_ORIGINS` (defaults to "\*")
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

## REST API

### `GET /transactions/:hash`

Will return a JSON array having the traces of the given transaction ID.

```json
[{
  "action": {
    "callType": "call",
    "from": "0x687422eea2cb73b5d3e242ba5456b782919afc85",
    "gas": "0x4791e",
    "input": "0x",
    "to": "0x14f17602b6c9b67503bb856fa53db6abf3471344",
    "value": "0xde0b6b3a7640000"
  },
  "blockHash": "0x801d0f40e7c79d013209be13cd1085d2a38e6df5ce3640cdc9aa07cec6ba8444",
  "blockNumber": 3281548,
  "result": {
    "gasUsed": "0x0",
    "output": "0x"
  },
  "subtraces": 0,
  "traceAddress": [],
  "transactionHash": "0xe6e1ded65c19ae51863b0ff6d6d229e2b8ee4303e5a2da85abb03a240fa44bf5",
  "transactionPosition": 15,
  "type": "call"
}]
```

## License

MIT
