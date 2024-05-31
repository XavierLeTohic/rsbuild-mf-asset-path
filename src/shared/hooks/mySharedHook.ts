import { useState } from "react";

const mySharedHook = () => {
	const [state, setState] = useState(true);

	return {
		state,
		useState,
	};
};

export default mySharedHook;
