import { TanStackDevtools } from "@tanstack/react-devtools"
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { PortfolioLayout } from "~/shared/layouts/portfolio-layout"
import QueryProvider from "~/shared/providers/query-provider"
import appCss from "../styles.css?url"

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Cuong - UI/UX & Product Designer Portfolio",
			},
			{
				name: "description",
				content:
					"UI/UX & Product Designer with 5 years of experience in Web, Mobile, and Blockchain ecosystems.",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: "https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,700,400,600,300,1,500&display=swap",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				<QueryProvider>
					<PortfolioLayout>{children}</PortfolioLayout>
				</QueryProvider>

				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	)
}
