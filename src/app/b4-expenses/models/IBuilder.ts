export type IBuilder<T> = {
  [k in keyof T]: (arg: T[k]) => IBuilder<T>
} & { build(): T };

