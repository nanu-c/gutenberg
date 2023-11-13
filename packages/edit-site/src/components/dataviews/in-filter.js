/**
 * WordPress dependencies
 */
import {
	Button,
	privateApis as componentsPrivateApis,
	Icon,
} from '@wordpress/components';
import { check } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';

export const OPERATOR_IN = 'in';

const { DropdownMenuV2, DropdownMenuItemV2 } = unlock( componentsPrivateApis );

export default ( { filter, view, onChangeView } ) => {
	const filterLabel = sprintf(
		/* translators: filter name. */
		__( '%s is' ),
		filter.name
	);

	const elements = [
		{
			value: '',
			label: __( 'All' ),
		},
		...filter.elements,
	];

	const filterInView = view.filters.find( ( f ) => f.field === filter.field );

	return (
		<DropdownMenuV2
			key={ filter.field }
			label={ filterLabel }
			trigger={ <Button variant="tertiary">{ filterLabel }</Button> }
		>
			{ elements.map( ( element ) => {
				const isActive =
					filterInView?.value === element.value ||
					( filterInView === undefined && element.value === '' );

				return (
					<DropdownMenuItemV2
						key={ element.value }
						suffix={ isActive && <Icon icon={ check } /> }
						onSelect={ () =>
							onChangeView( ( currentView ) => ( {
								...currentView,
								page: 1,
								filters: [
									...view.filters.filter(
										( f ) => f.field !== filter.field
									),
									{
										field: filter.field,
										operator: OPERATOR_IN,
										value: element.value,
									},
								],
							} ) )
						}
						role="menuitemcheckbox"
					>
						{ element.label }
					</DropdownMenuItemV2>
				);
			} ) }
		</DropdownMenuV2>
	);
};
