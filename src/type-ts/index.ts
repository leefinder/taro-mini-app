export type SkeletonNode = {
    key: string | number,
    type: string,
    nodeList: { cssText: string, key: string | number }[]
}

export type SkeletonType = {
    container: string,
    lists: SkeletonNode[]
}