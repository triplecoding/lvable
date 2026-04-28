export function normalizeDoc<T extends Record<string, unknown>>(doc: T) {
  const { _id, ...rest } = doc as T & { _id?: unknown };
  return {
    ...rest,
    id: String(_id || '')
  };
}
