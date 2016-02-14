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
  $template = 'single.twig';

endif;

Timber::render( $template, $context );
