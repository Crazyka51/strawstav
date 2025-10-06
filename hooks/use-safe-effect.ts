"use client"

import { useEffect, type DependencyList, type EffectCallback } from 'react'

/**
 * Bezpečný useEffect hook, který se vykoná pouze na klientské straně
 * Pomáhá vyhnout se chybám hydratace v Next.js
 * @param effect - Callback funkce, která se má vykonat
 * @param deps - Pole závislostí
 */
export function useSafeEffect(effect: EffectCallback, deps?: DependencyList): void {
  useEffect(() => {
    // Zkontrolujeme, zda jsme na klientské straně (v prohlížeči)
    if (typeof window !== 'undefined') {
      return effect()
    }
    // Pokud jsme na serveru, nevykonáme nic
    return undefined
  }, deps)
}

/**
 * Bezpečný useLayoutEffect hook, který se vykoná pouze na klientské straně
 * Pomáhá vyhnout se chybám hydratace v Next.js
 * @param effect - Callback funkce, která se má vykonat
 * @param deps - Pole závislostí
 */
export function useSafeLayoutEffect(effect: EffectCallback, deps?: DependencyList): void {
  // Na serveru použijeme useEffect místo useLayoutEffect,
  // abychom se vyhnuli varování v React 19
  useEffect(() => {
    if (typeof window !== 'undefined') {
      return effect()
    }
    return undefined
  }, deps)
}