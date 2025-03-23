import { Actions, Block, Head, Para } from '~/components/block';
import { Links } from '~/ts/enum';

export default function Home() {
  return (
    <>
      <div>
        <Block>
          <Head>
            脑科学的 <br />
            <span class="bg-clip-text [text-fill-color:transparent]">
              下一代 <br />
              科研工作流
            </span>
          </Head>
          <Para>
            提高科研工作效率：一站式科研工具与平台，集成文献管理、数据收集、数据分析与文字撰写，打造高效、协作、开放的科研产品生态。
            <br />
            已经厌恶了繁琐的科研工作？看看蓝骨头还能做些什么……
          </Para>
          <Actions
            items={[
              { ...Links.projects, children: '系列产品' },
              { ...Links.QQ, children: '加入社区群' },
            ].map((e) => ({
              ...e,
              type: 'link',
            }))}
          />
          <br class="h-8"></br>
        </Block>
        <Block class="bg-primary text-primary-content">
          <Head>从 idea 到 paper 有多长</Head>
          <Para>
            收集文献、实验设计、数据收集、数据分析、制作图表、文字撰写、内容排版...
            <br />
            我们将用一套工作流解决一切重复劳动，让您专注于创造性事业中。
          </Para>
        </Block>
        <Block>
          <Head>趋近于 0 的学习成本</Head>
          <Para>
            为了让各领域的用户都能快速上手蓝骨头产品，我们从设计上就考虑零经验的初学者。
            <br />
            比起那些硬核且专业的软件，我们的优势是简单且高效。
          </Para>
        </Block>
        <Block class="bg-secondary text-secondary-content">
          <Head>开放的产品生态</Head>
          <Para>
            蓝骨头是非营利性组织，我们所作的一切是为了学科发展，而不是利润。
            <br />
            我们将把全部产品开源，让更多人参与到产品的开发中。 我们还将提供 API
            文档，让您可以自由地开发插件。
          </Para>
        </Block>
        <Block>
          <Head>加入，为了共同理念</Head>
          <Para>
            蓝骨头团队成员来自不同的领域，我们希望能够找到更多志同道合的伙伴。
            <br />
            作为一个年轻的组织，还需要得到各方的支持，
            <b>你愿意支持我们吗？</b>
          </Para>
          <Actions
            items={[Links.about, Links.donate].map((e) => ({
              ...e,
              type: 'link',
            }))}
          />
        </Block>
      </div>
    </>
  );
}
