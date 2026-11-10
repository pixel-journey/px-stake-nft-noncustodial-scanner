# Education

## The pitfall

Custodial stake contracts take the NFT into the contract account. Non-custodial designs leave the NFT in the user's wallet and only store a **pointer** (asset id + registered owner + weight).

If the user sells the NFT, the row still says the old owner. Paying that row is stealing yield from the new holder (or paying a seller who no longer holds the risk). Ignoring ownership is the bug this lab isolates.

## The rule

1. Registration does **not** move the asset.
2. Claim requires a **chain-sourced** owner snapshot that still matches the row.
3. When the owners differ, **settle** removes the row and pays **zero** to the previous owner.

Reward math (MasterChef acc-per-share, emission rates) lives in the custodial lab. This lab only teaches the ownership gate.

## What this is not

- Not a live `get_table_rows` or AtomicAssets API client.
- Not a transfer or `require_auth` implementation.
- Not wasm.
