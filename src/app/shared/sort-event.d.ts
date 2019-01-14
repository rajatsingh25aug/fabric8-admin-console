import { SortField } from './sort-field';
/**
 * An object containing properties for sort events
 */
export declare class SortEvent {
    /**
     * The currently selected filterable field
     */
    field: SortField;
    /**
     * True if sort is ascending
     */
    isAscending: boolean;
      /**
     * A flag indicating the component is disabled
     */
    /**
     * A list of sortable fields
     */
    fields: SortField[];
    /**
     * True if sort is ascending
     */
    /**
     * True if sort should be shown
     */
    visible?: boolean;
}
