import { mdiWechat } from '@mdi/js';
import img from '~/assets/wx_reward.png';
import { Actions, Block, Para, Head } from '~/components/block';
import { MultiLines } from '~/components/multi-lines';
import { t } from '~/ts/util';

export default function Donate() {
  let modalRef!: HTMLDialogElement;
  return (
    <div>
      <Block class="2xl:mx-60">
        <Head>{t('donate.title')}</Head>
        <Para>
          <MultiLines text={t('donate.text')} />
        </Para>
        <Actions
          items={[
            {
              text: t('logo:wechat'),
              icon: mdiWechat,
              onClick: () => modalRef.showModal(),
            },
            {
              type: 'link',
              text: t('logo:afdian'),
              path: 'https://afdian.com/a/bluebones',
              icon: 'https://static.afdiancdn.com/static/img/logo/logo.png',
            },
          ]}
        />
        <dialog ref={modalRef} class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            {/* <h3 class="text-lg font-bold">Thanks</h3> */}
            <p class="py-4">
              <img src={img} />
            </p>
          </div>
        </dialog>
      </Block>
    </div>
  );
}
