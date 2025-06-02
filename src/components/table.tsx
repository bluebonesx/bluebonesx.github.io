import { createMemo, For } from 'solid-js';
import { twMerge } from 'tailwind-merge';

function stringfy(value: unknown): string {
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value);
  }
  return '' + value;
}
export const Table = function <T extends Record<string, unknown>>(p: {
  class?: string;
  items: T[];
}) {
  const keys = createMemo(() => Object.keys(p.items[0]));
  return (
    <table class={twMerge('table table-pin-rows', p.class)}>
      <thead>
        <tr>
          {keys().map((k) => (
            <th>{k}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <For each={p.items}>
          {(item) => (
            <tr>
              {keys().map((k) => (
                <td>{stringfy(item[k])}</td>
              ))}
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
