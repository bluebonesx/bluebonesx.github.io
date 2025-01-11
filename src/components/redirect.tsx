import { onMount } from 'solid-js';

export const Redirect = function (p: {
  href: string | ((e: Location) => string);
}) {
  onMount(() => {
    location.href = typeof p.href === 'string' ? p.href : p.href(location);
  });
  return null;
};
