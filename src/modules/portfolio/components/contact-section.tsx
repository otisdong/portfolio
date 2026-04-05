import { LiquidGlass } from "~/shared/components/ui"
import { PORTFOLIO_DATA } from "../portfolio-constants"

export function ContactSection() {
	const { personal } = PORTFOLIO_DATA

	return (
		<section className="relative mx-auto w-full max-w-308 px-6 py-24 sm:px-12 md:px-16 lg:px-20 xl:px-24">
			{/* Let's work together animated text */}
			<div className="mb-18 flex justify-center">
				<img
					src="https://www.figma.com/api/mcp/asset/21e3aa03-8839-4e44-96af-f2651be1683f"
					alt="Let's work together"
					className="h-30 object-contain"
				/>
			</div>

			{/* Contact Card */}
			<LiquidGlass
				variant="frosted"
				rounded="2xl"
				className="mx-auto flex w-full max-w-152 flex-col items-center gap-6 p-10 text-center"
			>
				<p className="font-medium text-2xl text-white leading-8">
					{personal.email}
				</p>
				<p className="font-medium text-2xl text-white leading-8">
					{personal.phone.join(" or ")}
				</p>
			</LiquidGlass>
		</section>
	)
}
