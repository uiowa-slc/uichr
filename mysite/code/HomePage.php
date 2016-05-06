<?php
class HomePage extends Page {
	private static $db = array(
		"HomePhotoTitle" => "Text",
		"HomePhotoButtonText" => "Text",
		"ProgramsPageContent" => "Text",
		"Program1Title" => "Text",
		"Program1Content" => "Text",
		"Program2Title" => "Text",
		"Program2Content" => "Text",
		"Program3Title" => "Text",
		"Program3Content" => "Text",
		"PromoHeading" => "Text",
		"PromoContent" => "Text",
		"AboutUsFeature1Title" => "Text",
		"AboutUsFeature1SubTitle" => "Text",
		"AboutUsFeature1Content" => "Text",
		"AboutUsFeature2Title" => "Text",
		"AboutUsFeature2SubTitle" => "Text",
		"AboutUsFeature2Content" => "Text",
	);
	private static $has_one = array(
		"HomePhotoLink" => "SiteTree",
		"Program1Photo" => "Image",
		"Program1Link" => "SiteTree",
		"Program2Photo" => "Image",
		"Program2Link" => "SiteTree",
		"Program3Photo" => "Image",
		"Program3Link" => "SiteTree",

		"AboutUsFeature1Photo" => "Image",
		"AssociatedPage" => "SiteTree",
		"AboutUsFeature2Photo" => "Image",
		"AssociatedPageTwo" => "SiteTree",
	);
	function getCMSFields() {

		$fields = parent::getCMSFields();
		$fields->removeByName("Testimonial");
		$fields->removeByName("PhotoGallery");
		$fields->removeByName("Content");

		$fields->addFieldToTab("Root.Main", new TextField("HomePhotoTitle", "Photo Title"));
		$fields->addFieldToTab("Root.Main", new TextField("HomePhotoButtonText", "Photo Button Text"));
		$fields->addFieldToTab("Root.Main", new TreeDropdownField("HomePhotoLinkID", "Photo Button Link", "SiteTree"));

		$fields->addFieldToTab("Root.Programs", new TextareaField("ProgramsPageContent", "Program Page Content"));
		$fields->addFieldToTab("Root.Programs", new HeaderField( '<br><h3>Program 1</h3>', '3', true ) );
		$fields->addFieldToTab("Root.Programs", new TextField("Program1Title", "Program 1 Title"));
		$fields->addFieldToTab("Root.Programs", new TextareaField("Program1Content", "Program 1 Content"));
		$fields->addFieldToTab("Root.Programs", new TreeDropdownField("Program1LinkID", "Program 1 Link", "SiteTree"));
		$fields->addFieldToTab("Root.Programs", new UploadField("Program1Photo", "Program 1 Photo"));

		$fields->addFieldToTab("Root.Programs", new HeaderField( '<br><h3>Program 2</h3>', '3', true ) );
		$fields->addFieldToTab("Root.Programs", new TextField("Program2Title", "Program 2 Title"));
		$fields->addFieldToTab("Root.Programs", new TextareaField("Program2Content", "Program 2 Content"));
		$fields->addFieldToTab("Root.Programs", new TreeDropdownField("Program2LinkID", "Program 2 Link", "SiteTree"));
		$fields->addFieldToTab("Root.Programs", new UploadField("Program2Photo", "Program 2 Photo"));

		$fields->addFieldToTab("Root.Programs", new HeaderField( '<br><h3>Program 3</h3>', '3', true ) );
		$fields->addFieldToTab("Root.Programs", new TextField("Program3Title", "Program 3 Title"));
		$fields->addFieldToTab("Root.Programs", new TextareaField("Program3Content", "Program 3 Content"));
		$fields->addFieldToTab("Root.Programs", new TreeDropdownField("Program3LinkID", "Program 3 Link", "SiteTree"));
		$fields->addFieldToTab("Root.Programs", new UploadField("Program3Photo", "Program 3 Photo"));

		$fields->addFieldToTab("Root.History", new TextField("PromoHeading", "Heading"));
		$fields->addFieldToTab("Root.History", new TextareaField("PromoContent", "Content"));

		$fields->addFieldToTab("Root.About", new HeaderField( '<h3>Feature 1</h3>', '3', true ) );
		$fields->addFieldToTab("Root.About", new TextField("AboutUsFeature1Title", "Feature 1 Title"));
		$fields->addFieldToTab("Root.About", new TextField("AboutUsFeature1SubTitle", "Feature 1 Subtitle"));
		$fields->addFieldToTab("Root.About", new TextareaField("AboutUsFeature1Content", "Feature 1 Content"));
		$fields->addFieldToTab("Root.About", new TreeDropdownField("AssociatedPageID", "Feature 1 Link", "SiteTree"));
		$fields->addFieldToTab("Root.About", new UploadField("AboutUsFeature1Photo", "Feature 1 Photo"));

		$fields->addFieldToTab("Root.About", new HeaderField( '<br><h3>Feature 2</h3>', '3', true ) );
		$fields->addFieldToTab("Root.About", new TextField("AboutUsFeature2Title", "Feature 2 Title"));
		$fields->addFieldToTab("Root.About", new TextField("AboutUsFeature2SubTitle", "Feature 2 Subtitle"));
		$fields->addFieldToTab("Root.About", new TextareaField("AboutUsFeature2Content", "Feature 2 Content"));
		$fields->addFieldToTab("Root.About", new TreeDropdownField("AssociatedPageTwoID", "Feature 2 Link", "SiteTree"));
		$fields->addFieldToTab("Root.About", new UploadField("AboutUsFeature2Photo", "Feature 2 Photo"));

		return $fields;
	}
}
class HomePage_Controller extends Page_Controller {

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

	//function Events(){
	//	$where = "ClassName = 'EventPage'";
	//	$result = DataObject::get("EventPage",$where,"","");
	//	return $result;
	//}

	public function init() {
		parent::init();

	}
}