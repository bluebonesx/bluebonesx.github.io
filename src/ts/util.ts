import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  Signal,
} from 'solid-js';

export function each<T extends LooseObject>(
  obj: T,
  fn: ObjectIterator<T, void>
) {
  Object.keys(obj).forEach((key) => fn(obj[key], key, obj));
}
export function map<T extends LooseObject, R>(
  obj: T,
  fn: ObjectIterator<T, R>
) {
  return Object.keys(obj).map((key) => fn(obj[key], key, obj));
}
/**@example mapValues({a: 1, b: 2, c: 3}, (v) => v * 2) // {a: 2, b: 4, c: 6} */
export function mapValues<T extends LooseObject, R>(
  obj: T,
  fn: ObjectIterator<T, R>
) {
  const result: LooseObject = {};
  each(obj, (v, k, o) => {
    result[k] = fn(v, k, o);
  });
  return result as { [key in keyof T]: R };
}
/**@example groupBy([{a: 1}, {a: 2}, {a: 1}, {a: 3}], 'a') // {1: [{a: 1}, {a: 1}], 2: [{a: 2}], 3: [{a: 3}]} */
export function groupBy<T extends LooseObject, K extends keyof T>(
  arr: T[],
  key: K
): { [P in T[K]]: Extract<T, { [Q in K]: P }>[] };
/**@example groupBy([{a: 1}, {a: 2}, {a: 1}, {a: 3}], (e) => e.a) // {1: [{a: 1}, {a: 1}], 2: [{a: 2}], 3: [{a: 3}]} */
export function groupBy<T extends LooseObject, K extends PropertyKey>(
  arr: T[],
  fn: (e: T) => K
): Record<K, T[]>;
export function groupBy(arr: any[], by: any) {
  const _by = typeof by === 'string' ? (e: any) => e[by] : by;
  const result: LooseObject = {};
  arr.forEach((e) => {
    const key = _by(e);
    (result[key] ??= []).push(e);
  });
  return result;
}
export function mergeStyleProps(...ps: StyleProps[]): NormalizedStyleProps {
  function normalize(p: StyleProps) {
    const _p: NormalizedStyleProps = {};
    if (p.class) {
      _p.class = p.class;
    }
    if (p.classList) {
      _p.class =
        (_p.class ??= '') + map(p.classList, (v, k) => (v ? k : '')).join(' ');
      delete p.classList;
    }
    if (typeof p.style === 'object') {
      _p.style = map(p.style, (v, k) => `${k}:${v}`).join(';');
    }
    return _p;
  }
  const mergeStyle = ps.reduce((acc, p) => {
    const { class: c, style: s } = normalize(p);
    if (c) {
      acc.class = (acc.class ?? '') + c + ' ';
    }
    if (s) {
      acc.style = (acc.style ??= '') + s + ';';
    }
    return acc;
  }, {} as NormalizedStyleProps);
  return Object.assign({}, ...ps.concat(mergeStyle));
}

//hooks
export function useEventListener<K extends keyof WindowEventMap>(
  el: Window,
  name: K,
  listener: (e: WindowEventMap[K]) => void
): void;
export function useEventListener(
  el: EventTarget,
  name: string,
  listener: <T extends Event>(e: T) => void
) {
  import.meta.env.DEV && console.debug('事件监听', name);
  el.addEventListener(name, listener, true);
  onCleanup(() => {
    import.meta.env.DEV && console.debug('事件取消', name);
    el.removeEventListener(name, listener);
  });
}
export function useMatchMedia(query: string) {
  const [matches, setMatches] = createSignal(false);
  onMount(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    //@ts-ignore
    useEventListener(mql, 'change', (e: MediaQueryListEvent) =>
      setMatches(e.matches)
    );
  });
  return matches;
}
export const useBreakpoint = (function () {
  const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 };
  return () => {
    const getters = mapValues(breakpoints, (v, k) => ({
      get() {
        const matches = useMatchMedia(`(min-width: ${v}px)`);
        import.meta.env.DEV &&
          createEffect(() => console.debug('breakpoint', k, matches()));
        return matches;
      },
    }));
    return Object.defineProperties({}, getters) as {
      readonly [K in keyof typeof breakpoints]: () => boolean;
    };
  };
})();
export function useLocalStorage<T>(key: string, defaultValue: T): Signal<T> {
  const v = localStorage.getItem(key);
  const [value, setValue] = createSignal<T>(v ? JSON.parse(v) : defaultValue);
  createEffect(() => {
    localStorage.setItem(key, JSON.stringify(value()));
  });
  return [value, setValue];
}
