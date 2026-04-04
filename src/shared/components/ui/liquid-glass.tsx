import { forwardRef } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "~/shared/utils"

/**
 * LiquidGlass - Ultra-Vibrant Apple-style Liquid Glass component
 *
 * Features:
 * - Ultra-high saturation (3.5x) + brightness lift for vibrant color bleeding
 * - No hard borders - edge definition via inset shadows only
 * - Volumetric hover interactions (simulates pressing into liquid surface)
 * - macOS-style crisp layered shadows
 * - CSS-only animations for performance
 */

const liquidGlassStyles = tv({
	base: [
		// Base glass layer
		"relative isolate overflow-hidden",
		// Spring-physics transitions
		"transition-all duration-500",
		"[transition-timing-function:cubic-bezier(0.25,1,0.5,1)]",
		"[transform-style:preserve-3d]",
	],
	variants: {
		variant: {
			default: [
				// Gentle liquid glass with moderate saturation
				"bg-[var(--glass-bg)]",
				"[backdrop-filter:blur(var(--glass-blur))_saturate(1.8)_brightness(1.05)_contrast(1.01)]",
				"[-webkit-backdrop-filter:blur(var(--glass-blur))_saturate(1.8)_brightness(1.05)_contrast(1.01)]",
				// No hard borders - only shadow-based edge definition
				"border-none",
				"shadow-[var(--glass-shadow)]",
				// Content z-index
				"[&>*]:relative [&>*]:z-[2]",
			],
			subtle: [
				// Minimal saturation for subtle effect - darker and clearer
				"bg-[rgba(0,0,0,0.04)]",
				"[backdrop-filter:blur(28px)_saturate(1.3)_brightness(1.02)_contrast(1.00)]",
				"[-webkit-backdrop-filter:blur(28px)_saturate(1.3)_brightness(1.02)_contrast(1.00)]",
				"border-none",
				"shadow-[0_2px_4px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.03),inset_0_0_0_1px_rgba(255,255,255,0.20),inset_0_1px_0_rgba(255,255,255,0.25)]",
				"[&>*]:relative [&>*]:z-[2]",
			],
			frosted: [
				// Enhanced saturation for frosted glass effect - darker and clearer
				"bg-[rgba(0,0,0,0.06)]",
				"[backdrop-filter:blur(52px)_saturate(2.0)_brightness(1.04)_contrast(1.01)]",
				"[-webkit-backdrop-filter:blur(52px)_saturate(2.0)_brightness(1.04)_contrast(1.01)]",
				"border-none",
				"shadow-[0_4px_8px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.05),0_32px_80px_rgba(0,0,0,0.03),inset_0_0_0_1px_rgba(255,255,255,0.30),inset_0_1px_0_rgba(255,255,255,0.40)]",
				"[&>*]:relative [&>*]:z-[2]",
			],
			premium: [
				// Premium with balanced saturation and tint glow - darker and clearer
				"bg-[rgba(0,0,0,0.08)]",
				"[backdrop-filter:blur(44px)_saturate(1.8)_brightness(1.04)_contrast(1.01)]",
				"[-webkit-backdrop-filter:blur(44px)_saturate(1.8)_brightness(1.04)_contrast(1.01)]",
				"border-none",
				"shadow-[var(--glass-shadow)]",
				"[&>*]:relative [&>*]:z-[2]",
			],
		},
		rounded: {
			none: "rounded-none",
			sm: "rounded-sm",
			md: "rounded-md",
			lg: "rounded-lg",
			xl: "rounded-xl",
			"2xl": "rounded-[var(--glass-radius)]",
			full: "rounded-full",
		},
		interactive: {
			true: [
				// Volumetric press effect on hover
				"hover:bg-[var(--glass-bg-hover)]",
				"hover:shadow-[var(--glass-shadow-hover)]",
				"hover:-translate-y-1",
				"hover:scale-[0.995]",
				// Gentle refraction surge on interaction
				"hover:[backdrop-filter:blur(var(--glass-blur))_saturate(2.2)_brightness(1.08)_contrast(1.02)]",
				"hover:[-webkit-backdrop-filter:blur(var(--glass-blur))_saturate(2.2)_brightness(1.08)_contrast(1.02)]",
				// Active state
				"active:scale-[0.99]",
			],
			false: "",
		},
	},
	compoundVariants: [
		{
			variant: "subtle",
			interactive: true,
			class: [
				"hover:bg-[rgba(0,0,0,0.08)]",
				"hover:[backdrop-filter:blur(28px)_saturate(1.6)_brightness(1.04)_contrast(1.01)]",
				"hover:[-webkit-backdrop-filter:blur(28px)_saturate(1.6)_brightness(1.04)_contrast(1.01)]",
			],
		},
		{
			variant: "frosted",
			interactive: true,
			class: [
				"hover:bg-[rgba(0,0,0,0.10)]",
				"hover:[backdrop-filter:blur(52px)_saturate(2.4)_brightness(1.06)_contrast(1.02)]",
				"hover:[-webkit-backdrop-filter:blur(52px)_saturate(2.4)_brightness(1.06)_contrast(1.02)]",
			],
		},
		{
			variant: "premium",
			interactive: true,
			class: ["hover:bg-[rgba(0,0,0,0.12)]"],
		},
	],
	defaultVariants: {
		variant: "default",
		rounded: "2xl",
		interactive: false,
	},
})

export interface LiquidGlassProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof liquidGlassStyles> {
	/**
	 * Content to render inside the glass container
	 */
	children?: React.ReactNode
	/**
	 * Additional CSS class names
	 */
	className?: string
	/**
	 * HTML element tag (default: div)
	 */
	as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "nav"
}

const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(
	(
		{
			children,
			className,
			variant,
			rounded,
			interactive,
			as: Component = "div",
			...props
		},
		ref,
	) => {
		return (
			<Component
				ref={ref}
				className={cn(
					liquidGlassStyles({ variant, rounded, interactive }),
					className,
				)}
				{...props}
			>
				{children}
			</Component>
		)
	},
)

LiquidGlass.displayName = "LiquidGlass"

export { LiquidGlass, liquidGlassStyles }
