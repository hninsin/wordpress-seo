<?php
/**
 * WPSEO plugin file.
 *
 * @package WPSEO\Admin\Views\General
 *
 * @uses    Yoast_Form $yform Form object.
 */

if ( get_option( 'show_on_front' ) === 'posts' ) {
	echo __( 'This is what shows in the search results when people find your homepage. This means this is probably what they see when they search for your brand name.', 'wordpress-seo' );

	$editor = new WPSEO_Replacevar_Editor(
		$yform,
		[
			'title'                 => 'title-home-wpseo',
			'description'           => 'metadesc-home-wpseo',
			'page_type_recommended' => 'homepage',
			'page_type_specific'    => 'page',
			'paper_style'           => false,
		]
	);
	$editor->render();
} else {
	printf(
		/* translators: 1: link open tag; 2: link close tag. */
		esc_html__( 'You can determine the title and description for the homepage by %1$sediting the homepage itself%2$s.', 'wordpress-seo' ),
		'<a href="' . esc_url( get_edit_post_link( get_option( 'page_on_front' ) ) ) . '">',
		'</a>'
	);

	if ( get_option( 'page_for_posts' ) > 0 ) {
		echo '<p>';
		printf(
			/* translators: 1: link open tag; 2: link close tag. */
			esc_html__( 'You can determine the title and description for the posts page by %1$sediting the posts page itself%2$s.', 'wordpress-seo' ),
			'<a href="' . esc_url( get_edit_post_link( get_option( 'page_for_posts' ) ) ) . '">',
			'</a>'
		);
		echo '</p>';
	}
}
