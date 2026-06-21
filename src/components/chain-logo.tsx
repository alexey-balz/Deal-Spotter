import type { Chain } from "@/data/chains";

export function ChainLogo({ chain, size = 28 }: { chain: Chain; size?: number }) {
  return (
    <div
      className="inline-flex items-center justify-center rounded-md font-display font-extrabold tracking-tight shadow-sm"
      style={{
        background: chain.color,
        color: chain.textColor,
        height: size,
        paddingInline: size * 0.35,
        fontSize: size * 0.45,
        lineHeight: 1,
        minWidth: size,
      }}
      aria-label={chain.name}
    >
      {chain.name}
    </div>
  );
}
