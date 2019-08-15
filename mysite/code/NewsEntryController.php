<?php
use SilverStripe\Blog\Model\BlogPostController;
use SilverStripe\Blog\Model\BlogPost;
use SilverStripe\ORM\ArrayList;
class NewsEntryController extends BlogPostController {

	/**
	 * An array of actions that can be accessed via a request. Each array element should be an action name, and the
	 * permissions or conditions required to allow the user to access it.
	 *
	 * <code>
	 * array (
	 *     'action', // anyone can access this action
	 *     'action' => true, // same as above
	 *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
	 *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
	 * );
	 * </code>
	 *
	 * @var array
	 */
	private static $allowed_actions = array (
	);

	public function RelatedNewsEntries(){
		$holder = NewsHolder::get()->First();
		$tags = $this->Tags()->limit(6);
		$entries = new ArrayList();

		foreach($tags as $tag){
			$taggedEntries = $tag->BlogPosts()->exclude(array("ID"=>$this->ID))->sort('PublishDate', 'ASC')->Limit(3);
			if($taggedEntries){
				foreach($taggedEntries as $taggedEntry){
					if($taggedEntry->ID){
						$entries->push($taggedEntry);
					}
				}
			}

		}

		if($entries->count() > 1){
			$entries->removeDuplicates();
		}
		return $entries;
	}

	public function init() {
		parent::init();


	}

}