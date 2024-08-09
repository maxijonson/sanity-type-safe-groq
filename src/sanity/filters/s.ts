import type { BaseQuery } from "groqd";

export type QueryLike = BaseQuery<any> | string | number | boolean;

export type Defined<T> = Exclude<T, undefined | null | "">;
export const isDefined = <T>(value: T): value is Defined<T> =>
  value !== undefined && value !== null && value !== "";

/**
 * Converts a primitive or a subquery to a string or an array of strings
 *
 * @param value A QueryLike or an array of QueryLike values
 * @returns A string or an array of strings
 */
export const qS = <
  T extends QueryLike | QueryLike[],
  R = T extends QueryLike[] ? string[] : string,
>(
  value: T
): R => {
  if (Array.isArray(value)) {
    return value.map((v) => qS(v)).filter(isDefined) as R;
  }
  if (typeof value === "string") return value as R;
  if (typeof value === "number") return `${value}` as R;
  if (typeof value === "boolean") return `${value}` as R;
  return value.query as R;
};
