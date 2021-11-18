import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";
import Block from "./block";

export default function Edit({ attributes, setAttributes }) {
	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<TextControl
					label={__("Username")}
					value={attributes.username}
					onChange={(name) => setAttributes({ username: name })}
				/>
			</InspectorControls>
			<Block {...attributes} />
		</div>
	);
}
