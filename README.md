# Non-custodial NFT stake scanner

> **Domain:** NFT stays in the wallet; the contract stores only a stake row  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Opposite:** [px-stake-nft-custodial-masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef)

**Goal:** A claim is valid only while a chain-sourced owner still matches the registered staker. After the NFT moves, settle clears the row and pays **zero** to the old owner.

**Code under test:** `npm test` (9 tests). No wasm. No live AtomicAssets read. The chain snapshot is an argument the caller must have loaded; this lab does not fetch it.

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Why a pointer stake can pay the wrong wallet |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Asset 7, alice → bob |
| [TIPS.md](TIPS.md) | What to read from chain, and what not to trust |
| [SECURITY.md](SECURITY.md) | Stale rows, fake snapshots |
| [SOURCES.md](SOURCES.md) | AtomicAssets owner field |

## What is true (executed)

| Rule | Result |
| --- | --- |
| `registerStake` | Stores asset id, owner, weight. Does not transfer an NFT. |
| Weight `0` or above `1_000_000` | Refused |
| Asset id `0` or above uint64 | Refused |
| `assertClaimable` | Chain owner must equal row owner; returns weight |
| Owner changed | Claim refused; `settleStale` clears with reward `0n` |
| Settle while owner still matches | Refused |

```bash
npm test
```

## Related

- Custodial rewards: [px-stake-nft-custodial-masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef)
- FT shares: [px-stake-ft-single-sided-vault](https://github.com/pixel-journey/px-stake-ft-single-sided-vault)

MIT — Pixel Journey
