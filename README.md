# px-stake-nft-noncustodial-scanner

> **Trust:** private educational lab (Tier B)  
> **Domain:** non-custodial NFT stake  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**One-sentence goal:** The NFT **stays in the wallet**. A stake row is only valid while a **chain-sourced owner** still matches. After a sale, **settle** clears the stale row with **zero** reward to the old staker.

Opposite of [px-stake-nft-custodial-masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef). Ownership truth: [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) asset rows / [AtomicAssets API](https://docs.wax.io/build/api-reference/).

**Real code:** `npm test` (9 tests). **Not** wasm, **no** live AtomicAssets read.

## What is true (executed)

| Rule | Result |
|------|--------|
| `registerStake` | Stores asset id, owner, weight. Does not transfer an NFT. |
| Zero / over-cap weight | Refused |
| `assertClaimable` | Requires chain owner == row owner |
| Owner changed | Claim refused; `settleStale` clears with `reward` `0n` |
| Settle while still owner | Refused (`use claim not settle`) |

```bash
npm test
```

## Related

- [px-stake-nft-custodial-masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef)
- [px-stake-ft-single-sided-vault](https://github.com/pixel-journey/px-stake-ft-single-sided-vault)

## License

MIT — Pixel Journey
