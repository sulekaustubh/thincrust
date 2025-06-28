import { create } from "zustand";
import { persist } from "zustand/middleware";

const useActiveElementStore = create(
	persist(
		(set) => ({
			activeVariant: null,
			setActiveVariant: (variant) => set({ activeVariant: variant }),
		}),
		{
			name: "active-variant-storage", // Unique name for localStorage
		}
	)
);

export default useActiveElementStore;
