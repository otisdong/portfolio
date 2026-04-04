import { PORTFOLIO_DATA } from "../portfolio-constants"

export function AboutSection() {
	const { personal } = PORTFOLIO_DATA

	return (
		<section className="grid grid-cols-1 gap-16 px-6 py-24 sm:px-12 md:px-24 lg:grid-cols-2 lg:px-60 xl:px-80">
			{/* Image */}
			<div className="relative">
				<img
					src={personal.image}
					alt={personal.name}
					className="h-[660px] w-full rounded-[40px] object-cover"
				/>
			</div>

			{/* Bio Text */}
			<div className="flex flex-col gap-8">
				<p className="text-lg text-white leading-relaxed sm:text-xl md:text-2xl lg:text-3xl xl:text-[32px] xl:leading-[42px]">
					{personal.bio}
				</p>
				<p className="text-lg text-slate-500 leading-relaxed sm:text-xl md:text-2xl lg:text-3xl xl:text-[32px] xl:leading-[42px]">
					{personal.bioSecondary}
				</p>
			</div>
		</section>
	)
}
