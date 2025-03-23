import { createMemo, JSX } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { Link } from './article';
import { Icon } from './icon';

type CommonProps = {
  class: string;
  text: string;
  icon: string;
  onClick: (e: MouseEvent) => void;
  children: JSX.Element;
};
export function Btn<
  T extends 'button' | 'link' | 'swap' | 'dropdown' = 'button',
>(
  p: Partial<
    {
      type: T;
      path: T extends 'link' ? string : never;
      dropdownClass: T extends 'dropdown' ? string : never;
    } & CommonProps
  >,
) {
  const shared = createMemo(() => ({
    class: twMerge('btn btn-ghost', p.class),
    onClick: p.onClick,
  }));
  const children = () => [p.icon && <Icon children={p.icon} />, p.text];
  if (!p.type || p.type === 'button') {
    return <button {...{ ...shared(), children: p.children ?? children() }} />;
  }
  if (p.type === 'link') {
    return (
      <Link
        {...{
          ...shared(),
          children: p.children ?? children(),
          path: p.path ?? '404',
        }}
      />
    );
  }
  if (p.type === 'swap') {
    return (
      <label
        {...{
          ...shared(),
          class: twMerge('swap', shared().class),
          children: p.children,
        }}
      />
    );
  }
  if (p.type === 'dropdown') {
    return (
      <div class={twMerge('dropdown', p.dropdownClass)}>
        <button
          tabindex="0"
          {...{
            ...shared(),
            children: children(),
          }}
        />
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-200 rounded-box shadow-sm w-max"
          children={p.children}
        />
      </div>
    );
  }
  return `unsupported button type: ${p.type}`;
}
