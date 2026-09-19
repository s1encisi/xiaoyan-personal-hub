/* eslint-disable @next/next/no-img-element -- Vinext serves local, pre-compressed poster assets directly. */
import type { AnimationPoster as AnimationPosterAsset } from "../_data/animation/types";

type AnimationPosterProps = {
  poster?: AnimationPosterAsset;
  posters?: readonly AnimationPosterAsset[];
  title: string;
  eager?: boolean;
  className?: string;
  showCredit?: boolean;
};

const fallbackPoster: AnimationPosterAsset = {
  src: "/images/animation/cinematic-orbit-background.webp",
  alt: "深蓝星海与铜色轨道构成的作品文字封面",
  width: 1536,
  height: 1024,
};

export function AnimationPoster({
  poster,
  posters,
  title,
  eager = false,
  className = "",
  showCredit = false,
}: AnimationPosterProps) {
  const hasPoster = Boolean(poster || posters?.length);
  const assets = posters?.length ? posters : [poster ?? fallbackPoster];
  const primaryAsset = assets[0];

  return (
    <figure className={`animation-poster${hasPoster ? "" : " is-placeholder"}${assets.length > 1 ? " is-collection" : ""}${className ? ` ${className}` : ""}`} data-orientation={(primaryAsset.width ?? 460) > (primaryAsset.height ?? 650) ? "landscape" : "portrait"}>
      <div className={`animation-poster-image${assets.length > 1 ? " is-stack" : ""}`}>
        {assets.map((asset, index) => (
          <img
            key={asset.src}
            src={asset.src}
            alt={asset.alt || `${title}海报`}
            width={asset.width ?? 460}
            height={asset.height ?? 650}
            loading={eager && index === 0 ? "eager" : "lazy"}
            fetchPriority={eager && index === 0 ? "high" : "auto"}
            decoding="async"
          />
        ))}
        {!hasPoster && <span>{title} / 文字封面</span>}
      </div>
      {showCredit && primaryAsset.sourceUrl && (
        <figcaption>
          海报来源：<a href={primaryAsset.sourceUrl} target="_blank" rel="noreferrer">{primaryAsset.sourceLabel ?? "公开动漫资料库"}</a>{assets.length > 1 ? ` 等 ${assets.length} 张` : ""}
        </figcaption>
      )}
    </figure>
  );
}
