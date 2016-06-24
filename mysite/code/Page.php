<?php
class Page extends SiteTree {

	private static $db = array(
		"PageSummary" => "Text",
	);

	private static $has_one = array(
		"MainPhoto" => "Image",
		"PageSummaryImg" => "Image",
	);
	private static $many_many = array(
		'PageTags' => 'BlogTag',
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();

		$fields->removeByName("ExtraMeta");
		$fields->addFieldToTab("Root.Main", new UploadField("MainPhoto", "Page Photo (optional)"), "Content");
		$fields->addFieldToTab('Root.PageSummary', new TextareaField('PageSummary', 'Page Description'));
		$fields->addFieldToTab("Root.PageSummary", new UploadField("PageSummaryImg", "Page Summary Photo"));

		$tags = BlogTag::get();
		$tagField = TagField::create(
			'PageTags',
			'Show news tagged with:',
			$tags,
			$this->PageTags()
		)
			->setCanCreate(true)
			->setShouldLazyLoad(true);
		$fields->addFieldToTab('Root.Main', $tagField, 'Content');
		return $fields;

	}
	public function RandomChildren($count = 2) {
		return SiteTree::get()->filter('ParentID', $this->ID)->sort('RAND()')->limit($count);
	}

}
class Page_Controller extends ContentController {

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
	private static $allowed_actions = array(
	);
	public function RelatedNewsEntries(){
		$holder = NewsHolder::get()->First();
		$tags = $this->PageTags()->limit(6);
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
		// You can include any CSS or JS required by your project here.
		// See: http://doc.silverstripe.org/framework/en/reference/requirements
	}

}
