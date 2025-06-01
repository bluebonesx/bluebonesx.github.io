import { Actions, Block, Head, Para } from '~/components/block';
import { Links } from '~/ts/enum';
import { t } from '~/ts/util';

export default function Home() {
  return (
    <>
      <div>
        <Block>
          <Head>
            心理学的 <br />
            <span class="bg-clip-text [text-fill-color:transparent]">
              下一代 <br />
              科研工具箱
            </span>
          </Head>
          <Para>
            蓝骨头属于 Open Science 项目，通过<b>开源工具</b>减少 dirty
            work，把时间留给创造性工作。
            <br />
            从文献收集到撰写文稿，我们关注科研工作的全流程。
          </Para>
          <Actions
            items={[
              Links.projects,
              { ...Links.QQ, children: t('btn:qq-group') },
            ].map((e) => ({ ...e, type: 'link' }))}
          />
          <br class="h-8"></br>
        </Block>
        <Block class="bg-primary text-primary-content">
          <Head>让运行实验程序更简单</Head>
          <Para>
            我们推荐基于 Web 的实验方案，实现真正的“一次编写，到处运行”。
            <br />
            比起系统依赖性较强的 PsychToolbox 和 PsychoPy，基于 Web
            的实验程序几乎没有版本兼容问题。
            <br />
            只需要一个浏览器，就能运行任何实验程序。
          </Para>
        </Block>
        <Block>
          <Head>搭建被试库，集中管理实验数据</Head>
          <Para>
            被试库可以记录被试人口学信息、其他主试对被试的评价、被试以往参加的实验及数据等等。
            <br />
            通过被试库提供的信息，主试可以更好判断该被试是否适合特定实验。
            <br />
            被试信息和实验数据的深度绑定，也能为后续数据处理提供更多可能。
          </Para>
        </Block>
        <Block class="bg-secondary text-secondary-content">
          <Head>抛弃闭源，拥抱开源</Head>
          <Para>
            为了避免不必要的版权纠纷或支付高昂的服务费用，我们推荐用开源替代闭源。
            <br />用 Python 替代 MATLAB，拥抱成熟的环境管理 uv 和源码管理 git。
            <br />用 Typst 替代 Word，使用更稳定的排版系统和版本管理 git。
            <br />用 Wrap 替代 PowerPoint，让 AI 辅助 PPT 制作。
          </Para>
        </Block>
        <Block>
          <Head>还有……</Head>
          <Para>
            蓝骨头项目还处于早期阶段，目前所有开发工作仅由一人完成，所以相关进度较为缓慢。
            <br />
            我们需要各方的支持，<b>你愿意支持我们吗？</b>
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
