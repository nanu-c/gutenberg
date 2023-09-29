/**
 * WordPress dependencies
 */
const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Post title', () => {
	test.beforeEach( async ( { admin } ) => {
		await admin.createNewPost();
	} );

	test.describe( 'HTML handling', () => {
		test( 'should (visually) render any HTML in Post Editors post title field when in Visual editing mode', async ( {
			editor,
			pageUtils,
		} ) => {
			const pageTitleField = editor.canvas.getByRole( 'textbox', {
				name: 'Add title',
			} );

			await expect( pageTitleField ).toBeFocused();

			pageUtils.setClipboardData( {
				html: 'I am <em>emphasis</em> I am <strong>bold</strong> I am <a href="#">anchor</a>',
			} );
			await pageUtils.pressKeys( 'primary+v' );

			await expect( pageTitleField ).toHaveText(
				'I am emphasis I am bold I am anchor'
			);

			// Check the HTML elements have been **rendered** rather than
			// output in raw form.
			await expect( pageTitleField.locator( 'css=em' ) ).toHaveText(
				'emphasis'
			);

			await expect( pageTitleField.locator( 'css=strong' ) ).toHaveText(
				'bold'
			);

			await expect( pageTitleField.locator( 'css=a' ) ).toHaveText(
				'anchor'
			);
		} );

		test( 'should show raw HTML in the title when in Code view mode', async ( {
			editor,
			pageUtils,
		} ) => {
			const pageTitleField = editor.canvas.getByRole( 'textbox', {
				name: 'Add title',
			} );

			await expect( pageTitleField ).toBeFocused();

			pageUtils.setClipboardData( {
				html: 'I am <em>emphasis</em> I am <strong>bold</strong> I am <a href="#">anchor</a>',
			} );
			await pageUtils.pressKeys( 'primary+v' );

			await expect( pageTitleField ).toHaveText(
				'I am emphasis I am bold I am anchor'
			);

			// switch Editor to code view mode
			// Open code editor
			await pageUtils.pressKeys( 'secondary+M' ); // Emulates CTRL+Shift+Alt + M => toggle code editor

			await expect(
				editor.canvas.getByRole( 'heading', {
					name: 'Editing code',
				} )
			).toBeVisible();

			const codeViewPageTitleField = editor.canvas.getByRole( 'textbox', {
				name: 'Add title',
			} );

			// Check that the pageTitleField has the raw HTML
			await expect( codeViewPageTitleField ).toHaveText(
				'I am <em>emphasis</em> I am <strong>bold</strong> I am <a href="#">anchor</a>'
			);
		} );

		test( 'it should render HTML in plaintext if pasted as plaintext', async ( {
			editor,
			pageUtils,
		} ) => {
			const pageTitleField = editor.canvas.getByRole( 'textbox', {
				name: 'Add title',
			} );

			await expect( pageTitleField ).toBeFocused();

			pageUtils.setClipboardData( {
				plainText:
					'I am <em>emphasis</em> I am <strong>bold</strong> I am <a href="#">anchor</a>',
			} );
			await pageUtils.pressKeys( 'primary+v' );

			await expect( pageTitleField ).toHaveText(
				'I am <em>emphasis</em> I am <strong>bold</strong> I am <a href="#">anchor</a>'
			);
		} );
	} );
} );
