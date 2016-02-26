<?php

class GGPopularPosts extends WP_Widget {

  public function __construct() {
    parent::__construct(
      'gg-popular-posts',
      'GG Popular Posts',
      [
        'classname' => 'gg-popular-posts',
        'description' => 'Articoli Popolari'
      ]
    );
  }

  public function widget($args, $instance) {
    $title = apply_filters('widget_title', $instance['title']);

    echo $args['before_widget'];

    if (!empty($title)) :
      echo $args['before_title'] . $title . $args['after_title'];
    endif;

    echo '<ul>';

    $ggPopularPosts = new WP_Query([
      'orderby' => 'comment_count',
      'posts_per_page' => $instance['number'],
      'ignore_sticky_posts' => 1
    ]);
    while ($ggPopularPosts->have_posts()) : $ggPopularPosts->the_post(); ?>
      <li>
        <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute; ?>">
          <span>
            <?php the_title(); ?>
          </span>
          <span>
            <?php comments_number('0', '1', '%'); ?>
          </span>
        </a>
      </li>
    <?php endwhile;

    echo '</ul>';
    echo $args['after_widget'];
    wp_reset_postdata();
  }

  function update($newInstance, $instance) {
    $instance['title'] = strip_tags($newInstance['title']);
    $instance['number'] = empty($newInstance['number']) ? 5 : absint($newInstance['number']);
    return $instance;
  }

  function form($instance) {
    $title = empty($instance['title']) ? '' : esc_attr($instance['title']);
    $number = empty($instance['number']) ? 5 : absint($instance['number']);
    ?>
      <p>
        <label for="<?php echo $this->get_field_id('title'); ?>">
          Titolo:
        </label>
        <input
          id="<?php echo $this->get_field_id('title'); ?>"
          name="<?php echo $this->get_field_name('title'); ?>"
          class="widefat"
          type="text"
          value="<?php echo esc_attr($title) ?>"
        >
      </p>
      <p>
        <label for="<?php echo $this->get_field_id('number'); ?>">
          Numero di post da mostrare:
        </label>
        <input
          id="<?php echo $this->get_field_id('number'); ?>"
          name="<?php echo $this->get_field_name('number'); ?>"
          class="tiny-text"
          type="number"
          value="<?php echo esc_attr($number) ?>"
          step="1" min="1" size="3"
        >
      </p>
    <?php
  }

}
