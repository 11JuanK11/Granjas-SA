export function removeTypename<T extends object>(obj: T): T {
    const { __typename, ...rest } = obj as any;
    return rest as T;
}
