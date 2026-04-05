"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { LiquidGlass } from "~/shared/components/ui"
import { cn } from "~/shared/utils"
import { PORTFOLIO_DATA } from "../portfolio-constants"

gsap.registerPlugin(useGSAP)

export function HeroSection() {
	const anchorImageRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const designCardRef = useRef<HTMLDivElement>(null)
	const softwareCardRef = useRef<HTMLDivElement>(null)

	// Sequential fade-in animations
	useGSAP(() => {
		// Set initial opacity to 0
		gsap.set(
			[titleRef.current, designCardRef.current, softwareCardRef.current],
			{
				opacity: 0,
			},
		)

		// Stagger fade-in with delays
		gsap.to(titleRef.current, {
			opacity: 1,
			duration: 0.8,
			ease: "power2.out",
			delay: 0.4,
		})

		gsap.to(designCardRef.current, {
			opacity: 1,
			duration: 0.8,
			ease: "power2.out",
			delay: 0.8,
		})

		gsap.to(softwareCardRef.current, {
			opacity: 1,
			duration: 0.8,
			ease: "power2.out",
			delay: 1.2,
		})
	}, [])

	return (
		<section className="relative flex min-h-screen w-full max-w-308 flex-col items-center justify-center gap-12 px-6 pt-32 pb-16 sm:gap-16 sm:px-12 sm:pt-36 md:gap-22 md:px-16 md:pt-24 lg:mx-auto lg:gap-22 lg:px-20 xl:px-24">
			{/* Gradient Title */}
			<h1
				ref={titleRef}
				className={cn(
					"text-center font-medium text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] xl:leading-24",
					"bg-linear-to-r from-white via-blue-100 to-blue-300",
					"bg-clip-text text-transparent",
				)}
			>
				Designing Purpose-Driven Interfaces and Seamless User Journeys
			</h1>

			{/* Skills Grid */}
			<div className="flex w-full flex-col gap-4 md:flex-row">
				{/* Design Skills Card */}
				<LiquidGlass
					ref={designCardRef}
					variant="subtle"
					rounded="2xl"
					className="flex h-77.5 w-full flex-col gap-2 p-6 md:w-126"
				>
					<div className="flex flex-wrap gap-2">
						<SkillTag>User flow</SkillTag>
						<SkillTag>Wireframe</SkillTag>
					</div>
					<div className="flex flex-wrap gap-2">
						<SkillTag>Visual Design</SkillTag>
						<SkillTag>Design System</SkillTag>
					</div>
					<div className="flex flex-wrap gap-2">
						<SkillTag>UX Research</SkillTag>
						<SkillTag>Info Architecture</SkillTag>
					</div>
					<div className="flex flex-wrap gap-2">
						<SkillTag>Content Video</SkillTag>
						<SkillTag>Edit Video</SkillTag>
					</div>
				</LiquidGlass>

				{/* Software Skills Card */}
				<div
					ref={softwareCardRef}
					className="flex h-77.5 w-full flex-col justify-between rounded-2xl bg-linear-to-b from-blue-50 to-blue-200 p-6 md:w-100"
				>
					<div className="flex flex-col gap-2">
						{PORTFOLIO_DATA.skills.software.slice(0, 3).map((_, idx) => (
							<div key={idx} className="flex gap-2">
								{PORTFOLIO_DATA.skills.software
									.slice(idx * 2, idx * 2 + 2)
									.map((software) => (
										<SoftwareTag key={software.name} icon={software.icon}>
											{software.name}
										</SoftwareTag>
									))}
							</div>
						))}
					</div>
					<p className="font-medium text-2xl text-black">Software Skills</p>
				</div>

				{/* Invisible anchor image for animation reference */}
				<div
					ref={anchorImageRef}
					className="invisible h-77.5 w-full md:w-74 lg:w-126"
					data-portrait-anchor="hero"
				/>
			</div>
		</section>
	)
}

interface SkillTagProps {
	children: React.ReactNode
}

function SkillTag({ children }: SkillTagProps) {
	return (
		<LiquidGlass variant="subtle" rounded="xl" className="px-4 py-2">
			<span className="font-normal text-white text-xl">{children}</span>
		</LiquidGlass>
	)
}

interface SoftwareTagProps {
	icon: string | null
	children: React.ReactNode
}

function SoftwareTag({ icon, children }: SoftwareTagProps) {
	return (
		<div className="flex items-center gap-2 rounded-xl border border-zinc-400 bg-white/5 p-2">
			<div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded bg-white">
				{icon ? (
					<img
						src={icon}
						alt={String(children)}
						className="h-full w-full object-contain"
					/>
				) : (
					<span className="font-bold text-black text-lg">AI</span>
				)}
			</div>
			<span className="font-normal text-black text-xl">{children}</span>
		</div>
	)
}
