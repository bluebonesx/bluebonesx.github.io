import { A } from '@solidjs/router';
import { For } from 'solid-js';
import { Actions } from '~/components/block';
import { Btn } from '~/components/button';
import { Links } from '~/ts/enum';
import { t } from '~/ts/util';

export default function NotFound() {
  return (
    <div class="hero h-[calc(100vh-4rem)]">
      <div class="hero-content flex-col items-start">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Σ(っ °Д °;)っ: 404</h1>
          <p class="py-6">
            {t("This page haven't been written yet...")}
            <br />
            {t('But you can track the newest infomation by ')}
            <br />
            <A href={Links.QQ.path} class="link">
              {t('JOINING COMMUNITY GROUP')}
            </A>
          </p>
          <Actions
            items={[
              {
                text: t('Previous'),
                class: 'btn-sm',
                //TODO: use router.back()
                onClick: () => window.history.back(),
              },
              {
                type: 'link',
                text: t('Home'),
                class: 'btn-sm btn-outline',
                path: '/',
              },
            ]}
          />
        </div>
        <div class="divider divider-neutral"></div>
        <ol>
          <For
            each={[
              {
                text: t('Projects'),
                path: Links.projects.path,
                desc: t('make your work more efficient'),
              },
              {
                text: t('About'),
                path: Links.about.path,
                desc: t('a non-profit team originally led by students'),
              },
              {
                text: t('Donate'),
                path: Links.donate.path,
                desc: t(
                  'to promote the reform of brain science research workflow',
                ),
              },
            ]}
          >
            {(e) => (
              <li>
                <Btn
                  type="link"
                  path={e.path}
                  text={e.text}
                  class="btn-lg h-10"
                />
                {e.desc}
              </li>
            )}
          </For>
        </ol>
      </div>
    </div>
  );
}
