# px-stake-nft-noncustodial-scanner

> **Trust:** private educational lab (Tier B)
> **Quest:** 067 — non-custodial NFT stake scanner
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**One-sentence goal:** The NFT **stays in the wallet**. A stake row is only valid while a **chain-sourced owner** still matches. After a sale, **settle** clears the stale row with **zero** reward to the old staker.

Opposite of [px-stake-nft-custodial-masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef) (weight + emission math under contract custody of the *row*; this lab teaches ownership checks without moving the asset).

**Real code:** `npm test` (9 tests). **Not** wasm, **not** deployed, **no** live AtomicAssets read.

---

## What is true (executed)

| Rule | Result |
|------|--------|
| `registerStake` | Stores asset id, owner, weight. Does not transfer an NFT. |
| Zero / over-cap weight | Refused |
| `assertClaimable` | Requires chain owner == row owner; returns weight |
| Owner changed | Claim refused (`settle stale`) |
| `settleStale` | Clears; `reward` is always `0n`; previous owner recorded |
| Settle while still owner | Refused (`use claim not settle`) |

```bash
npm test
```

---

## Layout

| Path | Role |
|------|------|
| `invariants/scanner.ts` | register / match / claim gate / settle |
| `invariants/scanner.test.ts` | Executed claims |
| `EDUCATION.md` | Why non-custody needs a scanner |
| `SECURITY.md` | Stale-row and fake-owner surface |

## License

MIT — Pixel Journey

---

*Seeded 2026-11-10. No chain reads. No wasm.*
