"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useMemo, useRef } from "react"
import { PORTFOLIO_DATA } from "../portfolio-constants"

export function AboutSection() {
	const { personal } = PORTFOLIO_DATA
	const containerRef = useRef<HTMLElement>(null)

	// Track scroll progress of this section
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	})

	// Image animations
	const imageScale = useTransform(
		scrollYProgress,
		[0, 0.3, 0.7, 1],
		[0.95, 1, 1, 0.98],
	)
	const imageOpacity = useTransform(
		scrollYProgress,
		[0, 0.2, 0.8, 1],
		[0.7, 1, 1, 0.8],
	)

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
		[0, -800], // Scroll up 800px over the section
	)

	// Split text into words
	const bioWords = useMemo(() => personal.bio.split(" "), [personal.bio])
	const bioSecondaryWords = useMemo(
		() => personal.bioSecondary.split(" "),
		[personal.bioSecondary],
	)

	const totalWords = bioWords.length + bioSecondaryWords.length

	return (
		<section ref={containerRef} className="relative h-[200vh]">
			<div className="sticky top-0 mx-auto flex h-screen w-full max-w-308 flex-col items-center justify-center gap-30 px-6 py-24 sm:px-12 md:px-24 lg:flex-row lg:px-0">
				{/* Image with scale animation */}
				<motion.div
					style={{ scale: imageScale, opacity: imageOpacity }}
					className="relative h-165 w-full shrink-0 lg:w-126"
				>
					<img
						src={personal.image}
						alt={personal.name}
						className="h-full w-full rounded-[40px] object-cover"
					/>
				</motion.div>

				{/* Bio Text with word-by-word color reveal and container shrink */}
				<motion.div
					style={{ scale: bioScale, opacity: bioContainerOpacity }}
					className="relative flex h-165 max-h-[50vh] flex-col overflow-hidden lg:max-h-165"
				>
					{/* Scrolling content container */}
					<motion.div
						style={{ y: bioContentY }}
						className="flex flex-col gap-8"
					>
						{/* Primary bio with word-by-word reveal */}
						<p className="text-lg leading-relaxed sm:text-xl md:text-2xl lg:text-3xl xl:text-[32px] xl:leading-[42px]">
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
						<p className="text-lg leading-relaxed sm:text-xl md:text-2xl lg:text-3xl xl:text-[32px] xl:leading-[42px]">
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
