import { createSignal } from 'solid-js';
import { Links } from './enum';
import { t } from './util';

async function getRepos() {
  return import.meta.env.DEV
    ? Array.from({ length: 3 }).map((_, i) => ({
        text: `Project ${i + 1}`,
        desc: `This is the description of project ${i + 1}`,
        path: `https://example.com/project-${i + 1}`,
      }))
    : (
        (await (
          await fetch('https://api.github.com/orgs/bluebones-team/repos')
        ).json()) as any[]
      )
        .filter((e) => e.description && !e.private)
        .toSorted((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
        .map((e) => ({
          text: e.name + (e.archived ? '(Archived)' : ''),
          desc: e.description,
          path: e.html_url,
          // stars: e.stargazers_count,
        }));
}
const [repos, setRepos] = createSignal<Awaited<ReturnType<typeof getRepos>>>(
  [],
);
getRepos().then(setRepos, console.error);
export const navs = [
  {
    get text() {
      return t('Projects');
    },
    get items() {
      return repos();
    },
  },
  {
    get text() {
      return t('About');
    },
    items: [Links.about, Links.join, Links.donate],
  },
  {
    get text() {
      return t('Contact');
    },
    items: [Links.QQ, Links.GitHub, Links.xiaohongshu],
  },
];
