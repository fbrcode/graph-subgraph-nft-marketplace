# TheGraph Subgraph Studio Code

This is the subgraph code.

Repository to code the subgraph specification and push to studio.

- <https://thegraph.com/studio/>
- <https://thegraph.com/docs/en/>

## Init

- ``

## GraphQL

Using GraphQL to handle queries:

- <https://graphql.org/>
- <https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql>

## Generation

After implementing the entities tied to the events defined in `schema.graphql`, run `yarn codegen` to generate typescript typings at `generated/schema.ts`

## Event handling adjustments

Adjust the event handling logic on `src/nft-marketplace.ts` like it would be insert/update logic in a table. TheGraph will handle the events like that.

## Start block adjustment

Get the start block from Etherscan Rinkeby deployment from the transaction:

<https://rinkeby.etherscan.io/tx/0x42799605ca9dc459cf1e3d1e5ae47533de92497f234e06cfbbd654dfbdc34254>

> In this case block # 11137300, minus one... 11137299

And add it (minus one block) to the `subgraph.yaml` right below the `abi` entry with the tag `startBlock`

Example:

```yaml
specVersion: 0.0.4
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: NftMarketplace
    network: rinkeby
    source:
      address: "0xe088bD8Bb7e0aDcEB50D302bDF49763fD008ABBc"
      abi: NftMarketplace
      startBlock: 11137299
```
