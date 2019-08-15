<?php

use SilverStripe\Assets\Image;
use SilverStripe\Forms\TextField;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;

class StaffMember extends Page {

	private static $db = array(
		"StaffPosition" => "Text",
		"StaffEmailAddress" => "Text",
		"StaffPhoneNumber" => "Text",
		"StaffResearch" => "HTMLText",
	);

	private static $has_one = array(
		"StaffPhoto" => Image::class,
		"StaffCV" => Image::class,
	);


	public function getCMSFields(){
		$fields = parent::getCMSFields();
		$fields->removeByName("PageSummary");
		$fields->removeByName("MainPhoto");
		$fields->addFieldToTab("Root.Main", new TextField("StaffPosition", "Position"));
		$fields->addFieldToTab("Root.Main", new TextField("StaffEmailAddress", "Email address"));
		$fields->addFieldToTab("Root.Main", new TextField("StaffPhoneNumber", "Phone Number"));
		$fields->addFieldToTab("Root.Main", new UploadField("StaffPhoto", "Staff Photo"));
		$fields->addFieldToTab("Root.Main", HTMLEditorField::create("Content", "Biography")->addExtraClass('stacked'));
		$fields->addFieldToTab("Root.Main", HTMLEditorField::create("StaffResearch", "Research, Projects, and Activities")->addExtraClass('stacked'));
		$fields->addFieldToTab("Root.Main", new UploadField("StaffCV", "Staff CV"));

		return $fields;

	}

	//private static $allowed_children = array("");

}
