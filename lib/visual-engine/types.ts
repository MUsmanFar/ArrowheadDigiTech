/** Visual Engine — approved Phase 30 types */

export type ChapterToken =
  | 'void-deep'
  | 'void'
  | 'void-elevated'
  | 'void-panel'
  | 'paper'
  | 'paper-muted'
  | 'paper-warm';

export type ChapterTexture = 'grain' | 'dot-grid' | 'mesh' | 'none';

export type GlassTier = 'luminous' | 'matte' | 'whisper';

export type ParticleDensity = 'hero' | 'cta' | 'tech' | 'none';

export type SignalOpacityScale = 'hero' | 'header' | 'grid' | 'watermark' | 'light';

export type DepthLayer = 'background' | 'signal' | 'content' | 'glass' | 'foreground' | 'cursor';

export type BridgePair = {
  from: ChapterToken;
  to: ChapterToken;
  heightPx: number;
};
