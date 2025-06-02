import {
  mdiMenu,
  mdiTranslate,
  mdiWeatherNight,
  mdiWeatherSunny,
} from '@mdi/js';
import {
  A,
  HashRouter,
  RouteDefinition,
  RouteSectionProps,
  useLocation,
} from '@solidjs/router';
import { createEffect, For, lazy, Suspense } from 'solid-js';
import { Btn, Link } from './components/button';
import { Icon } from './components/icon';
import { Links } from './ts/enum';
import { hasOwn, locales, setStore, store, t } from './ts/util';
import { map } from './ts/util';
import { navs } from './ts/nav';

function MiniNav() {
  return (
    <Btn
      type="dropdown"
      dropdownClass="md:hidden"
      class="btn-square"
      icon={mdiMenu}
    >
      <For each={navs}>
        {(e) => (
          <li>
            <strong>{e.text}</strong>
            <ul>
              <For each={e.items}>
                {(e) => (
                  <li>
                    <Link
                      class="no-underline"
                      path={e.path}
                      children={e.text}
                    />
                  </li>
                )}
              </For>
            </ul>
          </li>
        )}
      </For>
    </Btn>
  );
}
function TopNav() {
  return (
    <div class="hidden md:flex">
      <For each={navs}>
        {(e) => (
          <Btn type="dropdown" text={e.text}>
            <For each={e.items}>
              {(e) => (
                <li>
                  <Link class="no-underline justify-between" path={e.path}>
                    <section>
                      <h2 class="font-bold">{e.text}</h2>
                      <p>{e.desc}</p>
                    </section>
                    {!e.desc && hasOwn(e, 'icon') && (
                      <Icon class="mr-2" children={e.icon} />
                    )}
                  </Link>
                </li>
              )}
            </For>
          </Btn>
        )}
      </For>
    </div>
  );
}
function FooterNav() {
  return (
    <For each={navs}>
      {(e) => (
        <nav class="">
          <h6 class="footer-title">{e.text}</h6>
          <For each={e.items}>
            {(e) => <Link class="link-hover" path={e.path} children={e.text} />}
          </For>
        </nav>
      )}
    </For>
  );
}
function App(p: RouteSectionProps) {
  const location = useLocation();
  createEffect(() => {
    location.pathname;
    window.scroll(0, 0);
  });
  return (
    <div class="flex flex-col h-screen">
      <nav class="navbar absolute z-1">
        <div class="navbar-start">
          <MiniNav />
          <Btn
            type="link"
            path="/"
            class="font-title text-lg md:text-2xl"
            text={t('logo:bluebones')}
          />
          <TopNav />
        </div>
        <div class="navbar-end">
          <Btn type="link" path={Links.donate.path}>
            <Icon class="fill-red-500" children={Links.donate.icon} />
            {Links.donate.text}
          </Btn>
          <Btn
            type="link"
            path={Links.GitHub.path}
            class="btn-square max-sm:hidden"
            icon={Links.GitHub.icon}
          />
          <Btn type="swap" class="btn-square">
            <input
              type="checkbox"
              class="theme-controller"
              value="nord"
              checked={store.theme === 'nord'}
            />
            <Icon class="swap-off" children={mdiWeatherSunny} />
            <Icon class="swap-on" children={mdiWeatherNight} />
          </Btn>
          <Btn
            type="dropdown"
            dropdownClass="dropdown-end"
            class="btn-square"
            icon={mdiTranslate}
          >
            <For each={locales}>
              {(meta) => (
                <li>
                  <a
                    class={meta.locale === store.locale ? 'menu-focus' : ''}
                    on:click={() => setStore('locale', meta.locale)}
                  >
                    {meta.name}
                  </a>
                </li>
              )}
            </For>
          </Btn>
        </div>
      </nav>
      <main class="flex-1">
        <Suspense fallback={<p>Loading...</p>} children={p.children} />
      </main>
      <footer class="footer footer-horizontal sm:footer-vertical footer-center bg-neutral text-neutral-content p-10">
        <FooterNav />
        <aside>
          <Icon
            class="invert brightness-0"
            size={48}
            children="/icon/favicon.ico"
          />
          <p>© {new Date().getFullYear()} Bluebones Team</p>
        </aside>
      </footer>
    </div>
  );
}

const routes: RouteDefinition[] = map(
  import.meta.glob('./routes/*.tsx'),
  (mod, k) => ({
    path: k.replace(/^\.\/routes\/(.*)\.tsx$/, (_, name: string) => {
      const matches = name.match(/^\[\.\.\.(.*)\]$/);
      return matches ? '*' + matches[1] : name === 'index' ? '' : name;
    }),
    //@ts-ignore
    component: lazy(mod),
  }),
);
export default () => <HashRouter root={App} children={routes} />;

import.meta.env.DEV
  ? console.log('routes', routes)
  : console.log(
      `%c
           *=+++==#
         %+=+++=+%
        #==++==*
      #+=+++=+%
  %*++==+++=+
 #====+++==+
 %+++*++=+++     %##++%
      +==*#+    %+%++=+ %%
      %+***%    #++=++++===*
               %+==++++====+
              %+=+++===+++#
             #==++==*#
            +=+++=+%
          #+=++==*
         *=+++++%
`,
      'color:#03a9f4;',
      `\n都来这了，不考虑加入吗？ ${window.location.origin}/join`,
    );
