import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getCollection('news');
	return posts.map((post) => ({
		params: { slug: post.id },
		props: {
			title: post.data.title,
			author: post.data.author,
			pubDate: post.data.pubDate,
		},
	}));
};

export const GET: APIRoute = async ({ props }) => {
	const { title, author, pubDate } = props as {
		title: string;
		author: string;
		pubDate: Date;
	};

	const fontRegular = fs.readFileSync(
		path.resolve('src/assets/fonts/IBMPlexSans-Regular.ttf')
	);
	const fontSemiBold = fs.readFileSync(
		path.resolve('src/assets/fonts/IBMPlexSans-SemiBold.ttf')
	);

	const formattedDate = pubDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					width: '100%',
					height: '100%',
					backgroundColor: '#082035',
					padding: '64px',
				},
				children: [
					// Top accent bar
					{
						type: 'div',
						props: {
							style: {
								width: '64px',
								height: '4px',
								backgroundColor: '#0566F7',
								borderRadius: '2px',
							},
						},
					},
					// Title
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								flexDirection: 'column',
								gap: '24px',
								flex: 1,
								justifyContent: 'center',
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											fontSize: title.length > 60 ? '40px' : '48px',
											fontFamily: 'IBM Plex Sans SemiBold',
											fontWeight: 600,
											color: '#F8FAFC',
											lineHeight: 1.2,
											letterSpacing: '-0.02em',
										},
										children: title,
									},
								},
							],
						},
					},
					// Footer: author + date on left, site name on right
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-end',
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											display: 'flex',
											alignItems: 'center',
											gap: '8px',
											fontSize: '18px',
											fontFamily: 'IBM Plex Sans',
											color: '#8B9EB1',
										},
										children: [
											{
												type: 'span',
												props: { children: author },
											},
											{
												type: 'span',
												props: {
													style: { color: '#4B5563' },
													children: '/',
												},
											},
											{
												type: 'span',
												props: { children: formattedDate },
											},
										],
									},
								},
								{
									type: 'div',
									props: {
										style: {
											fontSize: '20px',
											fontFamily: 'IBM Plex Sans SemiBold',
											fontWeight: 600,
											color: '#0566F7',
											letterSpacing: '-0.01em',
										},
										children: 'visio.ai',
									},
								},
							],
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'IBM Plex Sans',
					data: fontRegular,
					weight: 400,
					style: 'normal',
				},
				{
					name: 'IBM Plex Sans SemiBold',
					data: fontSemiBold,
					weight: 600,
					style: 'normal',
				},
			],
		}
	);

	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(png, {
		headers: { 'Content-Type': 'image/png' },
	});
};
