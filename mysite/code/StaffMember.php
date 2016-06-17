<?php
class StaffMember extends Page {

	private static $db = array(
		"StaffPosition" => "Text",
		"StaffEmailAddress" => "Text",
		"StaffPhoneNumber" => "Text",
		"StaffResearch" => "HTMLText",
	);

	private static $has_one = array(
		"StaffPhoto" => "Image",
		"StaffCV" => "Image",
	);


	public function getCMSFields(){
		$fields = parent::getCMSFields();
		$fields->removeByName("PageSummary");
		$fields->removeByName("MainPhoto");
		$fields->addFieldToTab("Root.Main", new TextField("StaffPosition", "Position"));
		$fields->addFieldToTab("Root.Main", new TextField("StaffEmailAddress", "Email address"));
		$fields->addFieldToTab("Root.Main", new TextField("StaffPhoneNumber", "Phone Number"));
		$fields->addFieldToTab("Root.Main", new UploadField("StaffPhoto", "Staff Photo"));
		$fields->addFieldToTab("Root.Main", new HTMLEditorField("Content", "Biography"));
		$fields->addFieldToTab("Root.Main", new HTMLEditorField("StaffResearch", "Research, Projects, and Activities"));
		$fields->addFieldToTab("Root.Main", new UploadField("StaffCV", "Staff CV"));

		return $fields;

	}

	//private static $allowed_children = array("");

}
class StaffMember_Controller extends Page_Controller {

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

	public function NextPage() {
		$page = Page::get()->filter(array(
			'ParentID' => $this->owner->ParentID,
			'Sort:GreaterThan' => $this->owner->Sort,
		))->First();
		return $page;
	}
	public function PreviousPage() {
		$page = Page::get()->filter(array(
			'ParentID' => $this->owner->ParentID,
			'Sort:LessThan' => $this->owner->Sort,
		))->Last();
		return $page;
	}

	public function init() {
		parent::init();

	}

}