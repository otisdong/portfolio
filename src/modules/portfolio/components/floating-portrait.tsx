"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
import { PORTFOLIO_DATA } from "../portfolio-constants"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function FloatingPortrait() {
	const containerRef = useRef<HTMLDivElement>(null)
	const frontImageRef = useRef<HTMLImageElement>(null)
	const backImageRef = useRef<HTMLImageElement>(null)

	// Dynamic animation that tracks ghost positions during scroll
	useGSAP(() => {
		if (!containerRef.current) return

		const getGhostPosition = (selector: string) => {
			const element = document.querySelector(selector) as HTMLElement
			if (!element) return null
			const rect = element.getBoundingClientRect()
			return {
				left: rect.left,
				top: rect.top,
				width: rect.width,
				height: rect.height,
			}
		}

		const getContainerLeftEdge = () => {
			const aboutSection = document
				.querySelector('[data-portrait-anchor="about"]')
				?.closest("section")
			if (!aboutSection) return 0

			const stickyDiv = aboutSection.querySelector(".sticky") as HTMLElement
			if (!stickyDiv) return 0

			const rect = stickyDiv.getBoundingClientRect()
			const computedStyle = window.getComputedStyle(stickyDiv)
			const paddingLeft = Number.parseFloat(computedStyle.paddingLeft) || 0

			return rect.left + paddingLeft
		}

		const getAboutPosition = () => {
			const ghost = getGhostPosition('[data-portrait-anchor="about"]')
			if (!ghost) return null

			const containerLeft = getContainerLeftEdge()
			const viewportHeight = window.innerHeight

			return {
				left: containerLeft,
				top: (viewportHeight - ghost.height) / 2,
				width: ghost.width,
				height: ghost.height,
			}
		}

		const getExperiencePosition = () => {
			const ghost = getGhostPosition('[data-portrait-anchor="experience"]')
			if (!ghost) return null

			const experienceSection = document
				.querySelector('[data-portrait-anchor="experience"]')
				?.closest("section")
			if (!experienceSection) return ghost

			const stickyDiv = experienceSection.querySelector(
				".sticky",
			) as HTMLElement
			if (!stickyDiv) return ghost

			const containerRect = stickyDiv.getBoundingClientRect()
			const computedStyle = window.getComputedStyle(stickyDiv)
			const paddingRight = Number.parseFloat(computedStyle.paddingRight) || 0

			const viewportHeight = window.innerHeight

			return {
				left: containerRect.right - ghost.width - paddingRight,
				top: (viewportHeight - ghost.height) / 2,
				width: ghost.width,
				height: ghost.height,
			}
		}

		// Get hero section to calculate timeline
		const heroSection = document
			.querySelector('[data-portrait-anchor="hero"]')
			?.closest("section")
		const aboutSection = document
			.querySelector('[data-portrait-anchor="about"]')
			?.closest("section")
		const experienceSection = document
			.querySelector('[data-portrait-anchor="experience"]')
			?.closest("section")

		if (!heroSection || !aboutSection || !experienceSection) return

		// Calculate scroll progress breakpoints based on section positions
		const aboutStart = aboutSection.offsetTop / document.body.scrollHeight
		const experienceStart =
			experienceSection.offsetTop / document.body.scrollHeight
		const experienceEnd =
			(experienceSection.offsetTop + experienceSection.offsetHeight) /
			document.body.scrollHeight

		// Initialize with hero position after a delay to ensure layout is ready
		setTimeout(() => {
			const initialHero = getGhostPosition('[data-portrait-anchor="hero"]')
			if (initialHero && containerRef.current) {
				// Set initial position
				gsap.set(containerRef.current, {
					left: initialHero.left,
					top: initialHero.top,
					width: initialHero.width,
					height: initialHero.height,
					opacity: 0,
					y: 0,
				})

				// Fade in
				gsap.to(containerRef.current, {
					opacity: 1,
					duration: 0.8,
					ease: "power2.out",
					delay: 0.2,
				})
			}
		}, 200)

		ScrollTrigger.create({
			trigger: "body",
			start: "top top",
			end: "bottom bottom",
			scrub: 1,
			onUpdate: (self) => {
				const progress = self.progress
				const container = containerRef.current
				if (!container) return

				const hero = getGhostPosition('[data-portrait-anchor="hero"]')
				const about = getAboutPosition()
				const experience = getExperiencePosition()

				if (!hero || !about || !experience) return

				// Phase 1: Hero → About transition (0% → aboutStart)
				if (progress < aboutStart) {
					const transitionProgress = progress / aboutStart
					gsap.set(container, {
						left: gsap.utils.interpolate(
							hero.left,
							about.left,
							transitionProgress,
						),
						top: gsap.utils.interpolate(
							hero.top,
							about.top,
							transitionProgress,
						),
						width: gsap.utils.interpolate(
							hero.width,
							about.width,
							transitionProgress,
						),
						height: gsap.utils.interpolate(
							hero.height,
							about.height,
							transitionProgress,
						),
						opacity: 1,
						rotateY: 0,
					})
				}
				// Phase 2: Stay at About position (aboutStart → experienceStart)
				else if (progress >= aboutStart && progress < experienceStart) {
					gsap.set(container, {
						left: about.left,
						top: about.top,
						width: about.width,
						height: about.height,
						opacity: 1,
						rotateY: 0,
					})
				}
				// Phase 3: About → Experience flip transition (experienceStart → experienceStart + 0.1)
				else if (
					progress >= experienceStart &&
					progress < experienceStart + 0.1
				) {
					const transitionProgress = (progress - experienceStart) / 0.1
					gsap.set(container, {
						left: gsap.utils.interpolate(
							about.left,
							experience.left,
							transitionProgress,
						),
						top: gsap.utils.interpolate(
							about.top,
							experience.top,
							transitionProgress,
						),
						width: gsap.utils.interpolate(
							about.width,
							experience.width,
							transitionProgress,
						),
						height: gsap.utils.interpolate(
							about.height,
							experience.height,
							transitionProgress,
						),
						opacity: 1,
						rotateY: transitionProgress * 180,
					})
				}
				// Phase 4: Stay at Experience position (experienceStart + 0.1 → experienceEnd - 0.05)
				else if (
					progress >= experienceStart + 0.1 &&
					progress < experienceEnd - 0.05
				) {
					gsap.set(container, {
						left: experience.left,
						top: experience.top,
						width: experience.width,
						height: experience.height,
						opacity: 1,
						rotateY: 180,
					})
				}
				// Phase 5: Fade out upward (experienceEnd - 0.05 → experienceEnd)
				else if (progress >= experienceEnd - 0.05) {
					const fadeProgress = (progress - (experienceEnd - 0.05)) / 0.05
					gsap.set(container, {
						left: experience.left,
						top: experience.top,
						width: experience.width,
						height: experience.height,
						opacity: 1 - fadeProgress,
						rotateY: 180,
						y: -100 * fadeProgress,
					})
				}
			},
		})
	}, [])

	return (
		<div
			ref={containerRef}
			style={{
				position: "fixed",
				borderRadius: "16px",
				zIndex: 40,
				transformStyle: "preserve-3d",
			}}
			className="overflow-hidden"
		>
			{/* Front face - original portrait */}
			<img
				ref={frontImageRef}
				src={PORTFOLIO_DATA.personal.image}
				alt={PORTFOLIO_DATA.personal.name}
				className="h-full w-full object-cover"
				style={{
					position: "absolute",
					backfaceVisibility: "hidden",
				}}
			/>
			{/* Back face - placeholder */}
			<img
				ref={backImageRef}
				src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop"
				alt="Back portrait"
				className="h-full w-full object-cover"
				style={{
					position: "absolute",
					backfaceVisibility: "hidden",
					transform: "rotateY(180deg)",
				}}
			/>
		</div>
	)
}
