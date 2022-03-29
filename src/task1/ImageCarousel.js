import { React, useEffect, useState } from 'react';
import { fetchImageUrls } from '../api/index';
import './ImagesCarousel.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress';

const ImageCarousel = () => {
	const [images, setImages] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isLoadingImage, setIsLoadingImage] = useState(false);

	const getAllImages = async () => {
		try {
			setLoading(false);
			const data = await fetchImageUrls();
			setImages(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(true);
		}
	};

	useEffect(() => {
		getAllImages();
	}, []);
	return (
		<div className="images_container">
			{!isLoading ? (
				<div className="loading">
					<CircularProgress />
				</div>
			) : (
				<>
					<ArrowBackIosNewIcon
						className="button"
						onClick={() => {
							setActiveIndex(activeIndex < 1 ? images.length - 1 : activeIndex - 1);
						}}
					></ArrowBackIosNewIcon>
					<img
						onLoad={() => setIsLoadingImage({ isLoadingImage: true })}
						className={isLoadingImage ? 'imageExits' : 'imageNotExits'}
						src={images[activeIndex]}
						style={{ height: '40rem', width: '40rem', borderRadius: '50px' }}
					/>
					<ArrowForwardIosIcon
						className="button"
						onClick={() => {
							setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
						}}
					></ArrowForwardIosIcon>
				</>
			)}
		</div>
	);
};
export default ImageCarousel;
