import { mdiQqchat } from '@mdi/js';
import { A } from '@solidjs/router';
import { Actions, Block, P, T } from '~/components/block';
import { Btn } from '~/components/button';
import { Table } from '~/components/table';
import { Nav } from '~/ts/enum';

export default function Donate() {
  let modalRef!: HTMLDialogElement;
  return (
    <div>
      <Block class="2xl:mx-60">
        <T>加入我们</T>
        <P>
          蓝骨头还处于初期阶段，有限的成员数限制着产品开发速度，我们需要有共同理念的伙伴加入。
          <br />
          我们要打造一套高效、协作、开放的科研产品生态，让科研工作者把时间更多地花在思考上。
          <br />
          为了实现这个目标，需要我们年轻一代的共同努力。
          <b>你愿意支持我们吗？</b>
        </P>
        <P>
          我们的团队成员基本都是学生，均以兼职形式进行无偿工作。
          <Btn class="btn-sm btn-outline" onClick={() => modalRef.showModal()}>
            了解工作内容
          </Btn>
          <br />
          通过这份工作，您可以：
          <br />
          决定未来产品的方向、对知识分享活动进行选题、获得行业前沿的互联网产品开发经验。
        </P>
        <P>目前您可以通过以下方式联系我们：</P>
        <Actions items={[Nav['ContactUs:QQ']]}></Actions>
        <dialog ref={modalRef} class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 class="text-lg font-bold">工作内容</h3>
            <div class="py-4">
              我们的主要工作是产品开发，大致包含：
              <br />
              <Table
                class="table-zebra break-keep"
                items={[
                  {
                    Job: '产品',
                    Desc: '产品提案，原型设计',
                    Tech: '',
                  },
                  {
                    Job: '全栈',
                    Desc: '独立完成一个产品的开发',
                    Tech: 'Solid, TypeScript, Bun',
                  },
                  {
                    Job: '推广',
                    Desc: '让更多人知道我们',
                  },
                  {
                    Job: '知识分享',
                    Desc: '撰写文章，用最简单的语言描述最专业的知识',
                  },
                ]}
              ></Table>
              <br />
              同时，也欢迎您加入我们的
              <A class="link" href={Nav['ContactUs:QQ'].path} target="_blank">
                社区群
              </A>
              。
            </div>
          </div>
        </dialog>
      </Block>
    </div>
  );
}
