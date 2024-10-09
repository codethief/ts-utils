/**
 * Type-safe version of Object.fromEntries(). Like the latter, it creates an
 * object from the provided list of key-value pairs.
 */
export const objectFromEntries = <
  const KVPairs extends ReadonlyArray<readonly [PropertyKey, unknown]>,
>(
  keyValuePairs: KVPairs
): { [K in KVPairs[number] as K[0]]: K[1] } => {
  return Object.fromEntries(keyValuePairs) as { [K in KVPairs[number] as K[0]]: K[1] };
};
