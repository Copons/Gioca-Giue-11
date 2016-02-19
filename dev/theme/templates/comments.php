<?php
function gg_comment($comment, $args, $depth) {
  if ('' === $comment->comment_type) : ?>

    <div id="comment-<?php comment_ID(); ?>" <?php comment_class('gg-comment'); ?> itemscope itemtype="http://schema.org/Comment">
      <a href="<?php comment_author_url(); ?>" class="gg-user-image">
        <img src="http://placehold.it/40x40" />
      </a>
      <div class="gg-comment-content">
        <div class="gg-comment-meta">
          <a href="<?php comment_author_url(); ?>" class="gg-user-link" itemprop="name">
            <?php comment_author(); ?>
            <meta itemprop="url" content="<?php comment_author_url(); ?>" />
          </a>
          <div class="gg-comment-meta-info">
            <time datetime="<?php comment_time( 'c' ); ?>" pubdate="pubdate" itemprop="datePublished">
              <?php echo get_comment_date() . ' &middot; ' . get_comment_time(); ?>
            </time>
          </div>
        </div>
        <div class="gg-comment-body">
          <?php comment_text(); ?>
        </div>
      </div>
    </div>

<?php endif;
} ?>

<?php if (post_password_required()) :
  return;
endif; ?>

<!-- START COMMENTS -->
<section class="gg-comments" id="comments">
  <?php if (have_comments()) : ?>
    <h2>Comments</h2>
    <?php wp_list_comments( array( 'callback' => 'gg_comment' ) ); ?>
    <?php
      $commentFormArgs = array(
        'class_form' => 'gg-respond',
        'title_reply' => '',
        'title_reply_before' => '',
        'title_reply_after' => '',
        'format' => 'html5',
        'fields' => array(
          'author' => commentFormInputField( 'Author', 'author', 'text', true ),
          'email' => commentFormInputField( 'Email', 'email', 'email', true ),
          'url' => commentFormInputField( 'Url', 'url', 'text', false ),
        ),
        'comment_field' => commentFormTextField(),
        'submit_button' => commentFormSubmitButton(),
        'submit_field' => '<p class="gg-comment-submit">%1$s %2$s</p>'
      );
      comment_form($commentFormArgs);
    ?>
  <?php endif; ?>
</section>
<!-- END COMMENTS -->
