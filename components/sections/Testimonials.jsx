"use client";

const testimonials = [
	{
		content:
			"ThinCrust transformed how we build APIs. What used to take weeks now takes hours. The visual builder is intuitive and the generated APIs are production-ready from day one.",
		author: {
			name: "Sarah Chen",
			role: "CTO",
			company: "DataFlow Inc",
			imageUrl:
				"https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
		},
	},
	{
		content:
			"As a non-technical founder, ThinCrust gave me the power to prototype and iterate on our backend without hiring a full development team. It's been a game-changer for our startup.",
		author: {
			name: "Marcus Rodriguez",
			role: "Founder & CEO",
			company: "InnovateLab",
			imageUrl:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
		},
	},
	{
		content:
			"The auto-scaling and performance monitoring saved us countless hours of DevOps work. Our APIs handle millions of requests seamlessly, and we sleep better at night knowing ThinCrust has our back.",
		author: {
			name: "Emily Johnson",
			role: "Lead Developer",
			company: "ScaleUp Technologies",
			imageUrl:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
		},
	},
	{
		content:
			"The collaboration features are outstanding. Our entire team can work on API design together, and the version control ensures we never lose track of changes. Absolutely love it!",
		author: {
			name: "David Park",
			role: "Technical Lead",
			company: "BuildFast Corp",
			imageUrl:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
		},
	},
	{
		content:
			"ThinCrust's security features are enterprise-grade. We moved our entire API infrastructure here and passed all our compliance audits without any issues. Highly recommended!",
		author: {
			name: "Lisa Thompson",
			role: "Security Engineer",
			company: "SecureData Systems",
			imageUrl:
				"https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
		},
	},
	{
		content:
			"The code export feature is brilliant. When we needed to migrate to our own infrastructure, ThinCrust generated clean, well-documented code that our team could easily maintain.",
		author: {
			name: "Alex Kumar",
			role: "Backend Architect",
			company: "TechGiant Solutions",
			imageUrl:
				"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
		},
	},
];

export default function Testimonials() {
	return (
		<section className="bg-[#111010] py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-xl text-center">
					<h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-400">
						Testimonials
					</h2>
					<p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
						Loved by developers worldwide
					</p>
				</div>
				<div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
					<div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
						{testimonials.map((testimonial, testimonialIdx) => (
							<div
								key={testimonialIdx}
								className="pt-8 sm:inline-block sm:w-full sm:px-4"
							>
								<figure className="rounded-2xl bg-gray-900/50 p-8 text-sm leading-6 backdrop-blur ring-1 ring-gray-700/50">
									<blockquote className="text-gray-300">
										<p>"{testimonial.content}"</p>
									</blockquote>
									<figcaption className="mt-6 flex items-center gap-x-4">
										<img
											alt=""
											src={testimonial.author.imageUrl}
											className="h-10 w-10 rounded-full bg-gray-50"
										/>
										<div>
											<div className="font-semibold text-white">
												{testimonial.author.name}
											</div>
											<div className="text-gray-400">{`${testimonial.author.role}, ${testimonial.author.company}`}</div>
										</div>
									</figcaption>
								</figure>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
