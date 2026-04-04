import { cn } from "~/shared/utils"

interface PortfolioLayoutProps {
	children: React.ReactNode
}

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
	return (
		<div className="min-h-screen bg-[#010619]">
			{/* Header */}
			<header className="fixed top-0 right-0 left-0 z-50 animate-[fade-in-up_0.6s_ease-out] px-6 py-4 backdrop-blur-sm sm:px-12 md:px-24 lg:px-60 xl:px-80">
				<div className="flex items-center justify-between">
					<div className="rounded-xl bg-white/5 px-3 py-2 sm:px-4 sm:py-3">
						<span className="font-medium text-sm text-white sm:text-base md:text-lg">
							Portfolio UI UX Designer
						</span>
					</div>

					<button
						type="button"
						className={cn(
							"rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 px-3 py-2 sm:px-4 sm:py-3",
							"font-medium text-black text-sm transition-transform hover:scale-105 sm:text-base md:text-lg",
						)}
					>
						Download CV
					</button>
				</div>
			</header>

			{/* Main Content */}
			<main className="pt-20">{children}</main>

			{/* Footer */}
			<footer className="bg-[#0f132c] px-6 py-6 sm:px-12 md:px-24 lg:px-60 xl:px-80">
				<div className="flex items-center justify-between text-base text-white sm:text-lg md:text-xl">
					<span>2026</span>
					<span>All rights reserved.</span>
				</div>
			</footer>
		</div>
	)
}
