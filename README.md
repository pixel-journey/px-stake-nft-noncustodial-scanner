# Non-custodial NFT stake scanner

Educational ownership gate: register a stake pointer without moving the NFT; claim only when chain snapshot owner still matches; settle stale rows with **reward 0**. Pure TypeScript — no AtomicAssets RPC.

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Why stored owner is not enough |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Claim vs settle tables |
| [TIPS.md](TIPS.md) | Snapshot in the same action |
| [SECURITY.md](SECURITY.md) | Stale-snapshot attack |
| [SOURCES.md](SOURCES.md) | AtomicAssets owner truth |

Emission math: [custodial masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef).

```bash
npm test
```

MIT — Pixel Journey
