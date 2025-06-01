import { For } from 'solid-js';
import { Block, Head, Para } from '~/components/block';
import { MultiLines } from '~/components/multi-lines';
import { t } from '~/ts/util';

export default function Donate() {
  return (
    <div>
      <Block class="2xl:mx-60">
        <Head>{t('join.title')}</Head>
        <Para>
          <MultiLines text={t('join.text')} />
        </Para>
        <Para>
          <h2>{t('join.jd.title')}</h2>
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
                  <strong>{e.text}</strong>: {e.desc}
                </li>
              )}
            </For>
          </ol>
        </Para>
      </Block>
    </div>
  );
}
