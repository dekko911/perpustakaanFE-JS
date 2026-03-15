import { useState } from "react";
import { cn } from "../src/lib/utils";

// harus cari lagi hasil yang bisa di sederhanakan dari ini.
export const InputPermissions = ({
	placeholder = "",
	className = "",
	name = "",
}) => {
	const [tags, setTags] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleInputKeyUp = (event) => {
		event.preventDefault();
		if (event.key === "Enter" && inputValue.trim() !== "") {
			const newTags = inputValue
				.split(",")
				.map((tag) => tag.trim())
				.filter((tag) => tag !== "" && !tags.includes(tag));

			if (newTags.length > 0) {
				setTags([...tags, ...newTags]);
			}

			setInputValue("");
		}
	};

	const removeTag = (indexToRemove) => {
		setTags(tags.filter((_, index) => index !== indexToRemove));
	};

	return (
		<div>
			<div className="tags-container">
				{tags.map((tag, index) => (
					<div key={index} className="tag inline-flex gap-x-3">
						{tag}
						<button
							className="hover:text-red-500 hover:duration-200 cursor-pointer pe-4"
							onClick={() => removeTag(index)}
						>
							X
						</button>
					</div>
				))}
			</div>
			<input
				className={cn(
					"w-full p-2 border-1 border-zinc-500 rounded-md",
					className
				)}
				type="text"
				name={name}
				value={inputValue}
				onChange={handleInputChange}
				onKeyUp={handleInputKeyUp}
				placeholder={placeholder}
			/>
		</div>
	);
};
