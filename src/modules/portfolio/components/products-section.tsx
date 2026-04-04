import { LiquidGlass } from "~/shared/components/ui"
import { cn } from "~/shared/utils"
import { PORTFOLIO_DATA } from "../portfolio-constants"

export function ProductsSection() {
	const { products } = PORTFOLIO_DATA

	return (
		<section className="mx-auto flex w-full max-w-308 flex-col items-center gap-16 px-6 py-24 sm:px-12 md:px-24 lg:px-0">
			<div className="flex flex-col items-center gap-16">
				{/* Header */}
				<div className="flex w-full max-w-244 flex-col items-center gap-6 text-center">
					<h2
						className={cn(
							"font-medium text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] xl:leading-22",
							"bg-linear-to-r from-white via-blue-100 to-blue-300",
							"bg-clip-text text-transparent",
						)}
					>
						My Products
					</h2>
					<p className="text-white text-xl leading-8">
						I've developed diverse products, each project aims to deliver
						intuitive and impactful solutions tailored to user needs.
					</p>
				</div>

				{/* Products Grid */}
				<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
					{products.map((product) => (
						<LiquidGlass
							key={product.id}
							variant="premium"
							rounded="2xl"
							className="flex flex-col gap-10 p-6"
						>
							{/* Product Image */}
							<div className="h-[480px] overflow-hidden rounded-xl">
								{product.image ? (
									<img
										src={product.image}
										alt={product.title}
										className="h-full w-full object-cover"
									/>
								) : (
									<div className="h-full w-full bg-zinc-300" />
								)}
							</div>

							{/* Product Info */}
							<div className="flex flex-col gap-4 text-center">
								<h3 className="font-medium text-[32px] text-white leading-[48px]">
									{product.title}
								</h3>
								<p className="text-white/60 text-xl leading-8">
									{product.description}
								</p>
							</div>
						</LiquidGlass>
					))}
				</div>
			</div>
		</section>
	)
}
