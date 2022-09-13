/* eslint-disable @typescript-eslint/ban-ts-comment,prefer-const,jest/valid-describe-callback,jest/no-focused-tests,jest/no-disabled-tests,jest/no-export */
import {describe, it} from "@jest/globals";
import type {Global} from "@jest/types/build";

let _given: Global.Describe;
// @ts-ignore
_given = (blockName: BlockName, blockFn: BlockFn): void => describe(`given ${blockName}`, blockFn);
// @ts-ignore
_given.only = (blockName: BlockName, blockFn: BlockFn): void => describe.only(`given ${blockName}`, blockFn);
// @ts-ignore
_given.skip = (blockName: BlockName, blockFn: BlockFn): void => describe.skip(`given ${blockName}`, blockFn);
export const given = _given;

let _when: Global.Describe;
// @ts-ignore
_when = (blockName: BlockName, blockFn: BlockFn): void => describe(`when ${blockName}`, blockFn);
// @ts-ignore
_when.only = (blockName: BlockName, blockFn: BlockFn): void => describe.only(`when ${blockName}`, blockFn);
// @ts-ignore
_when.skip = (blockName: BlockName, blockFn: BlockFn): void => describe.skip(`when ${blockName}`, blockFn);
export const when = _when;

let _then: Global.ItConcurrent;
// @ts-ignore
_then = (blockName: BlockName, blockFn: BlockFn): void => it(`then ${blockName}`, blockFn);
// @ts-ignore
_then.only = (blockName: BlockName, blockFn: BlockFn): void => it.only(`then ${blockName}`, blockFn);
// @ts-ignore
_then.skip = (blockName: BlockName, blockFn: BlockFn): void => it.skip(`then ${blockName}`, blockFn);
export const then = _then;
