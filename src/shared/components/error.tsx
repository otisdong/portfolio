import type { ErrorComponentProps } from "@tanstack/react-router"
import { Button } from "./ui"

export function ErrorComponent({ error, reset }: ErrorComponentProps) {
	return (
		<div className="flex min-h-56 w-screen flex-col items-center justify-center gap-4 p-4">
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="font-bold text-4xl text-danger-fg">Oops!</h1>
				<p className="text-lg text-muted-fg">Something went wrong</p>
				{error && (
					<p className="max-w-md text-muted-fg text-sm">
						{error.message || "An unexpected error occurred"}
					</p>
				)}
			</div>
			<div className="flex gap-2">
				<Button onClick={reset} intent="primary">
					Try Again
				</Button>
				<Button
					onClick={() => {
						window.location.href = "/"
					}}
					intent="secondary"
				>
					Go Home
				</Button>
			</div>
		</div>
	)
}
