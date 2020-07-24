// @flow strict
import { TwitterShareButton, TwitterIcon } from 'react-share';

import React from 'react';
import { Link } from 'gatsby';
import { useSiteMetadata } from '../../hooks';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import styles from './Post.module.scss';
import type { Node } from '../../types';

type Props = {
  post: Node,
};

const Post = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;
  const { url, title: siteTitle } = useSiteMetadata();

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/">
        {siteTitle}
      </Link>

      <div className={styles['post__content']}>
        <Content body={html} title={title} />
      </div>

      <div className={styles['post__footer']}>
        <div>
          SHARE <br />
          <TwitterShareButton
            title={`${title}\n`}
            via="mikoshibax"
            url={url + slug}
          >
            <TwitterIcon size={24} round />
          </TwitterShareButton>
        </div>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}

        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
