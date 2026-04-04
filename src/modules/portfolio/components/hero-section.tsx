import { LiquidGlass } from "~/shared/components/ui"
import { cn } from "~/shared/utils"
import { PORTFOLIO_DATA } from "../portfolio-constants"

export function HeroSection() {
	return (
		<section className="relative flex flex-col items-center gap-20 px-6 py-12 sm:px-12 md:px-24 lg:px-60 xl:px-80">
			{/* Gradient Title */}
			<h1
				className={cn(
					"text-center font-medium text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] xl:leading-[96px]",
					"bg-gradient-to-r from-white via-blue-100 to-blue-300",
					"bg-clip-text text-transparent",
				)}
			>
				Designing Purpose-Driven Interfaces and Seamless User Journeys
			</h1>

			{/* Skills Grid */}
			<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{/* Design Skills Card */}
				<div className="flex flex-col gap-2 rounded-2xl bg-white/5 p-6">
					<div className="flex flex-wrap gap-2">
						<SkillTag>User flow</SkillTag>
						<SkillTag>Wireframe</SkillTag>
					</div>
					<div className="flex flex-wrap gap-2">
						<SkillTag>Visual Design</SkillTag>
						<SkillTag>Design System</SkillTag>
					</div>
					<div className="flex flex-wrap gap-2">
						<SkillTag>UX Research</SkillTag>
						<SkillTag>Info Architecture</SkillTag>
					</div>
					<div className="flex flex-wrap gap-2">
						<SkillTag>Content Video</SkillTag>
						<SkillTag>Edit Video</SkillTag>
					</div>
				</div>

				{/* Software Skills Card */}
				<div className="flex flex-col justify-between rounded-2xl bg-gradient-to-b from-blue-50 to-blue-200 p-6">
					<div className="flex flex-col gap-2">
						{PORTFOLIO_DATA.skills.software.slice(0, 3).map((_, idx) => (
							<div key={idx} className="flex gap-2">
								{PORTFOLIO_DATA.skills.software
									.slice(idx * 2, idx * 2 + 2)
									.map((software) => (
										<SoftwareTag key={software.name} icon={software.icon}>
											{software.name}
										</SoftwareTag>
									))}
							</div>
						))}
					</div>
					<p className="font-medium text-2xl text-black">Software Skills</p>
				</div>

				{/* Image Card */}
				<div className="h-[310px] overflow-hidden rounded-2xl">
					<img
						src="https://www.figma.com/api/mcp/asset/b5cfb36e-8791-4be3-827c-d274b08654e1"
						alt="Designer"
						className="h-full w-full object-cover"
					/>
				</div>
			</div>
		</section>
	)
}

interface SkillTagProps {
	children: React.ReactNode
}

function SkillTag({ children }: SkillTagProps) {
	return (
		<LiquidGlass variant="subtle" className="px-4 py-2">
			<span className="font-normal text-white text-xl">{children}</span>
		</LiquidGlass>
	)
}

interface SoftwareTagProps {
	icon: string | null
	children: React.ReactNode
}

function SoftwareTag({ icon, children }: SoftwareTagProps) {
	return (
		<div className="flex items-center gap-2 rounded-xl border border-zinc-400 bg-white/5 p-2">
			<div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded bg-white">
				{icon ? (
					<img
						src={icon}
						alt={String(children)}
						className="h-full w-full object-contain"
					/>
				) : (
					<span className="font-bold text-black text-lg">AI</span>
				)}
			</div>
			<span className="font-normal text-black text-xl">{children}</span>
		</div>
	)
}
