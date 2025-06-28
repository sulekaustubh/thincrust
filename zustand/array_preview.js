import { create } from "zustand";
import { persist } from "zustand/middleware";

const useVariantStore = create(
	persist(
		(set) => ({
			variants: [],
			addVariant: (variantObject) => {
				// No more string manipulation needed - everything is pre-defined
				set((state) => ({
					variants: [
						...state.variants,
						variantObject, // Use the variant object as-is
					],
				}));
			},
			updateVariant: (componentName, updatedVariant) => {
				set((state) => ({
					variants: state.variants.map((variant) =>
						variant.componentName === componentName
							? updatedVariant
							: variant
					),
				}));
			},
			clearAllVariants: () => set({ variants: [] }),
		}),
		{
			name: "variants-storage", // Unique name for localStorage
		}
	)
);

export default useVariantStore;
