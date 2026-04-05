"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMemo, useRef } from "react"
import { PORTFOLIO_DATA } from "../portfolio-constants"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function AboutSection() {
	const { personal } = PORTFOLIO_DATA
	const containerRef = useRef<HTMLElement>(null)
	const anchorImageRef = useRef<HTMLDivElement>(null)
	const bioContainerRef = useRef<HTMLDivElement>(null)
	const bioContentRef = useRef<HTMLDivElement>(null)

	// Split text into words
	const bioWords = useMemo(() => personal.bio.split(" "), [personal.bio])
	const bioSecondaryWords = useMemo(
		() => personal.bioSecondary.split(" "),
		[personal.bioSecondary],
	)

	const totalWords = bioWords.length + bioSecondaryWords.length

	useGSAP(
		() => {
			if (
				!containerRef.current ||
				!bioContainerRef.current ||
				!bioContentRef.current
			)
				return

			const bioContent = bioContentRef.current
			const bioContainer = bioContainerRef.current

			// Calculate scroll distance
			const contentHeight = bioContent.scrollHeight
			const containerHeight = bioContainer.clientHeight
			const scrollDistance = contentHeight - containerHeight

			// Responsive scrub value - slower on mobile
			const isMobile = window.innerWidth < 768
			const scrubValue = isMobile ? 2 : 1

			// Bio container scale and opacity animation
			gsap
				.timeline({
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top top",
						end: "bottom top",
						scrub: scrubValue,
					},
				})
				.fromTo(
					bioContainerRef.current,
					{ scale: 1.05, opacity: 0 },
					{ scale: 1, opacity: 1, duration: 0.05 },
					0,
				)
				.to(
					bioContainerRef.current,
					{ scale: 0.95, opacity: 0, duration: 0.05 },
					0.95,
				)

			// Auto-translate bio content from top to bottom (20% - 90%)
			gsap.fromTo(
				bioContent,
				{ y: 0 },
				{
					y: -scrollDistance,
					ease: "none",
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top+=20% top",
						end: "top+=90% top",
						scrub: scrubValue,
					},
				},
			)

			// Word-by-word reveal animations - start at 10%, end at 90%
			// Slower reveal on mobile with longer duration per word
			const revealDuration = isMobile ? 0.05 : 0.03
			const words = containerRef.current.querySelectorAll(".word-reveal")
			words.forEach((word, index) => {
				// Start at 10%, end at 90% (80% duration)
				const startProgress = 0.1 + (index / totalWords) * 0.8
				const endProgress = startProgress + revealDuration

				gsap.timeline({
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top top",
						end: "bottom top",
						scrub: scrubValue,
						onUpdate: (self) => {
							const progress = self.progress
							if (progress < startProgress) {
								gsap.set(word, {
									opacity: 0.3,
									y: -10,
									color: "rgb(148, 163, 184)",
								})
							} else if (progress >= startProgress && progress <= endProgress) {
								const wordProgress =
									(progress - startProgress) / (endProgress - startProgress)
								gsap.set(word, {
									opacity: gsap.utils.interpolate(0.3, 1, wordProgress),
									y: gsap.utils.interpolate(-10, 0, wordProgress),
									color: gsap.utils.interpolate(
										"rgb(148, 163, 184)",
										"rgb(255, 255, 255)",
										wordProgress,
									),
								})
							} else {
								gsap.set(word, {
									opacity: 1,
									y: 0,
									color: "rgb(255, 255, 255)",
								})
							}
						},
					},
				})
			})
		},
		{ scope: containerRef },
	)

	return (
		<section ref={containerRef} className="relative h-[600vh] md:h-[500vh]">
			<div className="sticky top-0 mx-auto flex h-screen w-full max-w-308 flex-col items-center justify-center gap-8 px-6 py-16 sm:gap-16 sm:px-12 md:gap-20 md:px-16 lg:flex-row lg:gap-30 lg:px-20 xl:px-24">
				{/* Invisible anchor image for animation reference */}
				<div
					ref={anchorImageRef}
					className="invisible h-80 w-full shrink-0 sm:h-120 md:h-140 lg:h-165 lg:w-126"
					data-portrait-anchor="about"
				/>

				{/* Bio Text with word-by-word color reveal and container shrink */}
				<div
					ref={bioContainerRef}
					className="relative flex h-auto max-h-[40vh] flex-col overflow-hidden sm:max-h-[45vh] md:max-h-[50vh] lg:h-165 lg:max-h-165"
				>
					{/* Scrolling content container */}
					<div
						ref={bioContentRef}
						className="flex flex-col gap-4 sm:gap-6 md:gap-8"
					>
						{/* Primary bio with word-by-word reveal */}
						<p className="text-base leading-relaxed sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] xl:leading-10.5">
							{bioWords.map((word, index) => (
								<WordReveal key={`bio-${index}`} word={word} index={index} />
							))}
						</p>

						{/* Secondary bio with word-by-word reveal */}
						<p className="text-base leading-relaxed sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] xl:leading-10.5">
							{bioSecondaryWords.map((word, index) => (
								<WordReveal
									key={`bio-secondary-${index}`}
									word={word}
									index={index + bioWords.length}
								/>
							))}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

interface WordRevealProps {
	word: string
	index: number
}

function WordReveal({ word }: WordRevealProps) {
	return (
		<>
			<span className="word-reveal inline-block">{word}</span>
			<span> </span>
		</>
	)
}
