import type { Metadata } from 'next';

const DEFAULT_BASE = 'https://arrowheaddigitech.com';

export function siteBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL?.trim() || DEFAULT_BASE;
}

export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}): Metadata {
  const baseUrl = siteBaseUrl();
  const canonicalPath = options.path.startsWith('/') ? options.path : `/${options.path}`;
  const url = `${baseUrl}${canonicalPath === '/' ? '' : canonicalPath}`;
  const ogImage = `${baseUrl}/opengraph-image`;

  return {
    title: options.title,
    description: options.description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: options.title,
      description: options.description,
      type: options.ogType ?? 'website',
      url,
      siteName: 'Arrowhead DigiTech',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Arrowhead DigiTech' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title,
      description: options.description,
      images: [ogImage],
    },
    ...(options.noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

export function cmsPageMetadata(
  path: string,
  title: string,
  description?: string,
): Metadata {
  return pageMetadata({
    title,
    description: description?.trim() || 'Arrowhead DigiTech — digital agency for websites, AI, and growth.',
    path,
  });
}
