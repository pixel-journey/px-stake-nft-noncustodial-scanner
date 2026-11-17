# Sources

| Source | Use |
| --- | --- |
| [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) | Asset owner row |
| [WAX How-To AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets) | NFT model |
| [WAX API reference](https://docs.wax.io/build/api-reference/) | Read owner off-chain for tests; on-chain use tables |
| [docs.wax.io](https://docs.wax.io/) | Network docs |

**Non-custodial:** the player keeps the NFT. Claim requires a **fresh** owner match. The function argument is not a chain proof — production loads the owner **inside** the action.

## Related labs

| Lab | Topic |
| --- | --- |
| [custodial chef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef) | Contract holds the NFT + emission math |
| [FT vault](https://github.com/pixel-journey/px-stake-ft-single-sided-vault) | Share math |
| [invariant kit](https://github.com/pixel-journey/px-invariant-kit) | Shared gates |
| [treasury path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/TREASURY-TOKEN-LEARNING-PATH.md) | Curriculum order |
