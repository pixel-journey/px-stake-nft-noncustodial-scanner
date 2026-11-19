# Sources

| Source | Use |
| --- | --- |
| [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) | Asset owner row |
| [WAX How-To AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets) | NFT model |
| [WAX API reference](https://docs.wax.io/build/api-reference/) | Read owner off-chain for tests; on-chain use tables |
| [docs.wax.io](https://docs.wax.io/) | Network docs |

**Non-custodial:** the player keeps the NFT. Claim requires a **fresh** owner match read **inside** the action. A client-supplied owner is how the gate is lied to. Compare asset id first, then owner.

`MAX_WEIGHT` (`1_000_000`) is a teaching cap, not a chain limit. A transfer-away settle pays reward **0** unless a new test says otherwise.

**Name split:** this lab allows `.` in names. [invariant-kit](https://github.com/pixel-journey/px-invariant-kit) `name.ts` does not. Do not merge the two without a test.

This file is not emission math. That is [masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef), and that chef **holds** the NFT.

## Related labs

| Lab | Topic |
| --- | --- |
| [custodial chef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef) | Contract holds the NFT; accrue before weight changes |
| [FT vault](https://github.com/pixel-journey/px-stake-ft-single-sided-vault) | Floor mint / ceil burn |
| [invariant kit](https://github.com/pixel-journey/px-invariant-kit) | Shared gates; stricter names |
| [treasury path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/TREASURY-TOKEN-LEARNING-PATH.md) | Curriculum order |
