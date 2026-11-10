# Security notes

| Issue | Lab mitigation |
|-------|----------------|
| Claim after sale | `assertClaimable` refuses mismatched chain owner |
| Paying old owner on settle | `settleStale` always returns `reward: 0n` |
| Spoofed chain snapshot | Production must read AtomicAssets (or equivalent) on-chain; this lab only types the snapshot |
| Fake asset id on settle | `assetId` must match the row |
| Open-ended weight | `MAX_WEIGHT` cap |

Production still needs real table storage, auth on register, and a defined policy if the new owner should inherit the stake instead of settling to zero.
