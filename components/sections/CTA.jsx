import Section_Header from "../texts/Section_Header";

export default function CTA() {
	return (
		<div className="bg-matteBlack c h-[50vh] ">
			<div className="">
				<Section_Header
					// title={`From idea to backend \n in under 10 minutes.`}
					title={`Serverless endpoints✨ connected directly to DB.`}
					aurora="Serverless"
					description={`No infra. No frameworks. No nonsense. That's Thincrust.`}
				/>
				<div className=" space-x-6 c mt-12">
					<div
						href="/builder/tables"
						className="rounded-md font-semibold px-6 py-2 text-white bg-indigo-600 "
					>
						Start building
					</div>
					<div
						href="/builder/tables"
						className="text-sm cursor-pointer font-semibold leading-6 text-white"
					>
						Read more <span aria-hidden="true">→</span>
					</div>
				</div>
			</div>
		</div>
	);
}
