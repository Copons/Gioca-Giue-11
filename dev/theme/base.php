<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <?php get_template_part('templates/head'); ?>
  <body <?php body_class(); ?>>
    <div class="gg-layout">
      <div class="gg-obfuscator"></div>

      <?php get_template_part('templates/header'); ?>

      <?php include templatePath(); ?>

      <?php get_template_part('templates/drawer'); ?>
    </div>
    <?php wp_footer(); ?>
  </body>
</html>
