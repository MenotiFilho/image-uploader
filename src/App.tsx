import { CloudArrowUp } from 'phosphor-react';
import './App.css';
import RecentImages from './components/RecentImages';
import UploadImages from './components/UploadImages';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import UploadSuccess from './components/UploadSuccess';
import { useParams } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="bg-[#FAFAFB] h-screen min-h-screen flex flex-col  items-center gap-5">
				<div className="flex w-full flex-col justify-center items-center ">
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
				</div>
				<div className="w-full h-full flex flex-col items-center justify-start">
					<Routes>
						<Route path="/recentimages" element={<RecentImages />} />
						<Route
							path="/success/:imageUrl"
							element={
								<UploadSuccess imageUrl={useParams().imageUrl || null} />
							}
						/>
						<Route path="/" element={<UploadImages />} />
					</Routes>
				</div>
				<div className=" text-[#A9A9A9] text-sm">
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
