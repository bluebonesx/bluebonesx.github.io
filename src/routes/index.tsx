import { createSignal } from 'solid-js';
import { BtnGroup, Link } from '~/components/button';
import { Links } from '~/ts/enum';
import { t, useEventListener } from '~/ts/util';

export default function () {
  const defaultOffset = { x: 0, y: 0 };
  const [offset, setOffset] = createSignal(defaultOffset);
  useEventListener(window, 'pointermove', (e) => {
    setOffset({
      x: Math.floor(e.clientX / 100),
      y: Math.floor(e.clientY / 100),
    });
  });
  useEventListener(window, 'resize', (e) => {
    setOffset(defaultOffset);
  });
  return (
    <div>
      <div
        class="hero bg-[url('/icon/favicon.ico')] bg-no-repeat bg-contain"
        style={{
          'background-position-x': `calc(100% + ${offset().x}px)`,
          'background-position-y': `calc(50% + ${offset().y}px)`,
        }}
      >
        <div class="hero-overlay bg-transparent backdrop-blur-3xl"></div>
        <div class="hero-content w-full">
          <h1>
            {t('index.block-1.title-1')}
            <span class="bg-clip-text text-transparent bg-linear-to-br from-primary to-secondary text-5xl font-extrabold">
              {t('index.block-1.title-2')}
            </span>
          </h1>
          <p>
            {t('index.block-1.text-1')}
            <b> {t('index.block-1.text-2')} </b>
            {t('index.block-1.text-3')}
          </p>
          <BtnGroup
            items={[
              Links.projects,
              {
                ...Links.QQ,
                text: t('btn:qq-group'),
                class: 'bg-secondary text-secondary-content',
              },
            ].map((e) => ({ ...e, type: 'link' }))}
          />
        </div>
      </div>
      <div class="hero-content bg-primary text-primary-content">
        <h1>{t('index.block-2.title')}</h1>
        <p>{t('index.block-2.text')}</p>
      </div>
      <div class="hero-content">
        <h1>{t('index.block-3.title')}</h1>
        <p>{t('index.block-3.text')}</p>
      </div>
      <div class="hero-content bg-secondary text-secondary-content">
        <h1>{t('index.block-4.title')}</h1>
        <p>
          {t('index.block-4.text-1')}
          <Link path="https://docs.astral.sh/uv/" children=" uv " />
          {t('index.block-4.text-2')}
          {t('index.block-4.text-3')}
          <Link path="https://typst.app/home" children=" Typst " />
          {t('index.block-4.text-4')}
          {t('index.block-4.text-3')}
          <Link path="https://marpit.marp.app/" children=" Marp " />
          {t('index.block-4.text-5')}
        </p>
      </div>
      <div class="hero-content">
        <h1>{t('index.block-5.title')}</h1>
        <p>
          {t('index.block-5.text-1')}
          <b>{t('index.block-5.text-2')}</b>
        </p>
        <BtnGroup
          items={[
            Links.about,
            {
              ...Links.donate,
              class: 'bg-primary text-primary-content',
            },
          ].map((e) => ({
            ...e,
            type: 'link',
          }))}
        />
      </div>
    </div>
  );
}
