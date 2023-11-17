type AI = 'openai' | 'claude' | 'bard' | 'azure'

type TupleToObject<T extends any[]> = {
  [P in keyof T]: T[P]
}
