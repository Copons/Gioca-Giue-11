<?php

function templatePath() {
  return Wrapper::$mainTemplate;
}

class Wrapper {

  // Full path to the main template file
  public static $mainTemplate;

  // Basename of the template file
  public $slug;

  // Array of templates
  public $templates;

  // Basename of the template file
  public static $base;

  public function __construct($template = 'base.php') {
    $this->slug = basename($template, '.php');
    $this->templates = [$template];

    if (self::$base) {
      $str = substr($template, 0, -4);
      array_unshift(
        $this->templates,
        $str . '-' . self::$base . '.php'
      );
    }
  }

  public function __toString() {
    $this->templates = apply_filters('gg/wrap-' . $this->slug, $this->templates);
    return locate_template($this->templates);
  }

  public static function wrap($main) {
    if (!is_string($main)) {
      return $main;
    }

    self::$mainTemplate = $main;
    self::$base = basename(self::$mainTemplate, '.php');

    if (self::$base === 'index') {
      self::$base = false;
    }

    return new Wrapper();
  }

}
add_filter('template_include', ['Wrapper', 'wrap'], 109);
