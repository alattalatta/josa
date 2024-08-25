import { getLastChar } from './getLastChar'

const ppMap: readonly [string, readonly [string, string]][] = [
  ['(은)는', ['은', '는']],
  ['(이)가', ['이', '가']],
  ['(을)를', ['을', '를']],
  ['(과)와', ['과', '와']],
  ['(으)로', ['으로', '로']],
  ['(이)여', ['이어', '여']],
  ['(이)', ['이', '']],
  ['(아)야', ['아', '야']],
]
const foreignCharsRecord: Readonly<Record<string, number>> = {
  0: 1,
  1: 8,
  3: 1,
  6: 1,
  7: 8,
  8: 8,
  b: 1,
  c: 1,
  g: 1,
  k: 1,
  l: 8,
  m: 1,
  n: 1,
  p: 1,
}

const hasNoCoda = (char: string, ignore_ㄹ: boolean): boolean => {
  let coda = char >= '가' && char <= '힣' ? (char.charCodeAt(0) - 16) % 28 : foreignCharsRecord[char]
  return !coda || (ignore_ㄹ && coda == 8)
}

/**
 * Returns a proper postposition from given `tokenString` based on the `testString`.
 *
 * Note that `resolve()` does not support decomposed (NFD) Hangul characters.
 * Use [`testString.normalize('NFC')`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) if you need to.
 *
 * @param tokenString A string starting with one of supported Korean postposition tokens. `(은)는`, `(이)가`, `(을)를`, `(과)와`, `(으)로`, `(이)여`, `(이)`, and `(아)야` are available.
 * @param testString A string to resolve the token against.
 * @returns A tuple containing: The token extracted and a resolved postposition. Returns `null` if the token is not one of the supported ones.
 * @example
 * resolve('(은)는', '사과')
 * // ['(은)는', '는']
 *
 * resolve('(이)야말로', '공급관')
 * // ['(이)', '이']
 * resolve('(이)야말로', '공급자')
 * // ['(이)', '']
 */
const resolve = (tokenString: string, testString: string): readonly [token: string, postposition: string] | null => {
  let foundPair = ppMap.find((pair) => tokenString.startsWith(pair[0]))
  return foundPair ? [foundPair[0], foundPair[1][+hasNoCoda(getLastChar(testString), foundPair[0] == '(으)로')]] : null
}

export { resolve }
