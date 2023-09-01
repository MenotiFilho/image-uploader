// src/components/RecentImages.tsx
import { useEffect, useState } from 'react';

interface UploadedFile {
	id: number;
	filename: string;
	url: string;
	dateTime: string;
}

const baseUrl = 'http://localhost:3000';

function RecentImages() {
	const [recentImages, setRecentImages] = useState<UploadedFile[]>([]);

	useEffect(() => {
		// Fetch the list of recent images from your server
		fetch('http://localhost:3000/uploads')
			.then((response) => response.json())
			.then((data: UploadedFile[]) => {
				// Sort the files by creation time (most recent first) and slice the last 3
				const sortedFiles = data
					.slice()
					.sort(
						(a, b) =>
							new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
					)
					.slice(0, 3);
				setRecentImages(sortedFiles);
				console.log(sortedFiles);
			})
			.catch((error) => {
				console.error('Error fetching recent images:', error);
			});
	}, []);

	return (
		<div className="w-full">
			<ul className="grid grid-cols-2 gap-3">
				{recentImages.map((file) => (
					<div
						className={
							'bg-[#FFFFFF] rounded-xl shadow-xl flex flex-col items-center justify-center '
						}
					>
						<li key={file.id} className="flex flex-col w-full h-fit min-h-full">
							<img
								src={`${baseUrl}${file.url}`}
								alt={file.filename}
								className="w-fit rounded-t-xl"
							/>
							<div className="w-full flex flex-col items-center justify-center h-full gap-3">
								<a
									href={`${baseUrl}${file.url}`}
									target="_blank"
									className="hover:underline"
								>
									{file.filename}
								</a>
								<p className="text-[#BDBDBD] text-xs font-medium self-start ml-1">
									Upload Date: {new Date(file.dateTime).toLocaleString()}
								</p>
							</div>
						</li>
					</div>
				))}
			</ul>
		</div>
	);
}

export default RecentImages;
