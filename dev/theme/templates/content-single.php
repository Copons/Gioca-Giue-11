<?php while (have_posts()) : the_post();
  if (has_post_thumbnail()) :
    $featuredImage = featuredImage(get_the_ID());
  endif;
?>
<!-- START ARTICLE -->
<article class="gg-article">

  <!-- START ARTICLE HEADER -->
  <header class="gg-article-header" itemscope itemtype="http://schema.org/Article">
    <?php if (has_post_thumbnail()) : ?>
      <img
        src="<?php echo esc_url($featuredImage['src']); ?>"
        srcset="<?php echo esc_attr($featuredImage['srcset']); ?>"
      >
      <meta itemprop="image" content="<?php echo esc_url($featuredImage['src']); ?>" />
      <meta itemprop="thumbnailUrl" content="<?php echo esc_url($featuredImage['src']); ?>" />
    <?php endif; ?>
    <hgroup>
      <?php if ($payoff = get_field('copons_payoff')) : ?>
        <small class="gg-card-payoff">
          <?php echo $payoff; ?>
        </small>
      <?php endif; ?>
      <h1>
        <?php the_title(); ?>
        <meta itemprop="url" content="<?php the_permalink(); ?>" />
      </h1>
    </hgroup>
  </header>
  <!-- END ARTICLE HEADER -->

  <div class="gg-article-container">

    <meta itemprop="description" content="<?php echo wp_strip_all_tags( get_the_excerpt() ); ?>" />

    <!-- START ARTICLE INFO -->
    <div class="gg-article-info">
      <div class="gg-post-meta-container">
        <a href="<?php echo get_author_posts_url(get_the_author_meta('ID')); ?>" class="gg-user-image">
          <img src="http://placehold.it/40x40" />
        </a>
        <div class="gg-post-meta">
          <a href="<?php echo get_author_posts_url(get_the_author_meta('ID')); ?>" class="gg-user-link" rel="author">
            <?php echo get_the_author(); ?>
          </a>
          <div class="gg-post-meta-info">
            <time datetime="<?php echo get_post_time('c', true); ?>" pubdate="pubdate" itemprop="datePublished">
              <?php echo get_the_date(); ?>
            </time>
          </div>
          <div class="gg-post-meta-info">
            <?php foreach (get_the_category() as $category) : ?>
              <a href="<?php echo get_category_link($category->term_id) ?>" itemprop="articleSection">
                <?php echo $category->name; ?>
              </a>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
      <div class="gg-article-actions">
        <a class="gg-button-flat" href="<?php the_permalink(); ?>#comments">
          <span class="gg-icon-comments"></span>
          <?php comments_number('0', '1', '%'); ?>
          <meta itemprop="interactionCount" content="UserComments:<?php echo get_comments_number(); ?>" />
        </a>
      </div>
    </div>
    <!-- END ARTICLE INFO -->

    <!-- START ARTICLE BODY -->
    <div class="gg-article-body" itemprop="articleBody">
      <?php the_content(); ?>
    </div>
    <!-- END ARTICLE BODY -->

    <!-- START ARTICLE FOOTER -->
    <footer class="gg-article-footer">
      <div class="gg-article-social">
        <div class="gg-article-social-icons">
          <a class="gg-icon-flat gg-icon-facebook"></a>
          <a class="gg-icon-flat gg-icon-twitter"></a>
        </div>
        <div class="gg-article-social-buttons">
          <a class="gg-button-flat" href="<?php the_permalink(); ?>#comments">
            <span class="gg-icon-comments"></span>
            <?php comments_number('0', '1', '%'); ?>
          </a>
        </div>
      </div>
    </footer>
    <!-- END ARTICLE FOOTER -->

    <?php comments_template('/templates/comments.php'); ?>

  </div>

</article>
<!-- END ARTICLE -->
<?php endwhile; ?>
