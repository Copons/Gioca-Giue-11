<?php

function masonryCards() {
  while (have_posts()) : the_post();
    get_template_part('templates/card');
  endwhile;
}

function featuredImage($postId, $size = 'medium_large') {
  $featuredImage = array();
  $featuredImage['id'] = get_post_thumbnail_id($postId);
  $featuredImage['src'] = wp_get_attachment_image_url($featuredImage['id'], $size);
  $featuredImage['srcset'] = wp_get_attachment_image_srcset($featuredImage['id'], $size);
  return $featuredImage;
}

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


function seoExcerpt ($excerpt) {
	global $post;
	if ('' != get_post_meta($post->ID, '_yoast_wpseo_metadesc', true)) :
		return get_post_meta($post->ID, '_yoast_wpseo_metadesc', true);
	else :
		return $excerpt;
	endif;
}
add_filter('get_the_excerpt', 'seoExcerpt');
