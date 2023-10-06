/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import { DEFAULT_CLASSNAMES, REGEXP_NEWLINES } from './constants';

const PostTitleRaw = () => {
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

	function onUpdate( newTitle ) {
		editPost( { title: newTitle } );
	}

	function onChange( value ) {
		onUpdate( value.replace( REGEXP_NEWLINES, ' ' ) );
	}

	function onSelect() {
		setIsSelected( true );
	}

	function onUnselect() {
		setIsSelected( false );
	}

	// The wp-block className is important for editor styles.
	// This same block is used in both the visual and the code editor.
	const className = classnames( DEFAULT_CLASSNAMES, {
		'is-selected': isSelected,
		'has-fixed-toolbar': hasFixedToolbar,
		'is-raw-text': true,
	} );

	const decodedPlaceholder =
		decodeEntities( placeholder ) || __( 'Add title' );

	return (
		<TextareaControl
			value={ title }
			onChange={ onChange }
			onFocus={ onSelect }
			onBlur={ onUnselect }
			label={ placeholder }
			className={ className }
			placeholder={ decodedPlaceholder }
			hideLabelFromVision={ true }
			autoComplete="off"
			dir="auto"
			__nextHasNoMarginBottom
		/>
	);
};

export default PostTitleRaw;
