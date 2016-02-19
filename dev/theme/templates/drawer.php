<!-- START DRAWER -->
<div class="gg-drawer">
  <?php if (has_nav_menu('drawer-navigation')) : ?>
    <nav>
      <?php wp_nav_menu(['theme_location' => 'drawer-navigation']); ?>
    </nav>
  <?php endif; ?>
  <aside>
    <?php dynamic_sidebar('drawer-widgets'); ?>
  </aside>
</div>
<!-- END DRAWER -->
