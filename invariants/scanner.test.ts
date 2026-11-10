import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  registerStake,
  ownerMatches,
  assertClaimable,
  settleStale,
  MAX_WEIGHT,
  MAX_ASSET_ID,
} from "./scanner.ts";

describe("registerStake", () => {
  it("stores asset, owner, weight without custody", () => {
    const row = registerStake(42n, "alice", 10n);
    assert.equal(row.assetId, 42n);
    assert.equal(row.owner, "alice");
    assert.equal(row.weight, 10n);
  });

  it("refuses zero and over-cap weight", () => {
    assert.throws(() => registerStake(1n, "alice", 0n), /positive/);
    assert.throws(() => registerStake(1n, "alice", MAX_WEIGHT + 1n), /MAX_WEIGHT/);
  });

  it("refuses non-positive asset id and bad name", () => {
    assert.throws(() => registerStake(0n, "alice", 1n), /positive/);
    assert.throws(() => registerStake(MAX_ASSET_ID + 1n, "alice", 1n), /uint64/);
    assert.throws(() => registerStake(1n, "Alice", 1n), /bad account/);
  });
});

describe("ownerMatches / assertClaimable", () => {
  const row = registerStake(7n, "alice", 5n);

  it("matches when chain owner is still the staker", () => {
    assert.equal(ownerMatches(row, { assetId: 7n, owner: "alice" }), true);
    assert.equal(assertClaimable(row, { assetId: 7n, owner: "alice" }), 5n);
  });

  it("claim refuses after the NFT moved", () => {
    assert.equal(ownerMatches(row, { assetId: 7n, owner: "bob" }), false);
    assert.throws(
      () => assertClaimable(row, { assetId: 7n, owner: "bob" }),
      /settle stale/,
    );
  });

  it("refuses wrong asset id on the chain snapshot", () => {
    assert.throws(
      () => ownerMatches(row, { assetId: 8n, owner: "alice" }),
      /asset id mismatch/,
    );
  });
});

describe("settleStale", () => {
  const row = registerStake(7n, "alice", 5n);

  it("clears with zero reward when owner changed", () => {
    const out = settleStale(row, { assetId: 7n, owner: "bob" });
    assert.equal(out.cleared, true);
    assert.equal(out.reward, 0n);
    assert.equal(out.previousOwner, "alice");
  });

  it("refuses settle while owner still matches", () => {
    assert.throws(
      () => settleStale(row, { assetId: 7n, owner: "alice" }),
      /use claim not settle/,
    );
  });

  it("refuses asset id mismatch", () => {
    assert.throws(
      () => settleStale(row, { assetId: 9n, owner: "bob" }),
      /asset id mismatch/,
    );
  });
});
