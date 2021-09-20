import { useEffect, useMemo, useReducer, useState } from "@wordpress/element";
import { flowRight, forEach, merge, orderBy } from "lodash";
import registerGlobalAPIs from "../global-apis";
import createNavigationAPI, { navigation as registeredNavigation } from "../global-apis/navigation";

const SET_NAVIGATION_GROUP = "SET_NAVIGATION_GROUP";
const SET_NAVIGATION_ITEM = "SET_NAVIGATION_ITEM";

/**
 * Reducer for navigation state.
 *
 * @param {Object} state The current Redux state
 * @param {Object} action The action being dispatched by this reducer
 * @param {String} action.type The action type being dispatched
 * @param {Object} action.payload The action payload being dispatched
 *
 * @returns {Object} The new Redux state
 */
function navigationReducer( state = {}, { type, payload } ) {
	switch ( type ) {
		case SET_NAVIGATION_GROUP:
			return {
				...state,
				[ payload.key ]: {
					...payload,
				},
			};
		case SET_NAVIGATION_ITEM: {
			const targetGroup = { ...state[ payload.groupKey ] };
			targetGroup.children.push( payload );
			targetGroup.children = orderBy( targetGroup.children, "priority", "desc" );
			return {
				...state,
				[ payload.groupKey ]: targetGroup,
			};
		}
		default:
			return state;
	}
}

/**
 * An action creator for the SET_NAVIGATION_GROUP action.
 *
 * @param {String}      key                    The key to register the menu group by.
 * @param {String}      label                  The label to show in the menu group.
 * @param {Boolean}     isDefaultOpen          Wether the menu item is expanded by default.
 * @param {Number}      priority               Location priority of menu group.
 * @param {JSX.Element} icon                   A function that renders the icon to display.
 * @param {Object[]}    children [children=[]] An array of children objects, containing a label and a navigation target.
 *
 * @returns {Object} The SET_NAVIGATION_GROUP action.
 */
function setNavigationGroup( { key, label, isDefaultOpen, priority, icon, children = [] } ) {
	return {
		type: SET_NAVIGATION_GROUP,
		payload: {
			key,
			label,
			isDefaultOpen,
			icon,
			priority,
			children: orderBy( children, "priority", "desc" ),
		},
	};
}

/**
 * An action creator for the SET_NAVIGATION_ITEM action.
 *
 * @param {String}      key          The key for this menu item.
 * @param {String}      groupKey     The key of the menu group this item belongs to.
 * @param {String}      label        The label for this menu item.
 * @param {Boolean}     target       The target the menu item should link to.
 * @param {JSX.Element} component    A function that renders the component to display on the route.
 * @param {Number}      [priority=0] Location priority of menu item.
 * @param {Object}      [props={}]   Optional props to pass to the component.
 *
 * @returns {Object} The SET_NAVIGATION_ITEM action.
 */
function setNavigationItem( { key, groupKey, label, target, component, priority = 0, props = {} } ) {
	return {
		type: SET_NAVIGATION_ITEM,
		payload: {
			key,
			groupKey,
			target,
			label,
			priority,
			component,
			props,
		},
	};
}

/**
 * Generates a menu array by combining data from the redux store object, and icons from the global window.
 *
 * @param {Object} navigationStore The navigation as retrieved from the store.
 * @param {string} initialRoute The requested initial route.
 *
 * @returns {Array} A sorted list of menu items.
 */
function createMenu( navigationStore, initialRoute = "" ) {
	forEach( navigationStore, navGroup => {
		navGroup.children = orderBy( navGroup.children, "priority", "desc" );
		if ( initialRoute !== "" && navGroup.children.findIndex( route => route.target === initialRoute ) !== -1 ) {
			navGroup.isDefaultOpen = true;
		}
	} );
	return orderBy( Object.values( navigationStore, "priority", "desc" ) );
}

/**
 * Generates an array with relevant routes data.
 *
 * @param {Array} menu The array of menu items, as generated by createMenu.
 *
 * @returns {Array} An array of all necessary routes (menu items with components).
 */
function createRoutes( menu ) {
	return menu.flatMap( item => item.children );
}

/**
 * A React hook for handling Navigation.
 *
 * @param {Object} initialNavigation The initial state for the navigation.
 * @param {string} [initialRoute] The requested initial route.
 *
 * @returns {Object} An object containing a menu and routes.
 */
export default function useNavigation( initialNavigation, initialRoute = "" ) {
	// Merge initial navigation with possibly already registered navigation via pre-render global API
	const [ navigation, dispatch ] = useReducer( navigationReducer, merge( {}, registeredNavigation, initialNavigation ) );
	const [ menu, setMenu ] = useState( createMenu( navigation, initialRoute ) );
	const [ routes, setRoutes ] = useState( createRoutes( menu ) );

	// If this is the first pass, expose the available navigation actions.
	useEffect( () => {
		registerGlobalAPIs( [
			createNavigationAPI( {
				registerGroupCallback: flowRight( dispatch, setNavigationGroup ),
				registerItemCallback: flowRight( dispatch, setNavigationItem ),
			} ),
		] );
		// Cleanup to prevent state updates on unmounted component
		return () => {
			registerGlobalAPIs( [ createNavigationAPI() ] );
		};
	}, [] );

	// If there are changes to the navigation in the store, generate a new menu and routes.
	useEffect( () => {
		const newMenu = createMenu( navigation, initialRoute );
		setMenu( newMenu );
		setRoutes( createRoutes( newMenu ) );
	}, [ navigation, initialRoute ] );

	const rootRoute = useMemo( () => {
		if ( initialRoute && routes.findIndex( route => route.target === initialRoute ) ) {
			return initialRoute;
		}

		return routes[ 0 ]?.target ?? "";
	}, [ initialRoute, routes ] );

	return {
		menu,
		routes,
		rootRoute,
	};
}
