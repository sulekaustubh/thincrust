import { create } from "zustand";

interface Word {
	word: string;
	start: number;
	end: number;
	score: number;
}

interface WordsStore {
	words: Word[];
	setWords: (words: Word[]) => void;
	clearWords: () => void;
}

export const useWordsStore = create<WordsStore>((set) => ({
	words: [],
	setWords: (words) => set({ words }),
	clearWords: () => set({ words: [] }),
}));
