import { qS, type QueryLike, isDefined } from "./s";

/**
 * Filters documents by type
 */
export const qType = (type: QueryLike) => {
  if (!isDefined(type)) {
    return "";
  }
  return `_type == '${qS(type)}'`;
};
