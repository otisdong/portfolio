"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { LiquidGlass } from "~/shared/components/ui"
import { cn } from "~/shared/utils"
import { PORTFOLIO_DATA } from "../portfolio-constants"

export function ExperienceSection() {
	const { experience } = PORTFOLIO_DATA
	const containerRef = useRef<HTMLElement>(null)

	// Track scroll progress of this section
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	})

	// Transform scroll progress to opacity and position for title
	const titleOpacity = useTransform(
		scrollYProgress,
		[0, 0.1, 0.9, 1],
		[0, 1, 1, 0],
	)

	// Experience list container animations
	const listContainerOpacity = useTransform(
		scrollYProgress,
		[0, 0.1, 0.9, 1],
		[0, 1, 1, 0],
	)

	// Auto-translate experience list content
	const listContentY = useTransform(
		scrollYProgress,
		[0.1, 0.7], // Finish scrolling at 70%
		[0, -600], // Scroll up 600px
	)

	return (
		<section ref={containerRef} className="relative h-[300vh]">
			<div className="sticky top-0 mx-auto flex h-screen w-full max-w-308 items-center gap-8 px-6 py-16 sm:gap-16 sm:px-12 md:gap-20 md:px-16 lg:gap-30 lg:px-20 xl:px-24">
				<div className="flex w-full flex-col gap-6 sm:gap-8 md:gap-10 lg:w-152 lg:gap-12">
					{/* Title with fade animation */}
					<motion.h2
						style={{ opacity: titleOpacity }}
						className={cn(
							"font-medium text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px] xl:leading-22",
							"bg-linear-to-r from-white via-blue-100 to-blue-300",
							"bg-clip-text text-transparent",
						)}
					>
						Experience
					</motion.h2>

					{/* Timeline container with overflow and auto-scroll */}
					<motion.div
						style={{ opacity: listContainerOpacity }}
						className="relative flex max-h-[50vh] flex-col overflow-hidden sm:max-h-[55vh] md:max-h-[60vh]"
					>
						{/* Scrolling content */}
						<motion.div
							style={{ y: listContentY }}
							className="flex flex-col gap-4 sm:gap-5 md:gap-6"
						>
							{experience.map((job, index) => (
								<ExperienceCard
									key={job.id}
									job={job}
									index={index}
									scrollProgress={scrollYProgress}
									containerRef={containerRef}
								/>
							))}
						</motion.div>
					</motion.div>
				</div>
				{/* Invisible anchor image for animation reference */}
				<div
					className="invisible hidden h-170 w-137 shrink-0 lg:block"
					data-portrait-anchor="experience"
				/>
			</div>
		</section>
	)
}

interface ExperienceCardProps {
	job: (typeof PORTFOLIO_DATA.experience)[number]
	index: number
	scrollProgress: any
	containerRef: React.RefObject<HTMLElement | null>
}

function ExperienceCard({
	job,
	index,
	scrollProgress,
	containerRef,
}: ExperienceCardProps) {
	const cardRef = useRef<HTMLDivElement>(null)

	// Track card's position relative to container for fade out effect
	const { scrollYProgress: cardProgress } = useScroll({
		target: cardRef,
		container: containerRef,
		offset: ["start end", "end start"],
	})

	// Stagger timing - each card animates in sequence
	const start = 0.05 + index * 0.12 // Start earlier, closer timing
	const end = start + 0.15 // Faster reveal per card

	const cardOpacity = useTransform(
		scrollProgress,
		[start, end, 0.7, 1],
		[0, 1, 1, 0.8],
	)
	const cardY = useTransform(
		scrollProgress,
		[start, end],
		[80, 0], // Slide up from 80px below
	)

	// Fade out when card exits container (top or bottom)
	const fadeOpacity = useTransform(
		cardProgress,
		[0, 0.15, 0.85, 1],
		[0, 1, 1, 0],
	)

	// Combine both opacity effects
	const combinedOpacity = useTransform(
		[cardOpacity, fadeOpacity],
		([card, fade]) => (card as number) * (fade as number),
	)

	return (
		<motion.div ref={cardRef} style={{ opacity: combinedOpacity, y: cardY }}>
			<LiquidGlass
				variant="subtle"
				rounded="2xl"
				className="flex flex-col gap-6 bg-transparent p-4 sm:gap-8 sm:p-5 md:gap-10 md:p-6"
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
		</motion.div>
	)
}
