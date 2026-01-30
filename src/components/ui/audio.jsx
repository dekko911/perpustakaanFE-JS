import { memo, useMemo, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const AudioComponent = ({ audioSrc = "", audioType = "audio/wav" }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef(null); // useRef bagaikan id, tidak bisa ada dua useRef dalam attributes ref.

	const handlePlay = () => {
		audioRef.current?.play();
		setIsPlaying(true);
	};

	const handlePause = () => {
		audioRef.current?.pause();
		setIsPlaying(false);
	};

	// for adjust volume using range input.
	// const handleVolume = (e) => {
	// 	const number = e.target.value;
	// 	const volume = number / 100;
	// 	audioRef.current.volume = volume;
	// };

	const audioElement = useMemo(
		() => (
			<audio ref={audioRef} loop>
				<source src={audioSrc} type={audioType} />
			</audio>
		),
		[audioSrc, audioType] // fungsi dependency untuk memantau jika props value nya berubah, maka lakukan re rendering ulang / lakukan sesuatu pada kolom dependency itu.
	);

	const iconPlayPause = useMemo(
		() => (isPlaying ? <FaPause /> : <FaPlay />),
		[isPlaying]
	);

	const labelPlayPause = useMemo(
		() => (isPlaying ? "Pause Song" : "Play Song"),
		[isPlaying]
	);

	// this a range input volume.
	// const inputVolume = useMemo(
	// 	() => (
	// 		<input
	// 			className="cursor-pointer block ms-3"
	// 			type="range"
	// 			min={0}
	// 			max={100}
	// 			onChange={(e) => handleVolume(e)}
	// 		/>
	// 	),
	// 	[]
	// );

	return (
		<div
			className={`absolute bottom-18 left-6 z-10 flex items-center ${isPlaying ? "animate-pulse" : "animate-none"}`}
		>
			{audioElement}

			<button
				className="cursor-pointer bg-white p-3 rounded-3xl text-black focus:outline-0"
				onClick={isPlaying ? handlePause : handlePlay}
			>
				{iconPlayPause}
			</button>

			<p className="ms-2">{labelPlayPause}</p>

			{/* this use for adjust volume */}
			{/* {inputVolume} */}
		</div>
	);
};

export const Audio = memo(AudioComponent);
