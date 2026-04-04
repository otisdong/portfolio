import { cn } from "~/shared/utils"
import { PORTFOLIO_DATA } from "../portfolio-constants"

export function ExperienceSection() {
	const { experience } = PORTFOLIO_DATA

	return (
		<section className="px-6 py-24 sm:px-12 md:px-24 lg:px-60 xl:px-80">
			<div className="flex flex-col gap-12">
				{/* Title */}
				<h2
					className={cn(
						"font-medium text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] xl:leading-[88px]",
						"bg-gradient-to-r from-white via-blue-100 to-blue-300",
						"bg-clip-text text-transparent",
					)}
				>
					Experience
				</h2>

				{/* Timeline */}
				<div className="flex flex-col gap-6">
					{experience.map((job) => (
						<div
							key={job.id}
							className="flex flex-col gap-10 rounded-2xl bg-white/5 p-6"
						>
							{/* Header */}
							<div className="flex flex-col gap-2 opacity-80">
								<h3
									className={cn(
										"font-medium text-2xl",
										"bg-gradient-to-r from-white via-blue-100 to-blue-300",
										"bg-clip-text text-transparent",
									)}
								>
									{`0${job.id}. ${job.title}`}
								</h3>
								<div className="flex items-center gap-6">
									<span className="text-white text-xl">{job.company}</span>
									<div className="h-5 w-px bg-white/20" />
									<span className="text-white text-xl">{job.period}</span>
								</div>
							</div>

							{/* Description */}
							<div className="flex flex-col gap-4">
								{job.description.map((desc, idx) => (
									<p key={idx} className="text-lg text-white leading-[26px]">
										{desc}
									</p>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
