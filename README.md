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

## Deploy steps

According to instructions at: <https://thegraph.com/studio/subgraph/nft-marketplace/>

Run the following to generate the key for deployment (not using graph global install):

```shell
yarn graph auth --studio f6efb2e23949b43e353768b98b45fbd1
```

Update generation and compile:

```shell
yarn graph codegen
yarn graph build
```

Deploy:

```shell
yarn graph deploy --studio nft-marketplace
```

Deploy example results:

```txt
✔ Version Label (e.g. v0.0.1) · v0.0.1
  Skip migration: Bump mapping apiVersion from 0.0.1 to 0.0.2
  Skip migration: Bump mapping apiVersion from 0.0.2 to 0.0.3
  Skip migration: Bump mapping apiVersion from 0.0.3 to 0.0.4
  Skip migration: Bump mapping apiVersion from 0.0.4 to 0.0.5
  Skip migration: Bump mapping apiVersion from 0.0.5 to 0.0.6
  Skip migration: Bump manifest specVersion from 0.0.1 to 0.0.2
  Skip migration: Bump manifest specVersion from 0.0.2 to 0.0.4
✔ Apply migrations
✔ Load subgraph from subgraph.yaml
  Compile data source: NftMarketplace => build/NftMarketplace/NftMarketplace.wasm
✔ Compile subgraph
  Copy schema file build/schema.graphql
  Write subgraph file build/NftMarketplace/abis/NftMarketplace.json
  Write subgraph manifest build/subgraph.yaml
✔ Write compiled subgraph to build/
  Add file to IPFS build/schema.graphql
                .. QmXCGLS5R9LAikXq1i79Wonspj8GSFppTS7sw1FEeYXezg
  Add file to IPFS build/NftMarketplace/abis/NftMarketplace.json
                .. QmZnt5GsD6MwafLH2RUkv5yBQhdK3p2ABXZ2EUpafQKpLH
  Add file to IPFS build/NftMarketplace/NftMarketplace.wasm
                .. QmV7SkpmXbjFJaZtZc93tVHAXRbcftCLywSnYQ2kdqpoGn
✔ Upload subgraph to IPFS

Build completed: Qmb6m2F3fvjiz4QY3ykD621RL1Fz7tV18anbcS4hgmF3eo

Deployed to https://thegraph.com/studio/subgraph/nft-marketplace

Subgraph endpoints:
Queries (HTTP):     https://api.studio.thegraph.com/query/32189/nft-marketplace/v0.0.1
```
