/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import PostTitleRich from './post-title-rich';
import { DEFAULT_CLASSNAMES, REGEXP_NEWLINES } from './constants';

function PostTitle( _, forwardedRef ) {
	const ref = useRef();

	const { editPost } = useDispatch( editorStore );
	const { isCleanNewPost, title, placeholder, hasFixedToolbar } = useSelect(
		( select ) => {
			const { getEditedPostAttribute, isCleanNewPost: _isCleanNewPost } =
				select( editorStore );
			const { getSettings } = select( blockEditorStore );
			const { titlePlaceholder, hasFixedToolbar: _hasFixedToolbar } =
				getSettings();

			return {
				isCleanNewPost: _isCleanNewPost(),
				title: getEditedPostAttribute( 'title' ),
				placeholder: titlePlaceholder,
				hasFixedToolbar: _hasFixedToolbar,
			};
		},
		[]
	);

	const [ isSelected, setIsSelected ] = useState( false );

	useImperativeHandle( forwardedRef, () => ( {
		focus: () => {
			ref?.current?.focus();
		},
	} ) );

	useEffect( () => {
		if ( ! ref.current ) {
			return;
		}

		const { defaultView } = ref.current.ownerDocument;
		const { name, parent } = defaultView;
		const ownerDocument =
			name === 'editor-canvas' ? parent.document : defaultView.document;
		const { activeElement, body } = ownerDocument;

		// Only autofocus the title when the post is entirely empty. This should
		// only happen for a new post, which means we focus the title on new
		// post so the author can start typing right away, without needing to
		// click anything.
		if ( isCleanNewPost && ( ! activeElement || body === activeElement ) ) {
			ref.current.focus();
		}
	}, [ isCleanNewPost ] );

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
			ref={ ref }
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
