<?php

namespace Yoast\WP\SEO\Actions\Importing;

/**
 * Importing action for AIOSEO posttype defaults settings data.
 *
 * @phpcs:disable Yoast.NamingConventions.ObjectNameDepth.MaxExceeded
 */
class Aioseo_Posttype_Defaults_Settings_Importing_Action extends Abstract_Aioseo_Settings_Importing_Action {

	/**
	 * The plugin of the action.
	 */
	const PLUGIN = 'aioseo';

	/**
	 * The type of the action.
	 */
	const TYPE = 'posttype_default_settings';

	/**
	 * The option_name of the AIOSEO option that contains the settings.
	 */
	const SOURCE_OPTION_NAME = 'aioseo_options_dynamic';

	/**
	 * The map of aioseo_options to yoast settings.
	 *
	 * @var array
	 */
	protected $aioseo_options_to_yoast_map = [];

	/**
	 * The tab of the aioseo settings we're working with.
	 *
	 * @var string
	 */
	protected $settings_tab = 'postTypes';

	/**
	 * Builds the mapping that ties AOISEO option keys with Yoast ones and their data transformation method.
	 *
	 * @return void
	 */
	protected function build_mapping() {
		$post_type_objects = \get_post_types( [ 'public' => true ], 'objects' );

		foreach ( $post_type_objects as $pt ) {
			// Use all the custom post types that are public.
			$this->aioseo_options_to_yoast_map[ '/' . $pt->name . '/title' ]           = [
				'yoast_name'       => 'title-' . $pt->name,
				'transform_method' => 'simple_import',
			];
			$this->aioseo_options_to_yoast_map[ '/' . $pt->name . '/metaDescription' ] = [
				'yoast_name'       => 'metadesc-' . $pt->name,
				'transform_method' => 'simple_import',
			];

			if ( $pt->name === 'attachment' ) {
				$this->aioseo_options_to_yoast_map['/attachment/redirectAttachmentUrls'] = [
					'yoast_name'       => 'disable-attachment',
					'transform_method' => 'import_redirect_attachment',
				];
			}
		}
	}

	/**
	 * Transforms the redirect_attachment meta data.
	 *
	 * @param string $meta_data The meta data to be imported.
	 *
	 * @return string The transformed meta data.
	 */
	public function import_redirect_attachment( $meta_data ) {
		switch ( $meta_data ) {
			case 'disabled':
				return false;

			case 'attachment':
			case 'attachment_parent':
				return true;
		}
	}
}