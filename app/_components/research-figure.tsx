/* eslint-disable @next/next/no-img-element -- Unaltered figures extracted from the owner's research manuscripts. */
const figures = {
  esrl: { src: "/images/research/esrl-architecture.webp", width: 2640, height: 2075, alt: "ESRL-CMO 的代理环境、Actor、Critic 与拉格朗日约束模块结构", caption: "ESRL-CMO 策略结构。来自当前研究稿件 Fig. 2，用于说明离线代理环境中的状态、动作与约束学习。" },
  tabpfn: { src: "/images/research/tabpfn-predictions.webp", width: 1379, height: 1212, alt: "TabPFN 对污水处理总电耗与单位水量电耗的训练、测试拟合及测试序列对照", caption: "TabPFN 预测结果。来自当前研究稿件 Fig. 4；8:2 划分下，两类目标的测试 R² 分别为 0.70 与 0.87。" },
};
export function ResearchFigure({ kind }: { kind?: keyof typeof figures }) {
  if (!kind) return null;
  const figure=figures[kind];
  return <figure className="research-paper-figure"><a href={figure.src} target="_blank" rel="noopener noreferrer" aria-label={`${figure.alt}，在新标签页查看大图`}><img src={figure.src} width={figure.width} height={figure.height} alt={figure.alt} loading="lazy" decoding="async" /></a><figcaption>{figure.caption}<a href={figure.src} target="_blank" rel="noopener noreferrer">查看大图 ↗</a></figcaption></figure>;
}
