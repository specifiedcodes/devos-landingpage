export interface BlogPostMeta {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage?: string;
  published?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  slug: string;
  readingTime: string;
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}
