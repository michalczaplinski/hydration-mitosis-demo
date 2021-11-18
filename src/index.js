import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";
import save from "./save";

registerBlockType("create-block/hydration-mitosis", {
	edit: Edit,
	save,
});
