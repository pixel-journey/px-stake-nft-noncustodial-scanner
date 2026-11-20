# Education — non-custodial NFT stake

> **Rung:** `npm test` passes. Snapshot is an argument — not a chain read. No reward token.  
> **The test is the rule.**

Emission math: [masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef). Official asset rows: [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) · [AtomicAssets API](https://docs.wax.io/build/api-reference/).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | NFT stays in the wallet; claim needs current owner match |
| Intermediate | Settle only when owners **differ**; reward 0 on settle |
| Masterclass | Stale snapshot attack; why this is not emission math |

---

## Beginner

Custodial stake **takes the NFT**. The contract account becomes `owner` on the AtomicAssets row, so a sale cannot happen underneath the stake.

Non-custodial stake **leaves the NFT in the wallet** and stores a pointer: asset id, who registered, and a weight. The NFT can still be transferred or sold. If you keep paying the registered name after that, you pay someone who no longer holds the asset.

This lab only answers: given a row and a chain snapshot, may we claim, or must we clear the row for free?

```bash
npm test
```

---

## Intermediate

| Function | Writes? | Rule |
| --- | --- |
| `registerStake` | Returns a new row | No NFT move. Weight in `[1, 1_000_000]`. Asset id in `[1, 2^64-1]`. Name matches `a-z1-5.` length 1..12 |
| `ownerMatches` | No | Same asset id required. Owners compared as strings |
| `assertClaimable` | No | Match, or throw `owner changed; settle stale row` |
| `settleStale` | Logical clear | Owners must **differ**. Reward is always `0n` |

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Claim after sale with stale owner | refuse; settle path |
| Settle while owner still matches | refuse (that is claim) |
| Positive reward on settle | **0n** by design |
| Call this custodial | NFT never moved |

---

## Masterclass

### Not in this repo

- Reading `assets` owner from AtomicAssets inside the action.
- `require_auth` of the settler, and whether the new owner or anyone may settle.
- Blocking transfer while staked (that is custodial, or an AtomicAssets notifier that refuses).
- Paying a pro-rata reward up to the transfer timestamp. This lab pays **zero** on purpose so the ownership bug cannot hide inside rounding.

### Common mistakes

1. Caching owner at deposit time and never re-reading it.  
2. Paying because the caller string equals the row while the NFT was gifted away.  
3. Settling while the owner still matches (that path is claim).  
4. Calling the pattern custodial.  
5. Copying masterchef emission here without tests.

### Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Harvest-on-transfer | New test; do not change zero reward silently |
| Template allowlist | Only Pixal templates earn |
| Multi-collection | Scope the owner read |
| Claim cooldown | [invariant kit](https://github.com/pixel-journey/px-invariant-kit) |

### Exercises

1. Alice registers asset 7, sells to Bob, claims with snapshot still saying alice — what must production do? (Re-read owner; refuse claim.)  
2. May `settleStale` run when owners still match? (**No**.)  
3. Is reward on settle positive in this lab? (`0n`)  
4. Where does emission math live? ([masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef))

---

## What this course will not teach

- Live AtomicAssets owner reads
- Emission / acc-per-share (masterchef)
- That a stored owner is proof of current ownership
