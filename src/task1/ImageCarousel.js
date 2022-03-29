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

	const getAll = async () => {
		try {
			const data = await fetchImageUrls();
			setImages(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(true);
		}
	};
	useEffect(() => {
		getAll();
	}, []);
	return (
		<div className="images_container">
			{/* <div class="numbertext">{images.length}</div> */}
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
						onLoad={() => isLoadingImage(true)}
						className={isLoadingImage ? 'imageNotExits' : 'imageExits'}
						style={{
							visibility: isLoadingImage ? 'hidden' : 'visible',
							height: '40rem',
							width: '40rem',
							borderRadius: '50px',
						}}
						src={images[activeIndex]}
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