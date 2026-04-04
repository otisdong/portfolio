import { forwardRef } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "~/shared/utils"

/**
 * LiquidGlass - Apple-style Liquid Glass component
 *
 * Features:
 * - Base translucent layer
 * - Backdrop blur
 * - Inner highlight gradient
 * - Edge highlight (top border glow)
 * - Micro noise texture
 * - Soft depth with inner shadows
 */

const liquidGlassStyles = tv({
	base: [
		// Base glass layer
		"relative isolate overflow-hidden",

		// Inner highlight layer (::before) - will be set per variant
		"before:absolute before:inset-0 before:-z-10",

		// Top edge glow (::after) - will be set per variant
		"after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]",
		"after:bg-gradient-to-b after:via-transparent after:to-transparent",
	],
	variants: {
		variant: {
			default: [
				// Base layer
				"bg-[rgba(255,255,255,0.05)] backdrop-blur-[12px]",
				"border border-[rgba(255,255,255,0.15)]",
				"shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)]",
				// Inner gradient
				"before:bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_60%)]",
				"before:opacity-60",
				// Edge glow
				"after:from-white/25",
				// Noise texture
				"viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")] [background-image:url(\"data:image/svg+xml,%3Csvg",
			],
			subtle: [
				"bg-[rgba(255,255,255,0.03)] backdrop-blur-[8px]",
				"border border-[rgba(255,255,255,0.1)]",
				"shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.05)]",
				"before:bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_50%)]",
				"before:opacity-50",
				"after:from-white/15",
			],
			frosted: [
				"bg-[rgba(255,255,255,0.08)] backdrop-blur-[20px]",
				"border border-[rgba(255,255,255,0.2)]",
				"shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]",
				"before:bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_0%,transparent_70%)]",
				"before:opacity-70",
				"after:from-white/30",
				"viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")] [background-image:url(\"data:image/svg+xml,%3Csvg",
			],
			premium: [
				"bg-[rgba(255,255,255,0.06)] backdrop-blur-[16px]",
				"border border-[rgba(255,255,255,0.18)]",
				"shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_8px_32px_rgba(0,0,0,0.12),inset_0_2px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.05)]",
				"before:bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_50%,transparent_100%)]",
				"before:opacity-80",
				"after:from-white/35",
				"viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")] [background-image:url(\"data:image/svg+xml,%3Csvg",
			],
		},
		rounded: {
			none: "rounded-none",
			sm: "rounded-sm",
			md: "rounded-md",
			lg: "rounded-lg",
			xl: "rounded-xl",
			"2xl": "rounded-2xl",
			full: "rounded-full",
		},
		interactive: {
			true: [
				"transition-all duration-300 ease-out",
				"hover:before:opacity-100",
				"active:scale-[0.98]",
			],
			false: "",
		},
	},
	compoundVariants: [
		{
			variant: "default",
			interactive: true,
			class: [
				"hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]",
				"hover:border-[rgba(255,255,255,0.25)]",
			],
		},
		{
			variant: "premium",
			interactive: true,
			class: [
				"hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_12px_48px_rgba(0,0,0,0.18),inset_0_2px_0_rgba(255,255,255,0.25)]",
				"hover:border-[rgba(255,255,255,0.3)]",
			],
		},
	],
	defaultVariants: {
		variant: "default",
		rounded: "xl",
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
				{/* Content wrapper with z-index to ensure it's above pseudo-elements */}
				<div className="relative z-10">{children}</div>
			</Component>
		)
	},
)

LiquidGlass.displayName = "LiquidGlass"

export { LiquidGlass, liquidGlassStyles }
