import type { ReactNode } from "react"
import { cn } from "~/shared/utils"

interface GlassCardProps {
	children: ReactNode
	className?: string
	href?: string
	as?: "div" | "section" | "article" | "aside"
}

export function GlassCard({
	children,
	className = "",
	href,
	as: Component = "div",
}: GlassCardProps) {
	const baseClasses = cn("glass-card group", className)

	if (href) {
		return (
			<a href={href} className={baseClasses}>
				{children}
			</a>
		)
	}

	return <Component className={baseClasses}>{children}</Component>
}
