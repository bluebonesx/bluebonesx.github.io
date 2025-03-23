import { A } from '@solidjs/router';
import { Index, createMemo } from 'solid-js';
import { Article, H, Link, List } from '~/components/article';
import { Btn } from '~/components/button';
import { MultiLines } from '~/components/multi-lines';
import { Links } from '~/ts/enum';
import { useBreakpoint } from '~/ts/util';

function MemberCard(
  p: Partial<{
    name: string;
    avatar: string;
    icon: string;
    link: string;
    bg: string[];
    content: string;
  }>,
) {
  return (
    <div class="card border-base-content/5 card-compact border-4 text-start">
      <div class="card-body">
        <div class="flex items-center gap-2">
          <Btn
            type="link"
            path={p.link}
            icon={p.icon}
            class="btn-circle avatar"
          />
          <div class="flex flex-col items-start">
            <b class="text-base-content font-bold">{p.name}</b>
            <p class="text-base-content/70 no-space text-xs">
              <MultiLines lines={p.bg} />
            </p>
          </div>
        </div>
        <p class="text-base-content no-space text-xs">{p.content}</p>
      </div>
    </div>
  );
}
export default function About() {
  const { md } = useBreakpoint();
  const size = createMemo(() => (md() ? 50 : 100));
  const members: () => Props<typeof MemberCard>[] = createMemo(() => [
    {
      name: 'Cubx',
      avatar: `https://avatars.githubusercontent.com/u/109600351?v=4&size=${size()}`,
      link: 'https://cubxx.github.io/blog',
      bg: ['上海师范大学-应用心理-本科', '中科院心理所科研助理'],
      content: '蓝骨头负责人。程序开发、脑科学、平面动画同时进行中...',
    },
    {
      name: 'gtouck',
      avatar: `https://avatars.githubusercontent.com/u/128892816?v=4&size=${size()}`,
      link: 'https://github.com/gtouck',
      bg: ['上海海事大学-计算机-本科', '全栈工程师'],
      content: '',
    },
    // {
    //   name: '天水场',
    //   avatar: `https://i1.hdslb.com/bfs/face/ed669e5482babb40d429b91384bf44031c5b04b1.jpg@${size()}w_${size()}h`,
    //   link: 'https://space.bilibili.com/12477613',
    //   bg: ['上海师范大学-应用心理-本科', '心理教师'],
    //   content: '寓教于乐，致力于用轻松有趣的新方式传播心理学小知识。',
    // },
    // {
    //   name: '大大猴🐵🥯',
    //   avatar: `https://avatars.githubusercontent.com/u/0?v=4&size=${size()}`,
    //   link: '',
    //   bg: ['中国传媒大学-传播-硕士', '大厂产品经理'],
    //   content: '等文案...',
    // },
  ]);
  const typesettingOthers = [
    <>
      <Link path="https://typst.app/" class="font-bold">
        Typst
      </Link>
      ：专业的学术文章排版系统，对标 LaTeX，但无法导出为
      Word。如果您只考虑可以接收 pdf 的期刊，这就是最好的选择。
    </>,
    <>
      <Link path="https://pandoc.org/" class="font-bold">
        Pandoc
      </Link>
      ：用于各种格式文档的转换，但无法自定义格式，而且过于沉重。
    </>,
  ];
  return (
    <Article>
      <H level={2}>贡献者</H>
      <p>
        如您所见，我们是一个年轻的团队。
        <br />
        我们需要您的
        <A href={Links.join.path}>加入</A>。
      </p>
      <div
        class={[
          'mx-auto gap-6 max-w-5xl',
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          // 'lg:[&>*:nth-child(3n-1)]:translate-y-16',
        ].join(' ')}
      >
        <Index each={members()}>{(e) => <MemberCard {...e()} />}</Index>
      </div>
      <H level={2}>未来计划</H>
      <H level={3}>产品开发</H>
      <List
        type="ul"
        items={[
          {
            text: '线下实验招募平台',
            content: (
              <p>
                正在开发。这项产品的主要目的是填补并改良
                <Link path="https://naodao.com">脑岛平台</Link>
                的空缺，脑岛专注于线上实验数据收集，而我们更关心线下实验。
              </p>
            ),
          },
          {
            text: '排版系统',
            content: [
              <p>
                还在用 Word 手动地调整格式？ 不如试试更轻量的 Markdown。
                <br />
                您可以将文章拆分为内容文件、格式文件、图片资源，
                再通过这项产品将 Markdown 导出为 Word，
                让您更专注于内容而不是格式。
                <br />
                当然，我们不是第一个考虑这件事的团队，参考以下相似产品：
              </p>,
              <List
                type="ol"
                items={typesettingOthers.map((e) => ({
                  content: e,
                }))}
              ></List>,
            ],
          },
          {
            text: '搭建工作流',
            content: (
              <p>
                这是一个 Python 库， 提供了大量工具用于搭建工作流。
                <br />
                它可以和蓝骨头其他产品协同工作：从招募平台直接爬取被试数据、
                自动统计人口学数据、将统计结果直接生成文字并推送至排版系统上。
              </p>
            ),
          },
        ]}
      ></List>
      <H level={3}>知识共享</H>
      <List
        type="ul"
        items={[
          {
            text: 'Python 公开课',
            content: (
              <p>
                前沿的脑科学需要计算机赋能，对于绝大多数科研工作者来说， Python
                是最好的选择。
                <br />
                虽然您也可以选择 Bilibili 或其他线上教学平台，
                但我们会更多考虑编程学习的方法论和工作中的最佳实践，
                而不仅是输出充斥于互联网的陈述性知识。
              </p>
            ),
          },
        ]}
      ></List>
    </Article>
  );
}
