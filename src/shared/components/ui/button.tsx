import {
	Button as ButtonPrimitive,
	type ButtonProps as ButtonPrimitiveProps,
	composeRenderProps,
} from "react-aria-components"
import { tv, type VariantProps } from "tailwind-variants"

const buttonStyles = tv({
	base: [
		"[--btn-icon-active:var(--btn-fg)] [--btn-outline:var(--btn-bg)] [--btn-ring:var(--btn-bg)]/20",
		"bg-(--btn-bg) pressed:bg-(--btn-overlay) text-(--btn-fg) outline-(--btn-outline) ring-(--btn-ring) hover:bg-(--btn-overlay)",
		"relative inset-ring inset-ring-fg/15 isolate inline-flex cursor-pointer items-center justify-center font-medium",
		"focus:outline-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:ring-2 focus-visible:ring-offset-3 focus-visible:ring-offset-bg",
		"*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) pressed:*:data-[slot=icon]:text-(--btn-icon-active) focus-visible:*:data-[slot=icon]:text-(--btn-icon-active)/80 hover:*:data-[slot=icon]:text-(--btn-icon-active)/90 sm:*:data-[slot=icon]:my-0 forced-colors:[--btn-icon:ButtonText] forced-colors:hover:[--btn-icon:ButtonText]",
		"*:data-[slot=loader]:-mx-0.5 *:data-[slot=loader]:my-0 *:data-[slot=loader]:shrink-0 *:data-[slot=loader]:self-center *:data-[slot=loader]:text-(--btn-icon) sm:*:data-[slot=loader]:my-0",
	],
	variants: {
		intent: {
			primary:
				"[--btn-bg:var(--color-primary)] [--btn-fg:var(--color-primary-fg)] [--btn-icon:color-mix(in_oklab,var(--primary-fg)_60%,var(--primary))] [--btn-overlay:var(--color-primary)]/85",
			secondary:
				"[--btn-bg:var(--color-secondary)] [--btn-fg:var(--color-secondary-fg)] [--btn-icon:var(--color-muted-fg)] [--btn-outline:var(--color-secondary-fg)] [--btn-overlay:var(--color-secondary)]/85 [--btn-ring:var(--color-muted-fg)]/20",
			warning:
				"[--btn-bg:var(--color-warning)] [--btn-fg:var(--color-warning-fg)] [--btn-icon:color-mix(in_oklab,var(--warning-fg)_60%,var(--warning))] [--btn-overlay:var(--color-warning)]/85",
			danger:
				"[--btn-bg:var(--color-danger)] [--btn-fg:var(--color-danger-fg)] [--btn-icon:color-mix(in_oklab,var(--danger-fg)_60%,var(--danger))] [--btn-overlay:var(--color-danger)]/85",
			outline:
				"inset-ring-border [--btn-bg:transparent] [--btn-icon:var(--color-muted-fg)] [--btn-outline:var(--color-ring)] [--btn-overlay:var(--color-muted)] [--btn-ring:var(--color-ring)]/20",
			plain:
				"inset-ring-transparent [--btn-bg:transparent] [--btn-icon:var(--color-muted-fg)] [--btn-outline:var(--color-ring)] [--btn-overlay:var(--color-muted)] [--btn-ring:var(--color-ring)]/20",
			glass: [
				"[--btn-bg:transparent] [--btn-fg:var(--color-fg)] [--btn-icon:var(--color-fg)] [--btn-outline:transparent] [--btn-ring:transparent]",
				"inset-ring-0 isolate overflow-hidden",
				// Liquid Glass System
				"bg-[rgba(255,255,255,0.05)] backdrop-blur-[12px]",
				"border border-[rgba(255,255,255,0.15)]",
				"shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)]",
				// Inner gradient highlight
				"before:absolute before:inset-0 before:-z-10",
				"before:bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_60%)]",
				"before:opacity-60",
				// Top edge glow
				"after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]",
				"after:bg-gradient-to-b after:from-white/25 after:via-transparent after:to-transparent",
				// Noise texture
				"viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E\")] [background-image:url(\"data:image/svg+xml,%3Csvg",
				// Hover states
				"hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]",
				"hover:border-[rgba(255,255,255,0.25)]",
				"hover:before:opacity-100",
				// Pressed state
				"pressed:scale-[0.98] active:scale-95",
				"transition-all duration-300 ease-out",
			],
		},
		size: {
			xs: [
				"min-h-7.5 gap-x-1 px-2.5 py-1.5 text-sm sm:min-h-7 sm:px-2 sm:py-[--spacing(1.4)] sm:text-xs/4",
				"*:data-[slot=icon]:size-3.5 sm:*:data-[slot=icon]:size-3",
				"*:data-[slot=loader]:size-3.5 sm:*:data-[slot=loader]:size-3",
			],
			sm: [
				"min-h-8.5 gap-x-1.5 px-3 py-1.5 text-sm/5 sm:min-h-8 sm:px-2.5 sm:py-1.5",
				"*:data-[slot=icon]:size-4.5 sm:*:data-[slot=icon]:size-4",
				"*:data-[slot=loader]:size-4.5 sm:*:data-[slot=loader]:size-4",
			],
			md: [
				"min-h-9.5 gap-x-2 px-3.5 py-2 sm:min-h-9 sm:px-3 sm:py-1.5 sm:text-sm/6",
				"*:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:size-4",
				"*:data-[slot=loader]:size-5 sm:*:data-[slot=loader]:size-4",
			],
			lg: [
				"min-h-10.5 gap-x-2 px-4 py-2.5 sm:min-h-10 sm:px-3.5 sm:py-2 sm:text-sm/6",
				"*:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:size-4.5",
				"*:data-[slot=loader]:size-5 sm:*:data-[slot=loader]:size-4.5",
			],
			"sq-xs":
				"touch-target size-7.5 *:data-[slot=icon]:size-3.5 *:data-[slot=loader]:size-3.5 sm:size-7 sm:*:data-[slot=icon]:size-3 sm:*:data-[slot=loader]:size-3",
			"sq-sm":
				"touch-target size-8.5 *:data-[slot=icon]:size-4.5 *:data-[slot=loader]:size-4.5 sm:size-8 sm:*:data-[slot=icon]:size-4 sm:*:data-[slot=loader]:size-4",
			"sq-md":
				"touch-target size-9.5 *:data-[slot=icon]:size-4.5 *:data-[slot=loader]:size-4.5 sm:size-9 sm:*:data-[slot=icon]:size-4 sm:*:data-[slot=loader]:size-4",
			"sq-lg":
				"touch-target size-10.5 *:data-[slot=icon]:size-5 *:data-[slot=loader]:size-5 sm:size-10 sm:*:data-[slot=icon]:size-4.5 sm:*:data-[slot=loader]:size-4.5",
		},

		isCircle: {
			true: "rounded-full",
			false: "rounded-lg",
		},
		isDisabled: {
			true: "inset-ring-0 opacity-50 forced-colors:text-[GrayText]",
		},
		isPending: {
			true: "opacity-50",
		},
	},
	defaultVariants: {
		intent: "primary",
		size: "md",
		isCircle: false,
	},
})

interface ButtonProps
	extends ButtonPrimitiveProps,
		VariantProps<typeof buttonStyles> {
	ref?: React.Ref<HTMLButtonElement>
}

const Button = ({
	className,
	intent,
	size,
	isCircle,
	ref,
	...props
}: ButtonProps) => {
	return (
		<ButtonPrimitive
			ref={ref}
			{...props}
			className={composeRenderProps(className, (className, renderProps) =>
				buttonStyles({
					...renderProps,
					intent,
					size,
					isCircle,
					className,
				}),
			)}
		>
			{(values) => (
				<span className="relative z-10">
					{typeof props.children === "function"
						? props.children(values)
						: props.children}
				</span>
			)}
		</ButtonPrimitive>
	)
}

export { Button, buttonStyles }
export type { ButtonProps }
