-- Blog content storage. Idempotent — run multiple times safely.
-- Per cross-product spec (2026-05-21 migration brief).

CREATE TABLE IF NOT EXISTS blog_posts (
    id              SERIAL PRIMARY KEY,
    slug            TEXT UNIQUE NOT NULL,
    title           TEXT NOT NULL,
    excerpt         TEXT,
    content_mdx     TEXT NOT NULL,
    category        TEXT,
    author          TEXT,
    cover_image     TEXT,
    seo_title       TEXT,
    seo_description TEXT,
    tags            JSONB DEFAULT '[]'::jsonb,
    frontmatter_extra JSONB DEFAULT '{}'::jsonb,
    published       BOOLEAN NOT NULL DEFAULT true,
    published_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_pub
    ON blog_posts(published, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_blog_posts_cat
    ON blog_posts(category) WHERE published = true;

CREATE INDEX IF NOT EXISTS idx_blog_posts_updated
    ON blog_posts(updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_blog_posts_tags
    ON blog_posts USING GIN(tags);
