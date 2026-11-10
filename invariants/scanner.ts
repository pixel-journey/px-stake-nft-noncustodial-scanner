/**
 * Non-custodial NFT stake scanner (educational).
 * NFT stays in the wallet. Contract only stores a stake row.
 * Claims require a chain-sourced owner that still matches the row.
 * If the NFT moved, settle clears the stale row with zero reward.
 */

export const MAX_WEIGHT = 1_000_000n;
export const MAX_ASSET_ID = 0xffff_ffff_ffff_ffffn; // uint64

export type StakeRow = {
  assetId: bigint;
  owner: string;
  weight: bigint;
};

/** Chain-sourced ownership snapshot for one asset. Not a live RPC. */
export type ChainAsset = {
  assetId: bigint;
  owner: string;
};

const NAME = /^[a-z1-5.]{1,12}$/;

export function assertName(name: string): string {
  if (!NAME.test(name) || name.startsWith(".") || name.endsWith(".")) {
    throw new Error("bad account name");
  }
  return name;
}

export function assertAssetId(assetId: bigint): bigint {
  if (typeof assetId !== "bigint") throw new Error("assetId must be bigint");
  if (assetId < 1n) throw new Error("assetId must be positive");
  if (assetId > MAX_ASSET_ID) throw new Error("assetId exceeds uint64");
  return assetId;
}

export function assertWeight(weight: bigint): bigint {
  if (typeof weight !== "bigint") throw new Error("weight must be bigint");
  if (weight < 1n) throw new Error("weight must be positive");
  if (weight > MAX_WEIGHT) throw new Error("weight exceeds MAX_WEIGHT");
  return weight;
}

/**
 * Open a stake row. Does not transfer an NFT.
 * Caller is the registered owner at registration time.
 */
export function registerStake(
  assetId: bigint,
  owner: string,
  weight: bigint
): StakeRow {
  assertAssetId(assetId);
  assertName(owner);
  assertWeight(weight);
  return { assetId, owner, weight };
}

/** True when the chain-sourced owner still matches the stake row. */
export function ownerMatches(row: StakeRow, chain: ChainAsset): boolean {
  assertAssetId(chain.assetId);
  assertName(chain.owner);
  if (chain.assetId !== row.assetId) throw new Error("asset id mismatch");
  return chain.owner === row.owner;
}

/**
 * Claim path gate: chain owner must still be the staker.
 * Returns the weight used for reward math (caller supplies reward formula).
 * Does not move the NFT. Does not pay tokens.
 */
export function assertClaimable(row: StakeRow, chain: ChainAsset): bigint {
  if (!ownerMatches(row, chain)) {
    throw new Error("owner changed; settle stale row");
  }
  return row.weight;
}

/**
 * After a sale or transfer, the row is stale.
 * Clears the row. Reward to the old owner is always 0.
 * New owner (or anyone with the chain snapshot) may settle.
 */
export function settleStale(
  row: StakeRow,
  chain: ChainAsset
): { cleared: true; reward: 0n; previousOwner: string } {
  assertAssetId(chain.assetId);
  assertName(chain.owner);
  if (chain.assetId !== row.assetId) throw new Error("asset id mismatch");
  if (chain.owner === row.owner) {
    throw new Error("owner still matches; use claim not settle");
  }
  return { cleared: true, reward: 0n, previousOwner: row.owner };
}
