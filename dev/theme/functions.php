<?php

if ( ! class_exists( 'Timber' ) ) :
  add_action( 'admin_notices', function () {
    echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
  });
	return;
endif;




class GG11 extends TimberSite {

  function __construct() {
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'menus' );
    wp_enqueue_script( 'gg11-script', get_template_directory_uri() . '/assets/gg11.js', array(), '0.4.4', true );
    parent::__construct();
  }

}

new GG11();




function commentFormInputField( $label, $name, $type, $required ) {
  $inputField = '<p class="gg-comment-input">'
    . '<input id="' . $name . '" name="' . $name . '" type="' . $type . '"';
  if ($required) :
    $inputField .= ' required="required"';
  endif;
  $inputField .= ' />'
    . '<label for="' . $name . '">'
    . $label;
  if ( $required ) :
    $inputField .= ' <span class="required">*</span>';
  endif;
  $inputField .= '</label>'
    . '</p>';
  return $inputField;
}

function commentFormTextField() {
  return '<p class="gg-comment-textarea">'
    . '<textarea id="comment" name="comment" required="required"></textarea>'
    . '<label for="comment">'
    . 'Comment'
    . '<span class="required">*</span>'
    . '</label>'
    . '</p>';
}

function commentFormSubmitButton() {
  return '<button id="submit" name="submit" class="gg-button-raised" type="submit" value="Submit">Submit</button>';
}



function timberRender() {
  $context['posts'] = Timber::get_posts();
  $template = 'home.twig';
  print_r($context);
  Timber::render( $template, $context );
}
