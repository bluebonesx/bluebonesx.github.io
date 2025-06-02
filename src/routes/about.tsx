import { For, createMemo } from 'solid-js';
import { Btn } from '~/components/button';
import { t, useBreakpoint } from '~/ts/util';

export default function () {
  const { md } = useBreakpoint();
  const size = createMemo(() => (md() ? 50 : 100));
  const members = createMemo(() =>
    t('about.member.text')!
      .split('||')
      .map((mbr) => {
        const [name, ghID, link, bg, content] = mbr.split('|');
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
    <article class="min-h-screen">
      <h2>{t('about.member.title')}</h2>
      <div class="mx-auto gap-6 flex flex-wrap justify-center">
        <For each={members()}>
          {(p) => (
            <div class="card card-sm bg-base-200 text-start w-max">
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
                    <div class="text-base-content/70 text-xs">{p.bg}</div>
                  </div>
                </div>
                <div class="text-base-content text-xs">{p.content}</div>
              </div>
            </div>
          )}
        </For>
      </div>
    </article>
  );
}
