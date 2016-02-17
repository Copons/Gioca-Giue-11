<?php

if ( ! class_exists( 'Timber' ) ) :
  echo 'Timber not activated!';
	return;
endif;

$context = Timber::get_context();

if ( is_home() ) :

  $context['posts'] = Timber::get_posts();
  $template = 'home.twig';

elseif ( is_single() ) :

  $context['post'] = new TimberPost();

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
  $context['gg_respond'] = TimberHelper::function_wrapper(
    'comment_form', array( $commentFormArgs )
  );
  $template = 'single.twig';

endif;

Timber::render( $template, $context );
