import { Link } from "react-router-dom";

import "./App.css";

const App = () => {
	return (
		<div className="content">
			<h1>Module Federation 1.5 breaks asset path for sub routes</h1>
			<Link to="/example">✅ You can reload on /example</Link>
			<Link to="/example/sub/path">
				❌ You cannot reload on /example/sub/path
			</Link>
		</div>
	);
};

export default App;
