import Section_Header from "../texts/Section_Header";
import { applyElementStyles, getElementText } from "@/lib/utils";

export default function CTA({
	sectionId,
	elementProps = {},
	selectedElementPath,
}) {
	return (
		<div className="bg-matteBlack c h-[50vh] ">
			<div className="">
				<Section_Header
					// title={`From idea to backend \n in under 10 minutes.`}
					title={`Serverless endpoints✨ connected directly to DB.`}
					aurora="Serverless"
					description={`No infra. No frameworks. Only Supabase and Thincrust.`}
				/>
				<div className=" space-x-6 c mt-12">
					<div
						data-element-path="primary-cta"
						className={`${applyElementStyles(
							"rounded-md font-semibold px-6 py-2 text-white bg-indigo-600 cursor-pointer",
							elementProps["primary-cta"]
						)} ${
							selectedElementPath === `${sectionId}.primary-cta`
								? "selected-element"
								: ""
						}`}
					>
						{getElementText(
							"Start building",
							elementProps["primary-cta"]
						)}
					</div>
					<div
						data-element-path="secondary-cta"
						className={`${applyElementStyles(
							"text-sm cursor-pointer font-semibold leading-6 text-white",
							elementProps["secondary-cta"]
						)} ${
							selectedElementPath === `${sectionId}.secondary-cta`
								? "selected-element"
								: ""
						}`}
					>
						{getElementText(
							"Read more",
							elementProps["secondary-cta"]
						)}{" "}
						<span aria-hidden="true">→</span>
					</div>
				</div>
			</div>
		</div>
	);
}
