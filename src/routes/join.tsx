import { For } from 'solid-js';
import { BtnGroup } from '~/components/button';
import { Links } from '~/ts/enum';
import { t } from '~/ts/util';

export default function () {
  return (
    <div class="hero-content">
      <h1>{t('join.title')}</h1>
      <p>{t('join.text')}</p>
      <div>
        <h2 class="font-bold text-xl">{t('join.jd.title')}</h2>
        <ol class="pt-2">
          <For
            each={[
              {
                text: t('join.jd.job-1.title'),
                desc: t('join.jd.job-1.text'),
              },
              {
                text: t('join.jd.job-2.title'),
                desc: t('join.jd.job-2.text'),
              },
            ]}
          >
            {(e) => (
              <li class="pt-2">
                <b>{e.text}</b>: {e.desc}
              </li>
            )}
          </For>
        </ol>
      </div>
      <BtnGroup
        items={[
          {
            type: 'link',
            ...Links.QQ,
            text: t('btn:qq-group'),
            class: 'bg-secondary text-secondary-content',
          },
        ]}
      />
    </div>
  );
}
