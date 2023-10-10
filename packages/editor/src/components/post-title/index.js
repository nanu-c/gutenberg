/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { forwardRef, useState } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import PostTitleRich from './post-title-rich';
import { DEFAULT_CLASSNAMES, REGEXP_NEWLINES } from './constants';
import usePostTitleFocus from './use-post-title-focus';

function PostTitle( _, forwardedRef ) {
	const { editPost } = useDispatch( editorStore );
	const { title, placeholder, hasFixedToolbar } = useSelect( ( select ) => {
		const { getEditedPostAttribute } = select( editorStore );
		const { getSettings } = select( blockEditorStore );
		const { titlePlaceholder, hasFixedToolbar: _hasFixedToolbar } =
			getSettings();

		return {
			title: getEditedPostAttribute( 'title' ),
			placeholder: titlePlaceholder,
			hasFixedToolbar: _hasFixedToolbar,
		};
	}, [] );

	const [ isSelected, setIsSelected ] = useState( false );

	const { ref: focusRef } = usePostTitleFocus( forwardedRef );

	function onUpdate( newTitle ) {
		editPost( { title: newTitle } );
	}

	function onChange( value ) {
		onUpdate( value.replace( REGEXP_NEWLINES, ' ' ) );
	}

	// The wp-block className is important for editor styles.
	// This same block is used in both the visual and the code editor.
	const className = classnames( DEFAULT_CLASSNAMES, {
		'is-selected': isSelected,
		'has-fixed-toolbar': hasFixedToolbar,
	} );

	const decodedPlaceholder =
		decodeEntities( placeholder ) || __( 'Add title' );

	return (
		<PostTitleRich
			ref={ focusRef }
			title={ title }
			onChange={ onChange }
			onUpdate={ onUpdate }
			className={ className }
			placeholder={ decodedPlaceholder }
			setIsSelected={ setIsSelected }
		/>
	);
}

export default forwardRef( PostTitle );
