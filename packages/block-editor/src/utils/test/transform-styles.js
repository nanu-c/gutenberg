/**
 * Internal dependencies
 */
import transformStyles from '../transform-styles';

describe( 'transformStyles', () => {
	it( 'should not throw error in case of invalid css', () => {
		const run = () =>
			transformStyles(
				[
					{
						css: 'h1 { color: red; }', // valid CSS
					},
					{
						css: 'h1 { color: red;', // invalid CSS
					},
				],
				'.my-namespace'
			);

		expect( run ).not.toThrow();

		const [ validCSS, invalidCSS ] = run();

		expect( validCSS ).toBe( '.my-namespace h1 { color: red; }' );
		expect( invalidCSS ).toBe( null );
	} );

	describe( 'selector wrap', () => {
		it( 'should wrap regular selectors', () => {
			const input = `h1 { color: red; }`;
			const output = transformStyles(
				[
					{
						css: input,
					},
				],
				'.my-namespace'
			);

			expect( output ).toMatchSnapshot();
		} );

		it( 'should wrap multiple selectors', () => {
			const input = `h1, h2 { color: red; }`;
			const output = transformStyles(
				[
					{
						css: input,
					},
				],
				'.my-namespace'
			);

			expect( output ).toMatchSnapshot();
		} );

		it( 'should ignore selectors', () => {
			const input = `h1, body { color: red; }`;
			const output = transformStyles(
				[
					{
						css: input,
						ignoredSelectors: [ 'body' ],
					},
				],
				'.my-namespace'
			);

			expect( output ).toMatchSnapshot();
		} );

		it( 'should replace root tags', () => {
			const input = `body, h1 { color: red; }`;
			const output = transformStyles(
				[
					{
						css: input,
					},
				],
				'.my-namespace'
			);

			expect( output ).toMatchSnapshot();
		} );

		it( 'should ignore keyframes', () => {
			const input = `
			@keyframes edit-post__fade-in-animation {
				from {
					opacity: 0;
				}
			}`;
			const output = transformStyles(
				[
					{
						css: input,
					},
				],
				'.my-namespace'
			);

			expect( output ).toMatchSnapshot();
		} );

		it( 'should wrap selectors inside container queries', () => {
			const input = `
			@container (width > 400px) {
				  h1 { color: red; }
			}`;
			const output = transformStyles(
				[
					{
						css: input,
					},
				],
				'.my-namespace'
			);

			expect( output ).toMatchSnapshot();
		} );

		it( 'should ignore font-face selectors', () => {
			const input = `
			@font-face {
				font-family: myFirstFont;
				src: url(sansation_light.woff);
			}`;
			const output = transformStyles(
				[
					{
						css: input,
					},
				],
				'.my-namespace'
			);

			expect( output ).toMatchSnapshot();
		} );

		it( 'should replace :root selectors', () => {
			const input = `
			:root {
				--my-color: #ff0000;
			}`;
			const output = transformStyles(
				[
					{
						css: input,
					},
				],
				'.my-namespace'
			);

			expect( output ).toMatchSnapshot();
		} );

		it( 'should not double wrap selectors', () => {
			const input = ` .my-namespace h1, .red { color: red; }`;

			const output = transformStyles(
				[
					{
						css: input,
					},
				],
				'.my-namespace'
			);

			expect( output ).toMatchSnapshot();
		} );
	} );

	it( 'should not break with data urls', () => {
		const input = `.wp-block-group {
			background-image: url("data:image/svg+xml,%3Csvg%3E.b%7Bclip-path:url(test);%7D%3C/svg%3E");
			color: red !important;
		  }`;

		const output = transformStyles( [
			{
				css: input,
				baseURL: 'http://wp-site.local/themes/gut/css/',
			},
		] );

		expect( output ).toMatchSnapshot();
	} );

	describe( 'URL rewrite', () => {
		it( 'should rewrite relative paths', () => {
			const input = `h1 { background: url(images/test.png); }`;
			const output = transformStyles( [
				{
					css: input,
					baseURL: 'http://wp-site.local/themes/gut/css/',
				},
			] );

			expect( output ).toMatchSnapshot();
		} );

		it( 'should replace complex relative paths', () => {
			const input = `h1 { background: url(../images/test.png); }`;
			const output = transformStyles( [
				{
					css: input,
					baseURL: 'http://wp-site.local/themes/gut/css/',
				},
			] );

			expect( output ).toMatchSnapshot();
		} );

		it( 'should not replace absolute paths', () => {
			const input = `h1 { background: url(/images/test.png); }`;
			const output = transformStyles( [
				{
					css: input,
					baseURL: 'http://wp-site.local/themes/gut/css/',
				},
			] );

			expect( output ).toMatchSnapshot();
		} );

		it( 'should not replace remote paths', () => {
			const input = `h1 { background: url(http://wp.org/images/test.png); }`;
			const output = transformStyles( [
				{
					css: input,
					baseURL: 'http://wp-site.local/themes/gut/css/',
				},
			] );

			expect( output ).toMatchSnapshot();
		} );
	} );
} );
