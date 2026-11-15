# Tips

- Pass the owner from a chain read you performed in the same action. A client-supplied owner is how this gate gets lied to.
- Compare asset ids before owner strings. A matching name on the wrong asset is not a claim.
- Weight is not a token amount. The custodial chef lab owns emission math.
- `MAX_WEIGHT` is `1_000_000n`. It is a teaching cap, not a chain limit.
- Names here allow `.` (up to 12, not at the ends). [px-invariant-kit](https://github.com/pixel-journey/px-invariant-kit) `name.ts` is stricter (`a-z1-5` only). Do not merge them without a test.
- If you later pay a partial reward on transfer, add a new test. Do not silently change `reward: 0n`.
