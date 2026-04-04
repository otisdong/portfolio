"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useMemo, useRef } from "react"
import { PORTFOLIO_DATA } from "../portfolio-constants"

export function AboutSection() {
	const { personal } = PORTFOLIO_DATA
	const containerRef = useRef<HTMLElement>(null)
	const anchorImageRef = useRef<HTMLDivElement>(null)

	// Track scroll progress of this section
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	})

	// Bio container shrink animation
	const bioScale = useTransform(
		scrollYProgress,
		[0, 0.15, 0.85, 1],
		[1.05, 1, 1, 0.95],
	)
	const bioContainerOpacity = useTransform(
		scrollYProgress,
		[0, 0.1, 0.9, 1],
		[0, 1, 1, 0],
	)

	// Bio content vertical translation - slower scroll for better readability
	// Assumes bio content is ~1200px tall, will translate up by -800px
	const bioContentY = useTransform(
		scrollYProgress,
		[0.1, 0.7], // Finish scrolling at 70% instead of 90%
		[0, -300], // Scroll up 800px over the section
	)

	// Split text into words
	const bioWords = useMemo(() => personal.bio.split(" "), [personal.bio])
	const bioSecondaryWords = useMemo(
		() => personal.bioSecondary.split(" "),
		[personal.bioSecondary],
	)

	const totalWords = bioWords.length + bioSecondaryWords.length

	return (
		<section ref={containerRef} className="relative h-[500vh]">
			<div className="sticky top-0 mx-auto flex h-screen w-full max-w-308 flex-col items-center justify-center gap-8 px-6 py-16 sm:gap-16 sm:px-12 md:gap-20 md:px-16 lg:flex-row lg:gap-30 lg:px-20 xl:px-24">
				{/* Invisible anchor image for animation reference */}
				<div
					ref={anchorImageRef}
					className="invisible h-80 w-full shrink-0 sm:h-120 md:h-140 lg:h-165 lg:w-126"
					data-portrait-anchor="about"
				/>

				{/* Bio Text with word-by-word color reveal and container shrink */}
				<motion.div
					style={{ scale: bioScale, opacity: bioContainerOpacity }}
					className="relative flex h-auto max-h-[40vh] flex-col overflow-hidden sm:max-h-[45vh] md:max-h-[50vh] lg:h-165 lg:max-h-165"
				>
					{/* Scrolling content container */}
					<motion.div
						style={{ y: bioContentY }}
						className="flex flex-col gap-4 sm:gap-6 md:gap-8"
					>
						{/* Primary bio with word-by-word reveal */}
						<p className="text-base leading-relaxed sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] xl:leading-10.5">
							{bioWords.map((word, index) => (
								<WordReveal
									key={`bio-${index}`}
									word={word}
									index={index}
									totalWords={totalWords}
									scrollProgress={scrollYProgress}
								/>
							))}
						</p>

						{/* Secondary bio with word-by-word reveal */}
						<p className="text-base leading-relaxed sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] xl:leading-10.5">
							{bioSecondaryWords.map((word, index) => (
								<WordReveal
									key={`bio-secondary-${index}`}
									word={word}
									index={index + bioWords.length}
									totalWords={totalWords}
									scrollProgress={scrollYProgress}
								/>
							))}
						</p>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}

interface WordRevealProps {
	word: string
	index: number
	totalWords: number
	scrollProgress: any
}

function WordReveal({
	word,
	index,
	totalWords,
	scrollProgress,
}: WordRevealProps) {
	// Calculate timing for this specific word - finish all animations by 60%
	const startProgress = 0.02 + (index / totalWords) * 0.48 // Start from 2%, end at 50%
	const endProgress = startProgress + 0.008 // Slightly wider 0.8% window for smoother transition

	const opacity = useTransform(
		scrollProgress,
		[startProgress, endProgress],
		[0.3, 1],
	)

	const y = useTransform(scrollProgress, [startProgress, endProgress], [10, 0])

	// Sharp color transition - all words complete by 60% of scroll
	const color = useTransform(
		scrollProgress,
		[startProgress, Math.min(endProgress, 0.6)],
		["rgb(148, 163, 184)", "rgb(255, 255, 255)"], // slate-400 -> white
	)

	return (
		<>
			<motion.span style={{ opacity, y, color }} className="inline-block">
				{word}
			</motion.span>
			<span> </span>
		</>
	)
}
