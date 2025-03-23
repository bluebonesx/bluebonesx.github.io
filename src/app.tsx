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
import { Link } from './components/article';
import { Btn } from './components/button';
import { Icon } from './components/icon';
import { Links } from './ts/enum';
import { hasOwn, locales, setStore, store, t } from './ts/util';
import { map } from './ts/util';
import { navs } from './ts/nav';

function NavToggler() {
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
                    <Link path={e.path}>{e.text}</Link>
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
function NavBtns() {
  return (
    <div class="hidden md:flex">
      <For each={navs}>
        {(e) => (
          <Btn type="dropdown" text={e.text}>
            <For each={e.items}>
              {(e) => (
                <li>
                  <Link path={e.path}>
                    {!e.desc && hasOwn(e, 'icon') && (
                      <Icon class="mr-2" children={e.icon} />
                    )}
                    <section>
                      <h2 class="font-bold">{e.text}</h2>
                      <p>{e.desc}</p>
                    </section>
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
function NavLinks() {
  return (
    <For each={navs}>
      {(e) => (
        <nav>
          <h6 class="footer-title">{e.text}</h6>
          <For each={e.items}>
            {(e) => (
              <A class="link link-hover" href={e.path}>
                {e.text}
              </A>
            )}
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
      <nav class="navbar shadow-md">
        <div class="navbar-start">
          <NavToggler />
          <Btn
            type="link"
            path="/"
            class="font-title text-base-content text-lg md:text-2xl"
            text={t('Bluebones')}
          />
          <NavBtns />
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
            {/*TODO: use store.theme to replace theme controller */}
            <input type="checkbox" class="theme-controller" value="night" />
            <Icon class="swap-on" children={mdiWeatherSunny} />
            <Icon class="swap-off" children={mdiWeatherNight} />
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
      <footer class="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
        <aside>
          <Icon
            class="invert brightness-0"
            size={64}
            children="/icon/favicon.ico"
          />
          <p>©{new Date().getFullYear()} Bluebones Team</p>
          <a href="http://beian.miit.gov.cn/" target="_blank">
            赣ICP备2024021771号
          </a>
        </aside>
        <NavLinks />
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
      `\n都来这了，不考虑加入我们吗？ ${window.location.origin}/join`,
    );
