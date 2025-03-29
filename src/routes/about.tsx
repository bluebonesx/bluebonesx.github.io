import { A } from '@solidjs/router';
import { For, Index, createMemo } from 'solid-js';
import { Article, H, Link, List } from '~/components/article';
import { Btn } from '~/components/button';
import { MultiLines } from '~/components/multi-lines';
import { Links } from '~/ts/enum';
import { t, useBreakpoint } from '~/ts/util';

export default function About() {
  const { md } = useBreakpoint();
  const size = createMemo(() => (md() ? 50 : 100));
  const members = createMemo(() =>
    t('about.member.text')!
      .split(',')
      .map((mbr) => {
        const [name, ghID, link, bg, content] = mbr.split("'");
        return {
          name,
          avatar: `https://avatars.githubusercontent.com/u/${ghID}?v=4&size=${size()}`,
          link,
          bg,
          content,
        };
      }),
  );

  return (
    <Article>
      <H level={2}>{t('about.member.title')}</H>
      <div class="mx-auto gap-6 max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <For each={members()}>
          {(p) => (
            <div class="card card-sm bg-base-200 text-start">
              <div class="card-body gap-4">
                <div class="flex items-center gap-3">
                  <Btn type="link" path={p.link} class="btn-circle avatar">
                    <div class="rounded-full">
                      <img class="not-prose" src={p.avatar} />
                    </div>
                  </Btn>
                  <div class="flex flex-col items-start">
                    <div class="text-base-content font-bold text-sm">
                      {p.name}
                    </div>
                    <div class="text-base-content/70 text-xs">
                      <MultiLines text={p.bg} />
                    </div>
                  </div>
                </div>
                <div class="text-base-content text-xs">{p.content}</div>
              </div>
            </div>
          )}
        </For>
      </div>
    </Article>
  );
}
