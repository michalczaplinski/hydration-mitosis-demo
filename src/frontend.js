import { Suspense } from "@wordpress/element";
import Block from "./_generated/block";

// hydrate is not exposed in @wordpress/element
import { hydrate } from "react-dom";

window.addEventListener("DOMContentLoaded", () => {
	const element = document.querySelector("#hydrate-block");
	if (element) {
		const attributes = { ...element.dataset };

		// We have to "parse" the attributes that end with 'Json'. Those attributes
		// are not strictly necessary for the example to work. They are just showing
		// how one might pass state to a block in order to hydrate it.
		const props = Object.entries(attributes).reduce((acc, [key, value]) => {
			if (key.endsWith("Json")) {
				acc[key.slice(0, -4)] = JSON.parse(value);
			} else {
				acc[key] = value;
			}
			return acc;
		}, {});

		hydrate(
			<Suspense fallback={<div className="wp-block-placeholder" />}>
				<Block {...props} />
			</Suspense>,
			element
		);
	}
});
