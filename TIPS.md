# Tips — non-custodial stake scan

The NFT stays in the player's wallet. The contract only believes a claim when the **chain owner** of that asset id still matches the staker row.

## Do

- Read the owner in the **same action** as the claim (AtomicAssets table / `get_asset`). A client-supplied owner is how this gate is lied to.
- Compare **asset id first**, then owner. A matching name on the wrong asset is not a claim.
- On transfer away, settle the row: weight 0, no further claim, reward 0 in this lab unless you add a tested partial harvest.

## Don't

- Use this file for emission math. That is [masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef).
- Merge name rules with [invariant-kit](https://github.com/pixel-journey/px-invariant-kit) `name.ts` without a test. This lab allows `.` in names; the kit does not.
- Silently change `reward: 0n` on a transfer settle. If you pay a partial reward, add a test first.

## Common mistakes

1. Caching owner at deposit time and never re-reading it.
2. Paying because the caller string equals the row, while the NFT was already gifted away.
3. Treating `MAX_WEIGHT` (`1_000_000n`) as a chain limit. It is a teaching cap.
4. Calling the pattern custodial. Custody means the contract account holds the NFT.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Harvest-on-transfer | New test; do not change the zero reward silently |
| Template allowlist | Only Pixal templates earn |
| Multi-collection | Scope the owner read to `pixeljourney` |
| Rate limit | Per-account claim cooldown from the kit |

Official reads: [AtomicAssets API](https://docs.wax.io/build/api-reference/) · [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract).
