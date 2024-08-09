import { qS, type QueryLike, isDefined } from "./s";

/**
 * Combines multiple queries using the logical AND operator
 */
export const qAnd = (...queries: (QueryLike | undefined)[]) => {
  const definedQueries = queries.filter(isDefined);
  if (definedQueries.length === 0) {
    return "";
  }
  if (definedQueries.length === 1) {
    return qS(definedQueries[0]);
  }
  return ["(", qS(definedQueries).join(" && "), ")"].join("");
};
