/**
 * WordPress dependencies
 */
import {
	Button,
	Icon,
	privateApis as componentsPrivateApis,
} from '@wordpress/components';
import {
	chevronRightSmall,
	blockTable,
	chevronDown,
	arrowUp,
	arrowDown,
} from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';

const {
	DropdownMenuV2Ariakit,
	DropdownMenuGroupV2Ariakit,
	DropdownMenuItemV2Ariakit,
	DropdownMenuRadioItemV2Ariakit,
	DropdownMenuCheckboxItemV2Ariakit,
} = unlock( componentsPrivateApis );

const availableViews = [
	{
		id: 'list',
		label: __( 'List' ),
	},
	{
		id: 'grid',
		label: __( 'Grid' ),
	},
];

function ViewTypeMenu( { view, onChangeView } ) {
	const activeView = availableViews.find( ( v ) => view.type === v.id );
	return (
		<DropdownMenuV2Ariakit
			trigger={
				<DropdownMenuItemV2Ariakit
					suffix={
						<>
							{ activeView.label }
							<Icon icon={ chevronRightSmall } />
						</>
					}
				>
					{ __( 'Layout' ) }
				</DropdownMenuItemV2Ariakit>
			}
			placement="left-start"
		>
			{ availableViews.map( ( availableView ) => {
				return (
					<DropdownMenuRadioItemV2Ariakit
						key={ availableView.id }
						value={ availableView.id }
						name="view-actions-available-view"
						checked={ availableView.id === view.type }
						onChange={ () => {
							onChangeView( { ...view, type: availableView.id } );
						} }
					>
						{ availableView.label }
					</DropdownMenuRadioItemV2Ariakit>
				);
			} ) }
		</DropdownMenuV2Ariakit>
	);
}

const PAGE_SIZE_VALUES = [ 5, 20, 50 ];
function PageSizeMenu( { view, onChangeView } ) {
	return (
		<DropdownMenuV2Ariakit
			trigger={
				<DropdownMenuItemV2Ariakit
					suffix={
						<>
							{ view.perPage }
							<Icon icon={ chevronRightSmall } />
						</>
					}
				>
					{ /* TODO: probably label per view type. */ }
					{ __( 'Rows per page' ) }
				</DropdownMenuItemV2Ariakit>
			}
			placement="left-start"
		>
			{ PAGE_SIZE_VALUES.map( ( size ) => {
				return (
					<DropdownMenuRadioItemV2Ariakit
						key={ size }
						value={ size }
						name="view-actions-page-size"
						checked={ view.perPage === size }
						onChange={ () => {
							onChangeView( { ...view, perPage: size, page: 1 } );
						} }
					>
						{ size }
					</DropdownMenuRadioItemV2Ariakit>
				);
			} ) }
		</DropdownMenuV2Ariakit>
	);
}

function FieldsVisibilityMenu( { view, onChangeView, fields } ) {
	const hidableFields = fields.filter(
		( field ) => field.enableHiding !== false
	);
	if ( ! hidableFields?.length ) {
		return null;
	}
	return (
		<DropdownMenuV2Ariakit
			trigger={
				<DropdownMenuItemV2Ariakit
					suffix={ <Icon icon={ chevronRightSmall } /> }
				>
					{ __( 'Fields' ) }
				</DropdownMenuItemV2Ariakit>
			}
			placement="left-start"
		>
			{ hidableFields?.map( ( field ) => {
				return (
					<DropdownMenuCheckboxItemV2Ariakit
						key={ field.id }
						value={ field.id }
						checked={ ! view.hiddenFields?.includes( field.id ) }
						onChange={ () => {
							onChangeView( {
								...view,
								hiddenFields: view.hiddenFields?.includes(
									field.id
								)
									? view.hiddenFields.filter(
											( id ) => id !== field.id
									  )
									: [ ...view.hiddenFields, field.id ],
							} );
						} }
					>
						{ field.header }
					</DropdownMenuCheckboxItemV2Ariakit>
				);
			} ) }
		</DropdownMenuV2Ariakit>
	);
}

// This object is used to construct the sorting options per sortable field.
const sortingItemsInfo = {
	asc: { icon: arrowUp, label: __( 'Sort ascending' ) },
	desc: { icon: arrowDown, label: __( 'Sort descending' ) },
};
function SortMenu( { fields, view, onChangeView } ) {
	const sortableFields = fields.filter(
		( field ) => field.enableSorting !== false
	);
	if ( ! sortableFields?.length ) {
		return null;
	}
	const currentSortedField = fields.find(
		( field ) => field.id === view.sort?.field
	);
	return (
		<DropdownMenuV2Ariakit
			trigger={
				<DropdownMenuItemV2Ariakit
					suffix={
						<>
							{ currentSortedField?.header }
							<Icon icon={ chevronRightSmall } />
						</>
					}
				>
					{ __( 'Sort by' ) }
				</DropdownMenuItemV2Ariakit>
			}
			placement="left-start"
		>
			{ sortableFields?.map( ( field ) => {
				const sortedDirection = view.sort?.direction;
				return (
					<DropdownMenuV2Ariakit
						key={ field.id }
						trigger={
							<DropdownMenuItemV2Ariakit
								suffix={ <Icon icon={ chevronRightSmall } /> }
							>
								{ field.header }
							</DropdownMenuItemV2Ariakit>
						}
						placement="left-start"
					>
						{ Object.entries( sortingItemsInfo ).map(
							( [ direction, info ] ) => {
								const isChecked =
									currentSortedField !== undefined &&
									sortedDirection === direction &&
									field.id === currentSortedField.id;

								return (
									<DropdownMenuRadioItemV2Ariakit
										key={ direction }
										value={ direction }
										name={ `view-actions-sorting-${ field.id }` }
										suffix={ <Icon icon={ info.icon } /> }
										// Note: there is currently a limitation from the DropdownMenu
										// component where the radio won't unselect when all related
										// radios are set to false.
										checked={ isChecked }
										onChange={ () => {
											if (
												sortedDirection === direction
											) {
												onChangeView( {
													...view,
													sort: undefined,
												} );
											} else {
												onChangeView( {
													...view,
													sort: {
														field: field.id,
														direction,
													},
												} );
											}
										} }
									>
										{ info.label }
									</DropdownMenuRadioItemV2Ariakit>
								);
							}
						) }
					</DropdownMenuV2Ariakit>
				);
			} ) }
		</DropdownMenuV2Ariakit>
	);
}

export default function ViewActions( { fields, view, onChangeView } ) {
	return (
		<DropdownMenuV2Ariakit
			trigger={
				<Button
					variant="tertiary"
					icon={ blockTable }
					label={ __( 'Actions' ) }
				>
					{ __( 'View' ) }
					<Icon icon={ chevronDown } />
				</Button>
			}
		>
			<DropdownMenuGroupV2Ariakit>
				<ViewTypeMenu view={ view } onChangeView={ onChangeView } />
				<SortMenu
					fields={ fields }
					view={ view }
					onChangeView={ onChangeView }
				/>
				<FieldsVisibilityMenu
					fields={ fields }
					view={ view }
					onChangeView={ onChangeView }
				/>
				<PageSizeMenu view={ view } onChangeView={ onChangeView } />
			</DropdownMenuGroupV2Ariakit>
		</DropdownMenuV2Ariakit>
	);
}
