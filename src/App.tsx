import { CloudArrowUp } from 'phosphor-react';
import './App.css';
import RecentImages from './components/RecentImages';
import UploadImages from './components/UploadImages';
import {
	BrowserRouter as Router,
	Link,
	Routes,
	Route as RouteV6,
} from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="flex flex-col items-center justify-center bg-[#FAFAFB] h-screen w-screen">
				<nav className="w-2/3 mt-2">
					<ul className="flex justify-between">
						<li>
							<Link to="/">
								<CloudArrowUp size={32} color="#2F80ED" />
							</Link>
						</li>
						<div className="flex gap-3">
							<li>
								<button className="bg-[#2F80ED] text-[#FFFFFF] font-medium text-xs w-[101px] h-[32px] rounded-lg">
									<Link to="/">Upload</Link>
								</button>
							</li>

							<li>
								<Link to="/recentimages">
									<button className="bg-[#2F80ED] text-[#FFFFFF] font-medium text-xs w-[101px] h-[32px] rounded-lg">
										Recent Images
									</button>
								</Link>
							</li>
						</div>
					</ul>
				</nav>
				<div className="bg-[#FAFAFB] h-full w-2/3 flex flex-col items-center justify-center">
					<Routes>
						<RouteV6 path="/recentimages" element={<RecentImages />} />
						<RouteV6 path="/" element={<UploadImages />} />
					</Routes>
				</div>
				<div className="mb-3 text-[#A9A9A9] text-sm">
					created by{' '}
					<a
						href="https://github.com/MenotiFilho"
						target="_blank"
						className="underline font-semibold "
					>
						menotifilho
					</a>{' '}
					- devChallenges.io
				</div>
			</div>
		</Router>
	);
}

export default App;
