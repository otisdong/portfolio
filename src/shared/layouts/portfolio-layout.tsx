import { cn } from "~/shared/utils"
import { LiquidGlass } from "../components/ui"

interface PortfolioLayoutProps {
	children: React.ReactNode
}

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
	return (
		<div className="min-h-screen bg-[#010619]">
			{/* Header - scrolls with page */}
			<header className="absolute top-0 right-0 left-0 z-50 animate-[fade-in-up_0.6s_ease-out] px-6 py-8 sm:px-12 md:px-16 lg:px-20 xl:px-24">
				<div className="mx-auto flex w-full max-w-308 items-center justify-between">
					<LiquidGlass variant="default" className="px-3 py-2 sm:px-4 sm:py-3">
						<span className="font-medium text-sm text-white sm:text-base md:text-lg">
							Portfolio UI UX Designer
						</span>
					</LiquidGlass>

					<button
						type="button"
						className={cn(
							"rounded-lg bg-linear-to-r from-blue-50 to-blue-200 px-3 py-2 sm:px-4 sm:py-3",
							"font-medium text-black text-sm transition-transform hover:scale-105 sm:text-base md:text-lg",
						)}
					>
						Download CV
					</button>
				</div>
			</header>

			{/* Main Content */}
			<main>{children}</main>

			{/* Footer */}
			<footer className="bg-[#0f132c] px-6 py-6 sm:px-12 md:px-16 lg:px-20 xl:px-24">
				<div className="mx-auto flex max-w-308 items-center justify-between text-base text-white sm:text-lg md:text-xl">
					<span>2026</span>
					<span>All rights reserved.</span>
				</div>
			</footer>
		</div>
	)
}
