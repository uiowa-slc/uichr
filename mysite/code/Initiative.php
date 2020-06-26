<?php

use SilverStripe\Assets\Image;
use SilverStripe\AssetAdmin\Forms\UploadField;

class Initiative extends Page {

	private static $db = array(

	);

	private static $has_one = array(
		"PagePhoto" => Image::class
    );

    private static $owns = array(
		'PagePhoto'
	);

	public function getCMSFields(){
		$fields = parent::getCMSFields();

		// $fields->removeByName("Content");
		$fields->removeByName("Metadata");

		$fields->addFieldToTab("Root.Main", new UploadField("PagePhoto", "Header Photo (width:1200px, height: 500px)"));

		return $fields;

	}

}
