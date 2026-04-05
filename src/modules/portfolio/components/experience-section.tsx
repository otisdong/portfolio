"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
import { LiquidGlass } from "~/shared/components/ui"
import { cn } from "~/shared/utils"
import { PORTFOLIO_DATA } from "../portfolio-constants"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function ExperienceSection() {
	const { experience } = PORTFOLIO_DATA
	const containerRef = useRef<HTMLElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const cardsRef = useRef<(HTMLDivElement | null)[]>([])

	useGSAP(
		() => {
			if (!containerRef.current || !titleRef.current) return

			const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
			if (cards.length === 0) return

			// Title fade in/out
			gsap.fromTo(
				titleRef.current,
				{ opacity: 0 },
				{
					opacity: 1,
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top top",
						end: "top+=10%",
						scrub: true,
					},
				},
			)

			gsap.to(titleRef.current, {
				opacity: 0,
				scrollTrigger: {
					trigger: containerRef.current,
					start: "bottom-=10%",
					end: "bottom top",
					scrub: true,
				},
			})

			// Set initial state for all cards
			cards.forEach((card, index) => {
				gsap.set(card, {
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					zIndex: index,
				})
			})

			// Animate each card with more spacing
			cards.forEach((card, index) => {
				const rotation = index * 2 // Each card rotates slightly: 0°, 2°, 4°, 6°...

				if (index === 0) {
					// First card: always visible
					gsap.set(card, {
						y: 0,
						opacity: 1,
						scale: 1,
						rotate: 0,
					})
				} else {
					// Other cards: fly in to stack
					gsap.set(card, {
						y: 200,
						opacity: 0,
						scale: 0.85,
						rotate: rotation + 8,
					})

					// Calculate timing with more spacing between cards
					// Card 2: 20-35%, Card 3: 40-55%, Card 4: 60-75%
					const startPoint = 5 + index * 20 // More spacing: 25%, 45%, 65%
					const endPoint = startPoint + 15 // Longer animation duration

					// Animate to stacked position and STAY THERE
					gsap.to(card, {
						y: 0,
						opacity: 1,
						scale: 1,
						rotate: rotation,
						ease: "power2.out",
						scrollTrigger: {
							trigger: containerRef.current,
							start: `top+=${startPoint}%`,
							end: `top+=${endPoint}%`,
							scrub: 1,
							snap: {
								snapTo: 1, // Snap to end of animation
								duration: 0.3,
								ease: "power2.inOut",
							},
						},
					})
				}
			})
		},
		{ scope: containerRef },
	)

	return (
		<section ref={containerRef} className="relative h-[400vh]">
			<div className="sticky top-0 mx-auto flex h-screen w-full max-w-308 items-center gap-8 px-6 py-16 sm:gap-16 sm:px-12 md:gap-20 md:px-16 lg:gap-30 lg:px-20 xl:px-24">
				<div className="flex w-full flex-col gap-6 sm:gap-8 md:gap-10 lg:w-152 lg:gap-12">
					{/* Title */}
					<h2
						ref={titleRef}
						className={cn(
							"font-medium text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px] xl:leading-22",
							"bg-linear-to-r from-white via-blue-100 to-blue-300",
							"bg-clip-text text-transparent",
						)}
					>
						Experience
					</h2>

					{/* Cards container */}
					<div className="relative w-full" style={{ height: "500px" }}>
						<div className="relative h-full w-full">
							{experience.map((job, index) => (
								<div
									key={job.id}
									ref={(el) => {
										cardsRef.current[index] = el
									}}
									style={{ transformOrigin: "center center" }}
								>
									<LiquidGlass
										variant="subtle"
										rounded="2xl"
										className="flex flex-col gap-6 bg-bg/80 p-4 backdrop-blur-xl sm:gap-8 sm:p-5 md:gap-10 md:p-6"
									>
										{/* Header */}
										<div className="flex flex-col gap-2 opacity-80">
											<h3
												className={cn(
													"font-medium text-lg sm:text-xl md:text-2xl",
													"bg-linear-to-r from-white via-blue-100 to-blue-300",
													"bg-clip-text text-transparent",
												)}
											>
												{`0${job.id}. ${job.title}`}
											</h3>
											<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
												<span className="text-base text-white sm:text-lg md:text-xl">
													{job.company}
												</span>
												<div className="hidden h-5 w-px bg-white/20 sm:block" />
												<span className="text-base text-white sm:text-lg md:text-xl">
													{job.period}
												</span>
											</div>
										</div>

										{/* Description */}
										<div className="flex flex-col gap-3 sm:gap-4">
											{job.description.map((desc, idx) => (
												<p
													key={idx}
													className="text-base text-white leading-relaxed sm:text-lg md:leading-[26px]"
												>
													{desc}
												</p>
											))}
										</div>
									</LiquidGlass>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Portrait anchor */}
				<div
					className="invisible hidden h-170 w-137 shrink-0 lg:block"
					data-portrait-anchor="experience"
				/>
			</div>
		</section>
	)
}
