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
import { ENTER } from '@wordpress/keycodes';
import { useSelect, useDispatch } from '@wordpress/data';
import { pasteHandler } from '@wordpress/blocks';
import { store as blockEditorStore } from '@wordpress/block-editor';
import {
	__unstableUseRichText as useRichText,
	create,
	toHTMLString,
	insert,
} from '@wordpress/rich-text';
import { useMergeRefs } from '@wordpress/compose';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';
import { TextareaControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import PostTypeSupportCheck from '../post-type-support-check';
import { store as editorStore } from '../../store';

/**
 * Constants
 */
const REGEXP_NEWLINES = /[\r\n]+/g;

const PostTitleRaw = ( { title, placeholder, onChange, className } ) => {
	return (
		<TextareaControl
			value={ title }
			onChange={ onChange }
			label={ placeholder }
			className={ className }
			placeholder={ placeholder }
			hideLabelFromVision={ true }
			autoComplete="off"
			dir="auto"
			__nextHasNoMarginBottom
		/>
	);
};

const PostTitleRich = forwardRef(
	(
		{ title, placeholder, onChange, onUpdate, className, setIsSelected },
		ref
	) => {
		const [ selection, setSelection ] = useState( {} );

		const { clearSelectedBlock, insertBlocks, insertDefaultBlock } =
			useDispatch( blockEditorStore );

		function onInsertBlockAfter( blocks ) {
			insertBlocks( blocks, 0 );
		}

		function onSelect() {
			setIsSelected( true );
			clearSelectedBlock();
		}

		function onUnselect() {
			setIsSelected( false );
			setSelection( {} );
		}

		function onEnterPress() {
			insertDefaultBlock( undefined, undefined, 0 );
		}

		function onKeyDown( event ) {
			if ( event.keyCode === ENTER ) {
				event.preventDefault();
				onEnterPress();
			}
		}

		function onPaste( event ) {
			const clipboardData = event.clipboardData;

			let plainText = '';
			let html = '';

			// IE11 only supports `Text` as an argument for `getData` and will
			// otherwise throw an invalid argument error, so we try the standard
			// arguments first, then fallback to `Text` if they fail.
			try {
				plainText = clipboardData.getData( 'text/plain' );
				html = clipboardData.getData( 'text/html' );
			} catch ( error1 ) {
				try {
					html = clipboardData.getData( 'Text' );
				} catch ( error2 ) {
					// Some browsers like UC Browser paste plain text by default and
					// don't support clipboardData at all, so allow default
					// behaviour.
					return;
				}
			}

			// Allows us to ask for this information when we get a report.
			window.console.log( 'Received HTML:\n\n', html );
			window.console.log( 'Received plain text:\n\n', plainText );

			const content = pasteHandler( {
				HTML: html,
				plainText,
			} );

			event.preventDefault();

			if ( ! content.length ) {
				return;
			}

			if ( typeof content !== 'string' ) {
				const [ firstBlock ] = content;

				if (
					! title &&
					( firstBlock.name === 'core/heading' ||
						firstBlock.name === 'core/paragraph' )
				) {
					onUpdate( stripHTML( firstBlock.attributes.content ) );
					onInsertBlockAfter( content.slice( 1 ) );
				} else {
					onInsertBlockAfter( content );
				}
			} else {
				const value = {
					...create( { html: title } ),
					...selection,
				};
				const newValue = insert(
					value,
					create( { html: stripHTML( content ) } )
				);
				onUpdate( toHTMLString( { value: newValue } ) );
				setSelection( {
					start: newValue.start,
					end: newValue.end,
				} );
			}
		}

		const { ref: richTextRef } = useRichText( {
			value: title,
			onChange,
			placeholder,
			selectionStart: selection.start,
			selectionEnd: selection.end,
			onSelectionChange( newStart, newEnd ) {
				setSelection( ( sel ) => {
					const { start, end } = sel;
					if ( start === newStart && end === newEnd ) {
						return sel;
					}
					return {
						start: newStart,
						end: newEnd,
					};
				} );
			},
			__unstableDisableFormats: false,
			preserveWhiteSpace: true,
		} );

		return (
			/* eslint-disable jsx-a11y/heading-has-content, jsx-a11y/no-noninteractive-element-to-interactive-role */
			<PostTypeSupportCheck supportKeys="title">
				<h1
					ref={ useMergeRefs( [ richTextRef, ref ] ) }
					contentEditable
					className={ className }
					aria-label={ placeholder }
					role="textbox"
					aria-multiline="true"
					onFocus={ onSelect }
					onBlur={ onUnselect }
					onKeyDown={ onKeyDown }
					onKeyPress={ onUnselect }
					onPaste={ onPaste }
				/>
			</PostTypeSupportCheck>
			/* eslint-enable jsx-a11y/heading-has-content, jsx-a11y/no-noninteractive-element-to-interactive-role */
		);
	}
);

function PostTitle( { rawText }, forwardedRef ) {
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
	const className = classnames(
		'wp-block wp-block-post-title block-editor-block-list__block editor-post-title editor-post-title__input rich-text',
		{
			'is-selected': isSelected,
			'has-fixed-toolbar': hasFixedToolbar,
			'is-raw-text': rawText,
		}
	);
	const decodedPlaceholder =
		decodeEntities( placeholder ) || __( 'Add title' );

	if ( rawText ) {
		return (
			<PostTitleRaw
				title={ title }
				className={ className }
				placeholder={ decodedPlaceholder }
			/>
		);
	}

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
