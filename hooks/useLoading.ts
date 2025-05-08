import { useState } from 'react'

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export function useLoading<T extends string[]>(...keys: T) {
  const state: Record<string, boolean> = {}
  const setters: Record<string, SetState<boolean>> = {}

  keys.forEach(key => {
    const [value, setter] = useState(false)
    state[`${key}Loading`] = value
    setters[`set${capitalize(key)}Loading`] = setter
  })

  return { ...state, ...setters } as {
    [K in T[number] as `${K}Loading`]: boolean
  } & {
    [K in T[number] as `set${Capitalize<K>}Loading`]: SetState<boolean>
  }
}

function capitalize<S extends string>(str: S): Capitalize<S> {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<S>
}
