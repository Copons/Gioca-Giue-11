<?php

function setup() {
  add_theme_support('post-thumbnails');
  add_theme_support('menus');
  add_theme_support('title-tag');
  add_theme_support('html5', [
    'caption',
    'comment-form',
    'comment-list',
    'gallery',
    'search-form'
  ]);
  register_nav_menus([
    'drawer-navigation' => 'Drawer Menu'
  ]);
  add_theme_support('infinite-scroll', [
    'container' => 'masonry',
    'footer' => false,
    'posts_per_page' => 3,
    'wrapper' => false,
    'render' => 'masonryCards'
  ]);
}
add_action('after_setup_theme', 'setup');


function assets() {

  wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300italic,300,400italic,500,500italic,700,700italic,900,900italic', false, null );

  wp_enqueue_style('gg11-style', get_template_directory_uri() . '/assets/gg11.css', false, '0.7.1');

  wp_enqueue_script('gg11-script', get_template_directory_uri() . '/assets/gg11.js', false, '0.7.1', true);

}
add_action('wp_enqueue_scripts', 'assets');


function sidebarInit() {
  register_sidebar([
    'name' => 'Drawer',
    'id' => 'drawer-widgets',
    'before_widget' => '<section class="widget %1$s %2$s">',
    'after_widget' => '</section>',
    'before_title' => '<h3>',
    'after_title' => '</h3>'
  ]);
}
add_action('widgets_init', 'sidebarInit');
