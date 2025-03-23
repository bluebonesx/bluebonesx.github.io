import { createEffect, mergeProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

export const Icon = function (p: {
  class?: string;
  size?: number;
  children: string;
}) {
  const props = mergeProps({ class: '', size: 24 }, p);
  createEffect(() => {
    const r = props.size % 4;
    if (r !== 0) {
      console.warn('Icon size should be a multiple of 4');
      props.size = props.size - r;
    }
  });
  return /^(http|\/)/.test(props.children) ? (
    <img
      src={props.children}
      class={twMerge(`w-${props.size / 4} h-${props.size / 4}`, props.class)}
    />
  ) : (
    <svg
      class={twMerge('fill-current', props.class)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
    >
      <path d={props.children}></path>
    </svg>
  );
};
