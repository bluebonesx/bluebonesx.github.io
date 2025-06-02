import { A } from '@solidjs/router';
import { For } from 'solid-js';
import { Btn, BtnGroup } from '~/components/button';
import { Links } from '~/ts/enum';
import { t } from '~/ts/util';

export default function NotFound() {
  return (
    <div class="hero h-screen">
      <div class="hero-content flex-col items-start">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Σ(っ °Д °;)っ: 404</h1>
          <p class="py-6">
            {t('404.text')}
            <A href={Links.QQ.path} class="link">
              {t('btn:qq-group')}
            </A>
          </p>
          <BtnGroup
            items={[
              {
                text: t('btn:previous'),
                class: 'btn-sm',
                onClick: () => window.history.back(),
              },
              {
                type: 'link',
                text: t('btn:home'),
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
                text: t('btn:projects'),
                path: Links.projects.path,
                desc: t('404.link:projects.text'),
              },
              {
                text: t('btn:about'),
                path: Links.about.path,
                desc: t('404.link:about.text'),
              },
              {
                text: t('btn:donate'),
                path: Links.donate.path,
                desc: t('404.link:donate.text'),
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
