<?php
class Page extends SiteTree {

	private static $db = array(
		"TestimonialQuote" => "Text",
		"TestimonialName" => "Text",
		"TestimonialAttribution" => "Text",
	);

	private static $has_one = array(
		"BackgroundPhoto" => "Image",
		"TestimonialPhoto" => "Image",
	);

	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$fields->removeByName("ExtraMeta");
		$fields->addFieldToTab("Root.Main", new UploadField("BackgroundPhoto", "Background Photo"), "Content");

		$fields->addFieldToTab("Root.Testimonial", new TextareaField("TestimonialQuote", "Quote"));
		$fields->addFieldToTab("Root.Testimonial", new TextField("TestimonialName", "Person (Jane Doe)"));
		$fields->addFieldToTab("Root.Testimonial", new TextField("TestimonialAttribution", "Attribution (Youth Ballet)"));
		$fields->addFieldToTab("Root.Testimonial", new UploadField("TestimonialPhoto", "Photo"));

		return $fields;

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
	private static $allowed_actions = array (
	);

	public function init() {
		parent::init();
		// You can include any CSS or JS required by your project here.
		// See: http://doc.silverstripe.org/framework/en/reference/requirements
	}

}