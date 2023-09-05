function UploadLoading() {
	return (
		<div className="bg-[#FFFFFF] w-[402px] h-[469px] rounded-xl shadow-xl flex flex-col items-center justify-center gap-4">
			<div className="text-[#4F4F4F] text-lg font-medium">Uploading...</div>
			<div className="spinner-border text-primary" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
}

export default UploadLoading;
