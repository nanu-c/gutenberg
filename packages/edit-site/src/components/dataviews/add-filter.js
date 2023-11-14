/**
 * WordPress dependencies
 */
import {
	privateApis as componentsPrivateApis,
	Button,
	BaseControl,
	Icon,
} from '@wordpress/components';
import { chevronRightSmall, plus } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { OPERATOR_IN } from './in-filter';

const {
	DropdownMenuV2,
	DropdownSubMenuV2,
	DropdownSubMenuTriggerV2,
	DropdownMenuItemV2,
	DropdownMenuSeparatorV2,
} = unlock( componentsPrivateApis );

const VALID_OPERATORS = [ OPERATOR_IN ];

export default function AddFilter( { fields, view, onChangeView } ) {
	const filters = [];
	fields.forEach( ( field ) => {
		if ( ! field.filters ) {
			return;
		}

		field.filters.forEach( ( filter ) => {
			if ( VALID_OPERATORS.some( ( operator ) => operator === filter ) ) {
				filters.push( {
					field: field.id,
					name: field.header,
					operator: filter,
					elements: [
						{
							value: '',
							label: __( 'All' ),
						},
						...( field.elements || [] ),
					],
					isVisible: view.filters.some(
						( f ) => f.field === field.id && f.operator === filter
					),
				} );
			}
		} );
	} );

	if ( filters.length === 0 ) {
		return null;
	}

	return (
		<BaseControl>
			<DropdownMenuV2
				label={ __( 'Add filter' ) }
				trigger={
					<Button icon={ plus } variant="tertiary">
						{ __( 'Add filter' ) }
					</Button>
				}
			>
				{ filters.map( ( filter ) => {
					if ( filter.isVisible ) {
						return (
							<DropdownMenuItemV2
								key={ filter.field }
								disabled={ true }
							>
								{ filter.name }
							</DropdownMenuItemV2>
						);
					}

					return (
						<DropdownSubMenuV2
							key={ filter.field }
							trigger={
								<DropdownSubMenuTriggerV2
									suffix={
										<Icon icon={ chevronRightSmall } />
									}
								>
									{ filter.name }
								</DropdownSubMenuTriggerV2>
							}
						>
							{ filter.elements.map( ( element ) => (
								<DropdownMenuItemV2
									key={ element.value }
									onSelect={ () => {
										onChangeView( ( currentView ) => ( {
											...currentView,
											filters: [
												...currentView.filters,
												{
													field: filter.field,
													operator: 'in',
													value: element.value,
												},
											],
										} ) );
									} }
									role="menuitemcheckbox"
								>
									{ element.label }
								</DropdownMenuItemV2>
							) ) }
						</DropdownSubMenuV2>
					);
				} ) }
				<DropdownMenuSeparatorV2 />
				<DropdownMenuItemV2
					key={ 'reset-filters' }
					disabled={ view.filters?.length === 0 }
					onSelect={ () => {
						onChangeView( ( currentView ) => ( {
							...currentView,
							page: 1,
							filters: [],
						} ) );
					} }
					role="menuitemcheckbox"
				>
					{ __( 'Reset filters' ) }
				</DropdownMenuItemV2>
			</DropdownMenuV2>
		</BaseControl>
	);
}
