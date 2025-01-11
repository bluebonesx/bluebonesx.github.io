import {
  mdiHeart,
  mdiMenu,
  mdiWeatherNight,
  mdiWhiteBalanceSunny,
} from '@mdi/js';
import {
  A,
  HashRouter,
  RouteDefinition,
  RouteSectionProps,
} from '@solidjs/router';
import { For, JSX, lazy, Suspense } from 'solid-js';
import { Link } from './components/article';
import { Btn } from './components/button';
import { Icon } from './components/icon';
import { Nav } from './ts/enum';
import { groupBy, map, useMatchMedia } from './ts/util';

function Menu(p: {
  items?: {
    text: string | JSX.Element;
    path?: string;
    onClick?: (e: MouseEvent) => void;
  }[];
}) {
  return (
    <ul class="dropdown-content menu bg-base-200 rounded-box shadow w-max">
      <For each={p.items}>
        {(e) => (
          <li>
            <Link path={e.path}>{e.text}</Link>
          </li>
        )}
      </For>
    </ul>
  );
}
function Panel(p: { text: string; desc: string }) {
  return (
    <section>
      <h2 class="font-bold">{p.text}</h2>
      <p>{p.desc}</p>
    </section>
  );
}
function NavBtn(p: {
  text: string;
  items: { text: string; desc?: string; path: string }[];
}) {
  return (
    <div class="dropdown">
      <Btn {...p}></Btn>
      <Menu
        items={p.items.map(({ text, desc, path }) => ({
          text: <Panel {...{ text, desc: desc ?? '' }}></Panel>,
          path,
        }))}
      ></Menu>
    </div>
  );
}
const MiniNavBtn = () => (
  <div class="dropdown md:hidden">
    <Btn class="btn-square no-space">
      <Icon>{mdiMenu}</Icon>
    </Btn>
    <ul class="dropdown-content menu bg-base-200 rounded-box shadow w-max">
      <For each={navGroups}>
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
    </ul>
  </div>
);
function ThemeBtn() {
  const isDark = useMatchMedia('(prefers-color-scheme: dark)');
  return (
    <Btn class="btn-square no-space">
      <label class="swap swap-rotate">
        <input
          type="checkbox"
          class="theme-controller"
          value="sunset"
          checked={isDark()}
        />
        <Icon class="swap-off">{mdiWhiteBalanceSunny}</Icon>
        <Icon class="swap-on">{mdiWeatherNight}</Icon>
      </label>
    </Btn>
  );
}

const navGroups = map(
  groupBy(
    Nav.items.filter((e) => e.group),
    'group'
  ),
  (items, text) => ({ text, items })
);
function Topbar() {
  const bigBtn = Nav['KnowUs:Donate'];
  return (
    <>
      <div class="navbar-start">
        <MiniNavBtn />
        <A
          href="/"
          class="btn btn-ghost font-title text-base-content text-lg md:text-2xl"
        >
          蓝骨头
        </A>
        <div class="hidden md:flex">
          <For each={navGroups}>{NavBtn}</For>
        </div>
      </div>
      <div class="navbar-end">
        <Btn path={bigBtn.path}>
          <Icon class="fill-red-500">{mdiHeart}</Icon>
          {bigBtn.text}
        </Btn>
        <ThemeBtn />
        {/* <div class='dropdown dropdown-end'>
                    <Btn class='btn-square' icon={mdiTranslate}></Btn>
                    <Menu items={[{ text: '简体中文' }]}></Menu>
                </div> */}
        {/* <div class="dropdown dropdown-hover dropdown-end mr-2">
          <Btn
            class="btn-circle avatar"
            path="/user"
            img="https://picsum.photos/1"
          ></Btn>
          {import.meta.env.DEV && (
            <Menu
              items={[
                { text: '个人资料' },
                { text: '设置' },
                { text: '退出登录' },
              ]}
            ></Menu>
          )}
        </div> */}
      </div>
    </>
  );
}
function Footer() {
  return (
    <footer class="flex-1 footer footer bg-neutral text-neutral-content p-10">
      <aside>
        这里有个 SVG
        <p>
          ©{new Date().getFullYear()}
          <A href={Nav['KnowUs:About'].path}> Bluebones Team</A>
        </p>
        <a href="http://beian.miit.gov.cn/" target="_blank">
          赣ICP备2024021771号
        </a>
      </aside>
      <For each={navGroups}>
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
    </footer>
  );
}
function App(p: RouteSectionProps) {
  return (
    <div class="flex flex-col h-screen">
      <nav class="flex-none navbar bg-base-100 shadow-md p-0 md:px-8 z-[1]">
        <Topbar />
      </nav>
      <main class="flex-1">
        <Suspense fallback={<p>Loading...</p>} children={p.children} />
        <Footer />
      </main>
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
  })
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
      `\n都来这了，不考虑加入我们吗？ ${window.location.origin}/join`
    );
