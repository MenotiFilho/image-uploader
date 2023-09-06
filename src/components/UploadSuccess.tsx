import { useState, useRef } from 'react';

function UploadSuccess({ imageUrl }: { imageUrl: string | null }) {
	const [copied, setCopied] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleCopyClick = () => {
		if (imageUrl) {
			navigator.clipboard.writeText(imageUrl);
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 3000);
		}
	};

	const handleInputClick = () => {
		if (inputRef.current) {
			inputRef.current.select();
		}
	};

	return (
		<div className="bg-[#FFFFFF] w-[402px] h-[469px] rounded-xl shadow-xl flex flex-col items-center justify-center gap-4">
			<div className="text-[#4F4F4F] text-lg font-medium">
				Upload Successful!
			</div>
			{imageUrl && (
				<div className="flex flex-col items-center justify-center gap-5">
					<img
						src={decodeURIComponent(imageUrl)}
						alt="Uploaded"
						className="w-3/4 h-fit rounded-2xl shadow-xl"
					/>
					<div className="flex w-3/4 h-fit text-center justify-center focus-within:border-red-500">
						<input
							ref={inputRef}
							type="text"
							value={decodeURIComponent(imageUrl)}
							readOnly
							onClick={handleInputClick}
							className="text-[#4F4F4F] font-medium border p-2 w-3/4 rounded-lg rounded-r-none focus:outline-none focus:ring-0"
						/>
						<button
							className="bg-[#2F80ED] text-[#FFFFFF] font-medium text-xs w-1/4 rounded-lg rounded-l-none"
							onClick={handleCopyClick}
							disabled={copied}
						>
							{copied ? 'Copied!' : 'Copy URL'}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default UploadSuccess;
