# Security — non-custodial stake scan

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Claim after registered owner no longer matches | refused |
| Settle while owner still matches | refused (would wipe a live stake) |
| Cross-asset snapshot clearing the wrong row | refused |
| Zero / oversized weight, bad asset id, illegal name | refused |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Snapshot source | Function argument is not a chain proof — load owner **inside** the action |
| Auth | Real `require_auth` |
| Persistence | `settleStale` returns a result; it does not delete a table row |
| Reward solvency | No reward token here |
| Name charset | This lab allows `.`; [invariant kit](https://github.com/pixel-journey/px-invariant-kit) is stricter |

## Attack angles

1. **Stale snapshot** — Alice registers asset 7, sells to Bob, claims with a snapshot that still says `alice`. Production must re-read owner in the same action.
2. Caching owner at deposit time and never refreshing.
3. Paying because the caller string equals the row while the NFT was gifted away.
4. Calling the pattern custodial. Custody means the contract account holds the NFT.

## Honesty limits

No emission math (that is [masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef)). No AtomicAssets RPC. Official reads: [AtomicAssets API](https://docs.wax.io/build/api-reference/) · [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract).
