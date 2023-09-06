import { useEffect, useState } from 'react';

interface UploadedFile {
	id: number;
	filename: string;
	url: string;
	dateTime: string;
}

const baseUrl = 'https://image-upload-api.onrender.com';

function RecentImages() {
	const [recentImages, setRecentImages] = useState<UploadedFile[]>([]);

	useEffect(() => {
		// Fetch the list of recent images from your server
		fetch(`${baseUrl}/uploads`)
			.then((response) => response.json())
			.then((data: UploadedFile[]) => {
				// Sort the files by creation time (most recent first) and slice the last 3
				const sortedFiles = data
					.slice()
					.sort(
						(a, b) =>
							new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
					)
					.slice(0, 20);
				setRecentImages(sortedFiles);
			})
			.catch((error) => {
				console.error('Error fetching recent images:', error);
			});
	}, []);

	function isValidDate(dateString: string): boolean {
		const date = new Date(dateString);
		return !isNaN(date.getTime());
	}

	return (
		<ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 w-2/3">
			{recentImages.map((file) => (
				<li
					key={file.id}
					className="bg-[#FFFFFF] rounded-xl shadow-xl flex flex-col items-center justify-between w-full"
				>
					<img
						src={`${baseUrl}${file.url}`}
						alt={file.filename}
						className="rounded-t-xl object-cover h-2/3 w-full"
					/>

					<div className="w-full flex flex-col justify-between items-center h-1/3 gap-3">
						<a
							href={`${baseUrl}${file.url}`}
							target="_blank"
							className="hover:underline text-center text"
						>
							{file.filename}
						</a>
						<p className="text-[#BDBDBD] text-xs font-medium self-start ml-1 mb-1">
							Upload Date:{' '}
							{isValidDate(file.dateTime)
								? new Date(file.dateTime).toLocaleString()
								: 'Invalid Date'}
						</p>
					</div>
				</li>
			))}
		</ul>
	);
}

export default RecentImages;
