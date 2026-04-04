import { createFileRoute } from "@tanstack/react-router"
import {
	AboutSection,
	ContactSection,
	ExperienceSection,
	FloatingPortrait,
	HeroSection,
	ProductsSection,
} from "~/modules/portfolio"

export const Route = createFileRoute("/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="relative min-h-screen bg-[#010619]">
			{/* Background Effects */}
			<div className="pointer-events-none fixed inset-0 overflow-hidden">
				{/* Top gradient orb */}
				<div className="absolute top-0 left-1/2 h-[1015px] w-[1108px] -translate-x-1/2 opacity-20 blur-3xl">
					<img
						src="https://www.figma.com/api/mcp/asset/b6836306-7d9a-49e9-803f-d72adff7210f"
						alt=""
						className="h-full w-full object-cover"
					/>
				</div>

				{/* Bottom gradient orb */}
				<div className="absolute top-[1200px] left-1/2 h-[1079px] w-[1920px] -translate-x-1/2 opacity-15 blur-3xl">
					<img
						src="https://www.figma.com/api/mcp/asset/0177d2d3-4a5d-46ae-b7f0-cc7e1e9ea28b"
						alt=""
						className="h-full w-full object-cover"
					/>
				</div>

				{/* Grid overlay */}
				<div className="absolute top-0 left-1/2 hidden h-[749px] -translate-x-1/2 gap-6 opacity-30 lg:flex">
					{Array.from({ length: 8 }).map((_, i) => (
						<div key={i} className="h-[951px] w-[156px] bg-slate-800/10" />
					))}
				</div>
			</div>

			{/* Floating Portrait Animation */}
			<FloatingPortrait />

			{/* Main Content */}
			<div className="relative z-10">
				<HeroSection />
				<AboutSection />
				<ExperienceSection />
				<ProductsSection />
				<ContactSection />
			</div>
		</div>
	)
}
