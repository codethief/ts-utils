import { objectFromEntries } from "./objectFromEntries";

/**
 * Union type representing the type of an arbitrary key-value pair in a given
 * object type.
 */
type KeyValueType<TObj> = {
  [K in keyof TObj]: { key: K; value: TObj[K] };
}[keyof TObj];

/**
 * Like Array.prototype.map() but for objects, i.e. applies `mapper` to every
 * key-value pair and builds a new object from the returned values.
 *
 * @param obj Object to be mapped
 * @param keys The keys that should be mapped. We need a precise list, because
 * functions like Object.keys(obj) or Object.entries(keys) might return
 * additional keys not included in TObject/TKey.
 * @param mapper Callback function which maps each (key, value) pair to a new
 * value.
 * @returns An object with the same keys as `obj` but with the values given by
 * `mapper()`. The return type should be equivalent to `{ [K in TKey]: TNewValue }`
 * but for some reason TSC doesn't think so. (Bug?)
 */
export const objectMap = <TObj extends unknown, TKey extends keyof TObj, TNewValue extends unknown>(
  obj: Readonly<TObj>,
  keys: TKey[],
  mapper: (keyValuePair: KeyValueType<Pick<TObj, TKey>>) => TNewValue
): { [K in readonly [TKey, TNewValue] as K[0]]: K[1] } => {
  const keyValuePairs = keys.map((key) => [key, mapper({ key, value: obj[key] })] as const);
  return objectFromEntries(keyValuePairs);
};
