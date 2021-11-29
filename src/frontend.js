import { Suspense } from "@wordpress/element";
import Block from "./block";

// hydrate is not exposed in @wordpress/element
import { hydrate } from "react-dom";

window.addEventListener("DOMContentLoaded", () => {
	const element = document.querySelector("#hydrate-block");
	if (element) {
		const attributes = { ...element.dataset };
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
