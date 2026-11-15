# Worked examples

Numbers match `invariants/scanner.test.ts`.

## Register

```text
registerStake(42n, "alice", 10n)
→ { assetId: 42n, owner: "alice", weight: 10n }
```

No `transfer` action is built. The NFT never leaves alice in this lab.

Refused:

| Call | Error |
| --- | --- |
| weight `0n` | positive |
| weight `1_000_001n` | MAX_WEIGHT |
| asset id `0n` | positive |
| asset id `2^64` | uint64 |
| owner `"Alice"` | bad account name |

## Still the owner

Row: asset `7`, owner `alice`, weight `5`.

Chain snapshot `{ assetId: 7n, owner: "alice" }`:

- `ownerMatches` → `true`
- `assertClaimable` → `5n` (weight only; no token payout)

`settleStale` on that same snapshot throws `use claim not settle`.

## NFT moved

Same row. Snapshot `{ assetId: 7n, owner: "bob" }`:

- `ownerMatches` → `false`
- `assertClaimable` throws `settle stale`
- `settleStale` → `{ cleared: true, reward: 0n, previousOwner: "alice" }`

Bob does not receive alice's unclaimed weight. Alice does not receive a farewell payout. The row is simply dead.

## Wrong asset on the snapshot

Row asset `7`, snapshot asset `8` or `9` throws `asset id mismatch` on both match and settle. A snapshot for a different NFT must not clear this row.
