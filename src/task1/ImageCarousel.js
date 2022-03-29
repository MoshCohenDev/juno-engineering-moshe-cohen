import { React, useEffect, useState } from 'react';
import { fetchImageUrls } from '../api/index';
import './ImagesCarousel.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress';
import { Hidden } from '@mui/material';

const ImageCarousel = () => {
	const [images, setImages] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isLoadingImage, setIsLoadingImage] = useState(false);

	const getAllImages = async () => {
		setLoading(false);
		try {
			const data = await fetchImageUrls();
			setImages(data);
			setIsLoadingImage(true);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(true);
		}
	};

	useEffect(() => {
		getAllImages();
	}, [images[activeIndex]]);
	return (
		<div className="images_container">
			{!isLoading ? (
				<div className="loading">
					<CircularProgress />
				</div>
			) : (
				<>
					<ArrowBackIosNewIcon
						className={isLoadingImage ? 'button' : 'buttonNot'}
						onClick={() => {
							setActiveIndex(activeIndex < 1 ? images.length - 1 : activeIndex - 1);
						}}
					/>
					{!isLoadingImage ? (
						<div className="loading">
							<CircularProgress />
						</div>
					) : (
						<img
							src={images[activeIndex]}
							className={isLoadingImage ? 'imageExits' : 'imageNotExits'}
							style={{ height: '40rem', width: '40rem', borderRadius: '50px' }}
						/>
					)}
					<ArrowForwardIosIcon
						className={isLoadingImage ? 'button' : 'buttonNot'}
						onClick={() => {
							setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
						}}
					/>
				</>
			)}
		</div>
	);
};
export default ImageCarousel;
