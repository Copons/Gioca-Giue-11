<?php

if ( ! class_exists( 'Timber' ) ) :
  add_action( 'admin_notices', function () {
    echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
  });
	return;
endif;

Timber::$dirname = array( 'templates', 'views' );




class GG11 extends TimberSite {

  function __construct () {
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'menus' );
    wp_enqueue_script( 'gg11-script', get_template_directory_uri() . '/assets/gg11.js', array(), '0.4.4', true );
    //add_filter( 'timber_context', array( $this, 'add_to_context' ) );
    //add_filter( 'get_twig', array( $this, 'add_to_twig') );
    parent::__construct();
  }

}

new GG11();
