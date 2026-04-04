"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { PORTFOLIO_DATA } from "../portfolio-constants"

interface AnchorPosition {
	left: number
	top: number
	width: number
	height: number
}

export function FloatingPortrait() {
	const [heroPos, setHeroPos] = useState<AnchorPosition | null>(null)
	const [aboutPos, setAboutPos] = useState<AnchorPosition | null>(null)
	const [experiencePos, setExperiencePos] = useState<AnchorPosition | null>(
		null,
	)

	// Track overall page scroll - MUST be called before any conditional returns
	const { scrollYProgress } = useScroll()

	// Update anchor positions on mount and resize only (not scroll to prevent jitter)
	useEffect(() => {
		const updatePositions = () => {
			const heroAnchor = document.querySelector(
				'[data-portrait-anchor="hero"]',
			) as HTMLElement
			const aboutAnchor = document.querySelector(
				'[data-portrait-anchor="about"]',
			) as HTMLElement
			const experienceAnchor = document.querySelector(
				'[data-portrait-anchor="experience"]',
			) as HTMLElement

			if (heroAnchor) {
				const rect = heroAnchor.getBoundingClientRect()
				setHeroPos({
					left: rect.left + window.scrollX,
					top: rect.top + window.scrollY,
					width: rect.width,
					height: rect.height,
				})
			}
			if (aboutAnchor) {
				const rect = aboutAnchor.getBoundingClientRect()
				setAboutPos({
					left: rect.left + window.scrollX,
					top: rect.top + window.scrollY,
					width: rect.width,
					height: rect.height,
				})
			}
			if (experienceAnchor) {
				const rect = experienceAnchor.getBoundingClientRect()
				setExperiencePos({
					left: rect.left + window.scrollX,
					top: rect.top + window.scrollY,
					width: rect.width,
					height: rect.height,
				})
			}
		}

		// Initial update with delay to ensure DOM is ready
		setTimeout(updatePositions, 100)
		window.addEventListener("resize", updatePositions)

		return () => {
			window.removeEventListener("resize", updatePositions)
		}
	}, [])

	// Calculate position deltas with fallback values
	// const heroToAboutX = heroPos && aboutPos ? aboutPos.left - heroPos.left : 0
	// const heroToAboutY = heroPos && aboutPos ? aboutPos.top - heroPos.top : 0
	// const aboutToExpX =
	// 	heroPos && experiencePos ? experiencePos.left - heroPos.left : 0
	// const aboutToExpY =
	// 	heroPos && experiencePos ? experiencePos.top - heroPos.top : 0

	// Phase 1: Hero → About (scroll 10% to 30%)
	// Phase 2: About → Experience (scroll 40% to 60%)
	const left = useTransform(
		scrollYProgress,
		[0.1, 0.3, 0.4, 0.6],
		[
			heroPos?.left ?? 0,
			aboutPos?.left ?? 0,
			aboutPos?.left ?? 0,
			experiencePos?.left ?? 0,
		],
	)
	const top = useTransform(
		scrollYProgress,
		[0.1, 0.3, 0.4, 0.6],
		[
			heroPos?.top ?? 0,
			aboutPos?.top ?? 0,
			aboutPos?.top ?? 0,
			experiencePos?.top ?? 0,
		],
	)

	// Size animation through all phases
	const width = useTransform(
		scrollYProgress,
		[0.1, 0.3, 0.4, 0.6],
		[
			heroPos?.width ?? 0,
			aboutPos?.width ?? 0,
			aboutPos?.width ?? 0,
			experiencePos?.width ?? 0,
		],
	)
	const height = useTransform(
		scrollYProgress,
		[0.1, 0.3, 0.4, 0.6],
		[
			heroPos?.height ?? 0,
			aboutPos?.height ?? 0,
			aboutPos?.height ?? 0,
			experiencePos?.height ?? 0,
		],
	)

	// Opacity fade in and out
	const opacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0])

	// Border radius animation
	const borderRadius = useTransform(
		scrollYProgress,
		[0.1, 0.3, 0.4, 0.6],
		["16px", "16px", "16px", "16px"],
	)

	// Flip animation during transition to experience
	const rotateY = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 180, 360])

	// Early return AFTER all hooks
	if (!heroPos || !aboutPos || !experiencePos) {
		return null
	}

	return (
		<motion.div
			style={{
				position: "absolute",
				left,
				top,
				width,
				height,
				opacity,
				borderRadius,
				rotateY,
				zIndex: 40,
			}}
			className="overflow-hidden"
		>
			<img
				src={PORTFOLIO_DATA.personal.image}
				alt={PORTFOLIO_DATA.personal.name}
				className="h-full w-full object-cover"
			/>
		</motion.div>
	)
}
