import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
	TextControl,
	__experimentalNumberControl as NumberControl,
	ToggleControl,
	PanelBody,
} from "@wordpress/components";
import Block from "./block";

export default function Edit({ attributes, setAttributes }) {
	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__("Settings")}>
					<NumberControl
						label={__("Max todos")}
						value={attributes.maxTodos}
						onChange={(maxTodos) => setAttributes({ maxTodos })}
					/>
					<ToggleControl
						label={__("Show done todos")}
						onChange={() => setAttributes({ showDone: !attributes.showDone })}
						checked={attributes.showDone}
					/>
					<TextControl
						label={__("List name")}
						value={attributes.listName}
						onChange={(name) => setAttributes({ listName: name })}
					/>
				</PanelBody>
			</InspectorControls>
			<Block {...attributes} />
		</div>
	);
}
