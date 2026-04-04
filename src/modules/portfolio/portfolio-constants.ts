export const PORTFOLIO_DATA = {
	personal: {
		name: "Cuong",
		title: "UI/UX & Product Designer",
		bio: `I am Cuong, a UI/UX & Product Designer with 5 years of experience specializing in high-impact digital solutions for Web, Mobile, and complex Blockchain ecosystems. My approach goes beyond aesthetics; I thrive in business analysis, user research, and cross-functional collaboration to transform intricate requirements into intuitive, user-centric products.`,
		bioSecondary: `With proven expertise in building scalable Design Systems and optimizing UX, I am dedicated to delivering peak value to both the business and the end-user. Driven by a strategic mindset and high responsibility, I am currently evolving toward Team Leadership, PO, and PM roles to lead long-term design and product strategies. My English proficiency is currently at a basic level.`,
		email: "Otisdesign.freelancer@gmail.com",
		phone: ["098 2525 869", "033 4265 253"],
		image:
			"https://www.figma.com/api/mcp/asset/b5cfb36e-8791-4be3-827c-d274b08654e1",
	},
	skills: {
		design: [
			"User flow",
			"Wireframe",
			"Visual Design",
			"Design System",
			"UX Research",
			"Info Architecture",
			"Content Video",
			"Edit Video",
		],
		software: [
			{
				name: "Figma",
				icon: "https://www.figma.com/api/mcp/asset/630aba88-efb9-4f68-aa45-b161acb95de4",
			},
			{
				name: "Photoshop",
				icon: "https://www.figma.com/api/mcp/asset/3fc001df-1f8e-4b89-9f7b-5bd2bf15d604",
			},
			{
				name: "Illustrator",
				icon: "https://www.figma.com/api/mcp/asset/0d649d5b-4c2e-4961-b456-8bc228107646",
			},
			{
				name: "After Effect",
				icon: "https://www.figma.com/api/mcp/asset/e83e2d78-e3c6-4a23-ae94-32f2bccbef26",
			},
			{
				name: "Premiere",
				icon: "https://www.figma.com/api/mcp/asset/e590126b-f008-4913-93cc-47be674ecce2",
			},
			{ name: "AI Tool", icon: null },
		],
	},
	experience: [
		{
			id: 1,
			title: "Product Designer & Graphic Designer",
			company: "MP Solutions",
			period: "6/2019 - 6/2021",
			description: [
				"Design and develop products from concept to reality, research user needs, and collaborate with technical, marketing, and production teams to finalize the product.",
				"Create advertising materials, develop brand imagery",
			],
		},
		{
			id: 2,
			title: "Product Designer",
			company: "IsoftCare",
			period: "6/2021 - 12/2021",
			description: [
				"Develop, improve, and research medical-related software.",
				"Research user behavior, ensure product usability, logical UX, and a good user experience.",
			],
		},
		{
			id: 3,
			title: "UI UX Designer",
			company: "Moonlab",
			period: "10/2021 - 31/12/2015",
			description: [
				"Design and develop products from concept to reality, research user needs, and collaborate with technical, marketing, and production teams to finalize blockchain-related products: Design websites, mobile apps, dApps, DEx, CEX, marketplaces, etc.",
			],
		},
		{
			id: 4,
			title: "Product Designer & Graphic Designer",
			company: "People Connect",
			period: "10/2023 - Present",
			description: [
				"Build and develop products according to customer needs. Build and develop People Connect products. Design advertising materials, develop brand imagery, and ensure customer requirements are met.",
			],
		},
	],
	products: [
		{
			id: 1,
			title: "Moneymero Mobile App",
			description:
				"Track tokens, spot whales, snipe entries, and monitor multiple charts in real-time. Stay ahead of the market with instant insights, alerts, and degen-ready tools.",
			image:
				"https://www.figma.com/api/mcp/asset/29e43071-2cd3-470f-af41-35ab6684b708",
		},
		{
			id: 2,
			title: "VideoSnap AI",
			description:
				"Clone, customize, and mass-produce high-performing ads in minutes — without filming, editing, or creative bottlenecks.",
			image:
				"https://www.figma.com/api/mcp/asset/7605f403-a5cc-4f12-9f92-3dc4a0b5acbe",
		},
		{
			id: 3,
			title: "ORCA Wallet",
			description:
				"The only wallet you need to manage and swap 1000+ cryptos and NFTs on your web browser and mobile",
			image:
				"https://www.figma.com/api/mcp/asset/e00b389a-5e46-4b63-93bb-8c1a00cd5b91",
		},
		{
			id: 4,
			title: "Moneymero CEX",
			description:
				"Smart trading, fast trend catching - The all-in-one platform for memecoins and social analysis",
			image: null,
		},
	],
} as const
