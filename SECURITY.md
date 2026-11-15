# Security

## What the tests close

- Claim after the registered owner no longer matches the snapshot.
- Settle while the owner still matches (would wipe a live stake).
- Cross-asset snapshots clearing the wrong row.
- Zero weight, oversized weight, non-positive asset id, asset id above uint64, illegal account name.

## What the tests do not close

- The snapshot is a function argument. Nothing here proves it came from AtomicAssets.
- No `require_auth`. Anyone who can pass a snapshot can call the pure functions.
- No persistence. `settleStale` returns a result; it does not delete a table row.
- No reward token, so there is no insolvency test.
- Dots in names are accepted. That is looser than the invariant kit.

## Attack to remember

Alice registers asset 7, sells it to Bob, then claims using a **stale** snapshot that still says `alice`. A production action must load owner inside the contract (or from a trusted notification), not from Alice's transaction data.
