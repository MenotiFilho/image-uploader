import React, { useState, useRef } from 'react';

function UploadImages() {
	const [dragging, setDragging] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragging(true);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragging(false);
		const droppedFile = e.dataTransfer.files[0];
		setFile(droppedFile);
	};

	const handleChooseFile = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleUpload = async () => {
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await fetch('http://localhost:3000/upload', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				const fileInfo = await response.json();
				console.log('File uploaded:', fileInfo);
				// Reset the file input and selectedFileName state
				setFile(null);
				setSelectedFileName(null);
			} else {
				console.error('File upload failed.');
			}
		} catch (error) {
			console.error('File upload error:', error);
		}
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			setSelectedFileName(selectedFile.name);
		}
	};

	return (
		<div className="h-full w-full flex flex-col items-center justify-center">
			<div
				className={
					'bg-[#FFFFFF] w-[402px] h-[469px] rounded-xl shadow-xl flex flex-col items-center justify-center gap-4'
				}
			>
				<div className="text-[#4F4F4F] text-lg font-medium">
					Upload your image
				</div>
				<div className="text-[#828282] text-xs font-medium">
					File should be Jpeg, Png,...
				</div>
				<div
					className={`w-[338px] h-[255px]  bg-[#F6F8FB] border-dashed border-2 mt-3 rounded-2xl flex flex-col items-center justify-center gap-10 ${
						dragging ? 'border-[#3084fa]' : 'border-[#97BEF4]'
					}`}
					onDragEnter={handleDragEnter}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					{file ? (
						<div className="flex flex-col items-center justify-center gap-5">
							<img
								src={URL.createObjectURL(file)}
								alt=""
								className="w-3/4 h-fit rounded-2xl shadow-xl"
							/>
							<div className="text-[#4F4F4F] font-medium">
								{selectedFileName}
							</div>
						</div>
					) : (
						<>
							<img src="/src/assets/image.svg" alt="" className="w-[114px]" />
							<div className="text-[#BDBDBD] text-xs font-medium">
								Drag & Drop your image here
							</div>
						</>
					)}
				</div>
				<div className="flex gap-3">
					<button
						className="bg-[#2F80ED] text-[#FFFFFF] font-medium text-xs w-[101px] h-[32px] rounded-lg"
						onClick={handleChooseFile}
					>
						Choose a file
					</button>
					<input
						type="file"
						accept="image/*"
						ref={fileInputRef}
						style={{ display: 'none' }}
						onChange={handleFileInputChange}
					/>
					<button
						className={`bg-[#2F80ED] text-[#FFFFFF] font-medium text-xs w-[101px] h-[32px] rounded-lg ${
							file ? '' : 'opacity-50 pointer-events-none '
						}`}
						onClick={handleUpload}
						disabled={!file}
					>
						Upload file
					</button>
				</div>
			</div>
		</div>
	);
}

export default UploadImages;
