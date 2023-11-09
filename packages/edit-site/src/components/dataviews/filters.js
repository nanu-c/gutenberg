/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { default as InFilter } from './in-filter';
import ResetFilters from './reset-filters';

const ENUMERATION_TYPE = 'enumeration';

export default function Filters( { fields, view, onChangeView } ) {
	const filtersRegistered = [];
	fields.forEach( ( field ) => {
		if ( ! field.type ) {
			return;
		}

		switch ( field.type ) {
			case ENUMERATION_TYPE:
				filtersRegistered.push( {
					field: field.id,
					name: field.header,
					type: field.type,
					elements: [
						{
							value: '',
							label: __( 'All' ),
						},
						...( field.elements || [] ),
					],
				} );
		}
	} );

	const visibleFilters = view.visibleFilters
		?.map( ( fieldName ) => {
			const visibleFiltersForField = filtersRegistered.filter(
				( f ) => f.field === fieldName
			);

			if ( visibleFiltersForField.length === 0 ) {
				return null;
			}

			return visibleFiltersForField.map( ( filter ) => {
				if ( ENUMERATION_TYPE === filter.type ) {
					return (
						<InFilter
							key={ fieldName + '.' + filter.type }
							filter={ filter }
							view={ view }
							onChangeView={ onChangeView }
						/>
					);
				}
				return null;
			} );
		} )
		.filter( Boolean );

	if ( visibleFilters?.length > 0 ) {
		visibleFilters.push(
			<ResetFilters
				key="reset-filters"
				view={ view }
				onChangeView={ onChangeView }
			/>
		);
	}

	return visibleFilters;
}
