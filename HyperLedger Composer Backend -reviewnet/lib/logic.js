/**
 * Track the trade of a commodity from one trader to another
 * @param {org.sjsu.reviewnet.AddReview} addReview - the trade to be processed
 * @transaction
 */

function addReview(addReview){
	addReview.review.employee=addReview.reviewedEmployee;
	return getAssetRegistry('org.sjsu.reviewnet.Review')
		.then(function(assetRegistry){
		return assetRegistry.update(addReview.review);		
	});
}


