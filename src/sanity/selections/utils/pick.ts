import type { Selection } from "groqd";

export const pick = <S extends Selection, P extends (keyof S)[]>(
  selection: S,
  fields: P,
) => {
  return fields.reduce(
    (acc, key) => {
      acc[key] = selection[key];
      return acc;
    },
    {} as Pick<S, P[number]>,
  );
};
