<?php
$postClasses = array('gg-card');
if (has_post_thumbnail()) :
  $featuredImage = featuredImage(get_the_ID());
  $postClasses[] = 'gg-card-image';
endif;
?>
<!-- START CARD -->
<article <?php post_class($postClasses); ?>>
  <?php if (has_post_thumbnail()) : ?>
    <a href="<?php the_permalink(); ?>" class="gg-card-media">
      <img
        src="<?php echo esc_url($featuredImage['src']); ?>"
        srcset="<?php echo esc_attr($featuredImage['srcset']); ?>"
        sizes="(min-width: 960px) 33vw, (min-width: 600px) 50vw, 100vw"
      >
    </a>
  <?php endif; ?>
  <div class="gg-card-content">
    <div class="gg-card-headline">
      <h1 class="gg-card-title">
        <?php if ($payoff = get_field('copons_payoff')) : ?>
          <small class="gg-card-payoff">
            <?php echo $payoff; ?>
          </small>
        <?php endif; ?>
        <a href="<?php the_permalink(); ?>">
          <?php the_title(); ?>
        </a>
      </h1>
      <h2 class="gg-card-subtitle">
        <a href="<?php echo get_author_posts_url(get_the_author_meta('ID')); ?>" rel="author">
          <?php echo get_the_author(); ?>
        </a>
        &middot;
        <time class="updated" datetime="<?php echo get_post_time('c', true); ?>">
          <?php echo get_the_date(); ?>
        </time>
      </h2>
    </div>
    <div class="gg-card-text">
      <?php the_excerpt(); ?>
    </div>
  </div>
  <div class="gg-card-actions">
    <a href="<?php the_permalink(); ?>#comments" class="gg-button-flat">
      <span class="gg-icon-comments"></span>
      <?php comments_number('0', '1', '%'); ?>
    </a>
  </div>
</article>
<!-- END CARD -->
