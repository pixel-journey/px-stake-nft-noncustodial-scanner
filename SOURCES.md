# Official sources

| Source | Use |
| --- | --- |
| [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) | Asset owner is on the asset row |
| [WAX: How-To AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets) | Ownership model |
| [WAX API reference](https://docs.wax.io/build/api-reference/) | AtomicAssets API owner queries |
| [docs.wax.io](https://docs.wax.io/) | WAX development |
| Org | [ATOMICASSETS-V2.md](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog/blob/main/ATOMICASSETS-V2.md) |

Non-custodial means the NFT never moves. Production must **read** the current owner (chain or trusted API) on claim — this lab only models the gate with injected chain-shaped rows.

## Domain map

| Repo | Role |
| --- | --- |
| [px-stake-nft-custodial-masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef) | Weight + emission under contract custody of the row |
| **This repo** | NFT stays in wallet; claim only while owner matches |
| [px-stake-ft-single-sided-vault](https://github.com/pixel-journey/px-stake-ft-single-sided-vault) | FT share vault |
