"use client";

import React from "react";

export interface Language {
	code: string;
	name: string;
	displayName: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
	{ code: "english", name: "English", displayName: "English" },
	{ code: "hindi", name: "Hindi", displayName: "Hindi (Hinglish)" },
	{ code: "spanish", name: "Spanish", displayName: "Spanish" },
	{ code: "french", name: "French", displayName: "French" },
	{ code: "german", name: "German", displayName: "German" },
	{ code: "japanese", name: "Japanese", displayName: "Japanese" },
	{ code: "chinese", name: "Chinese", displayName: "Chinese" },
];

interface LanguageSelectorProps {
	selectedLanguage: string;
	onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
	selectedLanguage,
	onLanguageChange,
}) => {
	return (
		<div className="w-full mb-4">
			<label
				htmlFor="language-select"
				className="block text-sm font-medium text-gray-700 mb-1"
			>
				Transcription Language
			</label>
			<select
				id="language-select"
				value={selectedLanguage}
				onChange={(e) => onLanguageChange(e.target.value)}
				className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
			>
				{SUPPORTED_LANGUAGES.map((lang) => (
					<option
						key={lang.code}
						value={lang.code}
					>
						{lang.displayName}
					</option>
				))}
			</select>
			{selectedLanguage === "hindi" && (
				<p className="mt-1 text-xs text-gray-500">
					Hindi will be transcribed in Roman script (Hinglish)
				</p>
			)}
		</div>
	);
};

export default LanguageSelector;
