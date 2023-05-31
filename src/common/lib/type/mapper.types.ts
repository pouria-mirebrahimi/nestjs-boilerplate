export type MappedWithEntity<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? MappedWithEntity<U>[]
    : T[P] extends object
    ? MappedWithEntity<T[P]>
    : T[P];
};
