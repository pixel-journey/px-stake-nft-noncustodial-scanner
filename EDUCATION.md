# Education — non-custodial NFT stake

## Beginner

Custodial stake **takes the NFT**. The contract account becomes `owner` on the AtomicAssets row, so a sale cannot happen underneath the stake.

Non-custodial stake **leaves the NFT in the wallet** and stores a pointer: asset id, who registered, and a weight. The NFT can still be transferred or sold. If you keep paying the registered name after that, you pay someone who no longer holds the asset.

This lab only answers: given a row and a chain snapshot, may we claim, or must we clear the row for free?

## Intermediate

| Function | Writes? | Rule |
| --- | --- | --- |
| `registerStake` | Returns a new row | No NFT move. Weight in `[1, 1_000_000]`. Asset id in `[1, 2^64-1]`. Name matches `a-z1-5.` length 1..12, not leading or trailing `.` |
| `ownerMatches` | No | Same asset id required. Owners compared as strings |
| `assertClaimable` | No | Match, or throw `owner changed; settle stale row`. Returns the weight for a reward formula that lives elsewhere |
| `settleStale` | Logical clear | Owners must **differ**. Reward is always `0n`. Previous owner is reported so an indexer can drop the row |

Reward math (acc-per-share, emission) is [px-stake-nft-custodial-masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef). Do not copy that formula here until a test asserts it.

## Masterclass (not in this repo)

- Reading `assets` owner from AtomicAssets (`get_table_rows` or the AA API) inside the action.
- `require_auth` of the settler, and whether the new owner or anyone may settle.
- Blocking transfer while staked (that is custodial, or an AtomicAssets notifier that refuses).
- Paying a pro-rata reward up to the transfer timestamp. This lab pays **zero** on purpose so the ownership bug cannot hide inside rounding.

## Outcomes

1. Explain why a stored owner is not proof of current ownership.
2. Refuse a claim when the snapshot owner differs.
3. Clear a stale row with reward 0 rather than paying the seller.
4. Refuse settle when the owner still matches (that path is claim).
5. Cite the AtomicAssets asset row as the owner source, and say this repo does not read it.
