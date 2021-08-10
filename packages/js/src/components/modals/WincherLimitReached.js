/* External dependencies */
import { __, sprintf } from "@wordpress/i18n";

/* Yoast dependencies */
import { makeOutboundLink } from "@yoast/helpers";
import { Alert } from "@yoast/components";
import interpolateComponents from "interpolate-components";

const UpdateWincherPlanLink = makeOutboundLink();

/**
 * Creates the content for the Wincher limit exceeded modal.
 *
 * @returns {wp.Element} The Wincher limit exceeded modal content.
 */
const WincherLimitReached = () => {
	const message = sprintf(
		/* translators: %d expands to the amount of allowed keyphrases on a free account, %s expands to a link to Wincher plans. */
		__(
			"You've reached the maximum amount of %d keyphrases you can add to your free Wincher account. " +
			"If you wish to add more keyphrases, please %s.",
			"wordpress-seo"
		),
		10,
		"{{updateWincherPlanLink/}}"
	);

	return (
		<Alert type="error">
			{
				interpolateComponents( {
					mixedString: message,
					components: {
						updateWincherPlanLink: <UpdateWincherPlanLink href={ "https://google.com" }>
							{
								sprintf(
									/* translators: %s : Expands to "Wincher". */
									__( "upgrade your %s plan", "wordpress-seo" ),
									"Wincher"
								)
							}
						</UpdateWincherPlanLink>,
					},
				} )
			}
		</Alert>
	);
};

export default WincherLimitReached;
