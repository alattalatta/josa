// str is guaranteed to be non-empty so this won't throw
const getLastChar = (str: string): string => (str = str.replace(/'|"|\([^)]*\)/g, ''))[str.length - 1]

export { getLastChar }
