import { PORTFOLIO_DATA } from "../portfolio-constants"

export function ContactSection() {
	const { personal } = PORTFOLIO_DATA

	return (
		<section className="relative px-6 py-24 sm:px-12 md:px-24 lg:px-60 xl:px-80">
			{/* Let's work together animated text */}
			<div className="mb-16 flex justify-center">
				<img
					src="https://www.figma.com/api/mcp/asset/21e3aa03-8839-4e44-96af-f2651be1683f"
					alt="Let's work together"
					className="h-[120px]"
				/>
			</div>

			{/* Contact Card */}
			<div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 rounded-2xl bg-white/5 p-6 text-center sm:p-8 md:p-10">
				<p className="font-medium text-lg text-white leading-8 sm:text-xl md:text-2xl">
					{personal.email}
				</p>
				<p className="font-medium text-lg text-white leading-8 sm:text-xl md:text-2xl">
					{personal.phone.join(" or ")}
				</p>
			</div>
		</section>
	)
}
