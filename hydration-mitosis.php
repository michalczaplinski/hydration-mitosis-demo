<?php
/**
 * Plugin Name:       Hydration Mitosis
 * Description:       Example of block hydration using the Mitosis compiler
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hydration-mitosis
 *
 * @package           create-block
 */

require 'vendor/autoload.php';

// use Liquid\Liquid;
// use Liquid\Template;

// Copied from @wordpress/dependency-extraction-webpack-plugin docs.
function enqueue_frontend_script() {
	$script_path       = 'build/frontend.js';
	$script_asset_path = 'build/frontend.asset.php';
	$script_asset      = require( $script_asset_path );
	$script_url = plugins_url( $script_path, __FILE__ );
	wp_enqueue_script( 'script', $script_url, $script_asset['dependencies'], $script_asset['version'] );
}

// Copied from WooCommerce Blocks.
function add_attributes_to_block( $attributes = [], $content = '' ) {
	$escaped_data_attributes = [];

	$template = new \Liquid\Template(__DIR__ . '/src/_generated');
	$output = $template->parseFile('block')->render($attributes);

	foreach ( $attributes as $key => $value ) {
		if ( is_bool( $value ) ) {
			$value = $value ? 'true' : 'false';
		}

		$json = '';
		if ( ! is_scalar( $value ) ) {
			$value = wp_json_encode( $value );
			$json = '-json';
		}

		$escaped_data_attributes[] = 'data-' . esc_attr( strtolower( preg_replace( '/(?<!\ )[A-Z]/', '-$0', $key . $json ) ) ) . '="' . esc_attr($value) . '"';
	}
	
	$return_val = '<div id="hydrate-block"' . implode( ' ', $escaped_data_attributes ) . '>' . trim( $output ) . '</div>' ;
		
	return $return_val;
}

function render_block_with_attributes( $attributes = [], $content = '' ) {
	if ( ! is_admin() ) {
		enqueue_frontend_script();
	}
	return add_attributes_to_block($attributes, $content);
};


function create_block_hydration_mitosis_block_init() {
	register_block_type( __DIR__, array(
		'render_callback' => 'render_block_with_attributes'
	));
}


add_action( 'init', 'create_block_hydration_mitosis_block_init' );