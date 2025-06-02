import { mdiWechat } from '@mdi/js';
import img from '~/assets/wx_reward.png';
import { BtnGroup } from '~/components/button';
import { t } from '~/ts/util';

export default function () {
  let modalRef!: HTMLDialogElement;
  return (
    <div class="hero-content">
      <h1>{t('donate.title')}</h1>
      <p>{t('donate.text')}</p>
      <BtnGroup
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
          <img src={img} />
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>✕</button>
        </form>
      </dialog>
    </div>
  );
}
