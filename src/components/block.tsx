import { For, ParentProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { Btn } from './button';

export function Head(p: ParentProps) {
  return (
    <h1 class="text-5xl text-center md:text-left font-bold leading-tight pb-6">
      {p.children}
    </h1>
  );
}
export function Para(p: ParentProps) {
  return <div class="pb-6">{p.children}</div>;
}
export function Actions(p: { items: Props<typeof Btn>[] }) {
  return (
    <div class="flex justify-center md:justify-start">
      <For each={p.items}>
        {(e) => (
          <Btn
            {...e}
            class={twMerge(
              'first:bg-primary first:text-primary-content first:ml-0 ml-3',
              e.class,
            )}
          />
        )}
      </For>
    </div>
  );
}
export function Block(p: ParentProps<{ class?: string }>) {
  return (
    <div
      class={[
        'h-screen first:h-[calc(100vh-4rem)]',
        'py-12 px-5 sm:px-20',
        'flex flex-col justify-center',
        p.class ?? '',
      ].join(' ')}
      children={p.children}
    />
  );
}
