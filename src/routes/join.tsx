import { For } from 'solid-js';
import { Actions, Block, Head, Para } from '~/components/block';
import { Btn } from '~/components/button';
import { Links } from '~/ts/enum';
import { t } from '~/ts/util';

export default function Donate() {
  let modalRef!: HTMLDialogElement;
  return (
    <div>
      <Block class="2xl:mx-60">
        <Head>{t('Join us')}</Head>
        <Para>
          蓝骨头还处于初期阶段，有限的成员数限制着产品开发速度，我们需要有共同理念的伙伴加入。
          <br />
          我们要打造一套高效、协作、开放的科研产品生态，让科研工作者把时间更多地花在思考上。
          <br />
          为了实现这个目标，需要我们年轻一代的共同努力。
          <b>你愿意支持我们吗？</b>
        </Para>
        <Para>
          我们的团队成员基本都是学生，均以兼职形式进行无偿工作。
          <Btn class="btn-sm btn-outline" onClick={() => modalRef.showModal()}>
            了解工作内容
          </Btn>
          <br />
          通过这份工作，您可以：
          <br />
          决定未来产品的方向、对知识分享活动进行选题、获得行业前沿的互联网产品开发经验。
        </Para>
        <Para>目前您可以通过以下方式联系我们：</Para>
        <Actions items={[Links.QQ]}></Actions>
        <dialog ref={modalRef} class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 class="text-xl font-bold">{t('Job description')}</h3>
            <ol class="pt-2">
              <For
                each={[
                  {
                    text: t('Full-stack developer'),
                    desc: t(
                      'From requirement analysis to operations management, this project is yours!',
                    ),
                  },
                  {
                    text: t('Knowledge sharer'),
                    desc: t(
                      'Writing articles that describe the most specialized knowledge in the simplest of terms',
                    ),
                  },
                ]}
              >
                {(e) => (
                  <li class="pt-2">
                    <strong> {e.text}</strong>: {e.desc}
                  </li>
                )}
              </For>
            </ol>
          </div>
        </dialog>
      </Block>
    </div>
  );
}
