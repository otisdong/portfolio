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
			<div className="sticky top-0 mx-auto flex h-screen w-full max-w-308 items-center gap-30 px-6 py-24 sm:px-12 md:px-24 lg:px-0">
				<div className="flex w-full flex-col gap-12 lg:w-152">
					{/* Title with fade animation */}
					<motion.h2
						style={{ opacity: titleOpacity }}
						className={cn(
							"font-medium text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] xl:leading-22",
							"bg-linear-to-r from-white via-blue-100 to-blue-300",
							"bg-clip-text text-transparent",
						)}
					>
						Experience
					</motion.h2>

					{/* Timeline container with overflow and auto-scroll */}
					<motion.div
						style={{ opacity: listContainerOpacity }}
						className="relative flex max-h-[60vh] flex-col overflow-hidden"
					>
						{/* Top fade gradient */}
						<div className="pointer-events-none absolute top-0 left-0 z-10 h-20 w-full bg-gradient-to-b from-[#010619] to-transparent" />

						{/* Scrolling content */}
						<motion.div
							style={{ y: listContentY }}
							className="flex flex-col gap-6"
						>
							{experience.map((job, index) => (
								<ExperienceCard
									key={job.id}
									job={job}
									index={index}
									scrollProgress={scrollYProgress}
								/>
							))}
						</motion.div>

						{/* Bottom fade gradient */}
						<div className="pointer-events-none absolute bottom-0 left-0 z-10 h-20 w-full bg-gradient-to-t from-[#010619] to-transparent" />
					</motion.div>
				</div>
				{/* Image Card */}
				<div className="hidden h-170 w-137 shrink-0 overflow-hidden rounded-2xl bg-[rgba(133,160,245,0.05)] lg:block" />
			</div>
		</section>
	)
}

interface ExperienceCardProps {
	job: (typeof PORTFOLIO_DATA.experience)[number]
	index: number
	scrollProgress: any
}

function ExperienceCard({ job, index, scrollProgress }: ExperienceCardProps) {
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

	return (
		<motion.div style={{ opacity: cardOpacity, y: cardY }}>
			<LiquidGlass
				variant="premium"
				rounded="2xl"
				className="flex flex-col gap-10 p-6"
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
			</LiquidGlass>
		</motion.div>
	)
}
